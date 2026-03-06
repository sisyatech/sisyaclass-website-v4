
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import Image from "next/image";
import LoginModal from "../LoginModal";
import { useUser } from "../UserContext";
import RevealOnView from "../Reveal/RevealOnView";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";

interface CourseProps {
  gradeNumber: number;
  onMentorIdsChange?: (mentorIds: number[]) => void;
}

interface Subject {
  id: number;
  name: string;
  subtitle: string;
  taglinePoints: string[];
}

interface BigCourseData {
  id: number;
  courseDemoPrice: number;
  webLabel: string;
  courseVideoLink: string;
  bigCourse: {
    name: string;
    averageRating: number;
    searchTags: string[];
    duration: number;
    startDate: string;
    endDate: string;
    price: number;
    currentPrice: number;
    description: string;
  };
  subjects: Subject[];
}

const Course = ({ gradeNumber, onMentorIdsChange }: CourseProps) => {
  const searchParams = useSearchParams();
  const { user, isLoggedIn } = useUser();
  const classTitle = `Class ${gradeNumber}`;
  const [courseData, setCourseData] = useState<BigCourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  //console.log('Course component rendered with gradeNumber:', gradeNumber, 'type:', typeof gradeNumber);
  //console.log('Course component onMentorIdsChange callback:', onMentorIdsChange);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        //console.log(`Fetching course data for grade: ${gradeNumber}`);
        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.GET_BIG_COURSE_BY_GRADE}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              grade: gradeNumber.toString()
            })
          }
        );
        
        //console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          //console.error('API Error Response:', errorText);
          throw new Error(`Failed to fetch course data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        //console.log('Fetched data:', data);
        //console.log('Data is array:', Array.isArray(data));
        //console.log('Data length:', data?.length);
        
        if (Array.isArray(data) && data.length > 0) {
          const desiredLabel = (searchParams?.get('course') || '').toLowerCase();
          let picked = data[0];
          if (desiredLabel) {
            const exact = data.find((d:any)=>String(d?.webLabel||'').toLowerCase() === desiredLabel);
            const partial = exact || data.find((d:any)=>String(d?.webLabel||'').toLowerCase().includes(desiredLabel));
            if (partial) picked = partial;
          }
          //console.log('Setting course data:', picked);
          setCourseData(picked);

          // Extract mentor IDs for the selected course and pass them to parent component
          if (picked.bigCourse?.mentorList && Array.isArray(picked.bigCourse.mentorList)) {
            //console.log('Found mentor IDs:', picked.bigCourse.mentorList);
            //console.log('onMentorIdsChange callback exists:', !!onMentorIdsChange);
            if (onMentorIdsChange) {
              //console.log('Calling onMentorIdsChange callback with:', picked.bigCourse.mentorList);
              onMentorIdsChange(picked.bigCourse.mentorList);
              //console.log('onMentorIdsChange callback called');
            } else {
              //console.log('onMentorIdsChange callback is not defined');
            }
          } else {
            //console.log('No mentorList found in selected course data');
          }
        } else {
          //console.error(`No course data available for grade ${gradeNumber}`);
          throw new Error(`No course data available for grade ${gradeNumber}. Please contact support or try a different grade.`);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        //console.error("Error fetching course data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [gradeNumber, searchParams]);

  const handleRegisterDemo = () => {
    //console.log('Register for demo clicked for grade:', gradeNumber);
    
    if (isLoggedIn && user) {
      // User is logged in, proceed with payment/demo registration
      //console.log('User is logged in, proceeding with demo registration:', user.name);
      handlePayment();
    } else {
      // User is not logged in, show login modal
      //console.log('User not logged in, showing login modal');
      setShowLoginModal(true);
    }
  };

  const handlePayment = async () => {
    try {
      const amount = courseData?.courseDemoPrice || 19;
      const contactFromUser = (user as any)?.phone || (user as any)?.mobile || "";
      const contactFromStorage = typeof window !== 'undefined' ? (localStorage.getItem("mobileNumber") || "") : "";
      const contact = contactFromUser || contactFromStorage;

      //console.log("[PAYMENT] Starting flow (Course)", { gradeNumber, contact, amount });
      // 1) Create registration lead
      try {
        const leadRes = await fetch("https://sisyaclass.xyz/student/new_reg_lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: (user as any)?.name || courseData?.bigCourse?.name || "SISYA Course Demo",
            phone: contact,
            class: String(gradeNumber),
            status: "initiated",
          }),
        });
        const leadJson = await leadRes.json();
        //console.log("[PAYMENT] Lead response", leadJson);
        if (leadJson?.success && leadJson?.lead?.id) {
          localStorage.setItem("leadId", leadJson.lead.id);
          //console.log("[PAYMENT] Lead stored", { leadId: leadJson.lead.id });
        } else {
          //console.warn("[Course] Lead creation failed", leadJson);
        }
      } catch (e) {
        //console.warn("[Course] Lead request error", e);
      }

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "INR", description: `Course Demo - Class ${gradeNumber}`, contact }),
      });
      const orderJson = await orderRes.json();
      //console.log("[PAYMENT] Order API response", orderJson);
      if (!orderJson?.success) {
        alert("Failed to initialize payment. Please try again.");
        return;
      }

      const payload = orderJson.data ? orderJson.data : {
        order_id: orderJson.order?.id,
        amount: orderJson.order?.amount,
        currency: orderJson.order?.currency,
        key_id: orderJson.keyId,
        name: "Sisya Class",
        description: `Course Demo - Class ${gradeNumber}`,
        prefill: { contact },
      };

      const options: any = {
        key: payload.key_id,
        amount: payload.amount,
        currency: payload.currency,
        name: payload.name,
        description: payload.description,
        order_id: payload.order_id,
        prefill: payload.prefill,
        handler: function (response: any) {
          const amountLabel = `₹${amount}`;
          window.location.href = `/payment/success?transactionId=${encodeURIComponent(
            response.razorpay_payment_id || ""
          )}&amount=${encodeURIComponent(amountLabel)}&returnUrl=${encodeURIComponent(`/class-${gradeNumber}`)}`;
        },
        modal: {
          ondismiss: function () {
            window.location.href = `/payment/failed?transactionId=${encodeURIComponent(
              `DISMISSED_${Date.now()}`
            )}&returnUrl=${encodeURIComponent(`/class-${gradeNumber}`)}`;
          },
        },
      };

      // @ts-ignore
      const rzp = new (window as any).Razorpay(options);
      //console.log("[PAYMENT] Opening Razorpay checkout", { order_id: payload.order_id });
      rzp.open();
    } catch (err) {
      //console.error("[Course] Payment error", err);
      alert("Network error. Please try again.");
    } finally {
      //console.log("[PAYMENT] Flow ended");
    }
  };

  const handleLoginSuccess = (userData: any) => {
    //console.log('Course: Login successful, user data:', userData);
    setShowLoginModal(false);
    // Proceed with payment after successful login
    setTimeout(() => {
      handlePayment();
    }, 500);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  // Extract YouTube video ID from the courseVideoLink
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const videoId = url.match(/[?&]v=([^&]+)/)?.[1] || url.split('/').pop()?.split('?')[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0`;
      }
    } catch (err) {
      //console.error("Error parsing YouTube URL:", err);
    }
    return "";
  };

  if (loading) {
    return (
      <div className="min-screen mb-10 pt-1 sm:pt-2 md:pt-3 lg:pt-4 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-8 sm:py-12 md:py-16 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0595CE] mx-auto"></div>
              <p className="mt-4 text-[#556A8E]">Loading course information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !courseData) {
    return (
      <div className="min-screen mb-10 pt-1 sm:pt-2 md:pt-3 lg:pt-4 relative">
        {/* Background Container */}
        <div 
          className="absolute w-full"
          style={{
            top: '40px',
            height: '587px',
            opacity: 1,
            background: '#F0F7FA'
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-8 sm:py-12 md:py-16 flex items-center justify-center min-h-[400px]">
            <div className="text-center max-w-2xl">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#161A38] mb-3">
                  Course Not Available for Class {gradeNumber}
                </h2>
                <p className="text-[#556A8E] text-base sm:text-lg mb-4">
                  We're currently preparing course content for this grade.
                </p>
                {error && (
                  <p className="text-sm text-gray-500 mb-4 italic">{error}</p>
                )}
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-[#161A38] font-semibold mb-3">
                  🎓 Available Courses:
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a 
                    href="/class-11"
                    className="px-6 py-3 bg-[#0595CE] text-white rounded-lg font-montserrat font-semibold hover:bg-[#047BA8] transition-colors"
                  >
                    View Class 11 Course
                  </a>
                </div>
                <p className="text-sm text-[#556A8E] mt-4">
                  More courses coming soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get subjects from API - use searchTags if subjects array is empty or use subject names
  let subjects: string[] = [];
  
  //console.log('Course data subjects:', courseData.subjects);
  //console.log('Course data searchTags:', courseData.bigCourse?.searchTags);
  
  if (courseData.subjects && courseData.subjects.length > 0) {
    subjects = courseData.subjects.map(subject => subject.name);
    //console.log('Mapped subject names:', subjects);
  } else if (courseData.bigCourse?.searchTags && courseData.bigCourse.searchTags.length > 0) {
    subjects = courseData.bigCourse.searchTags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1).trim());
    //console.log('Using searchTags as subjects:', subjects);
  } else {
    //console.log('No subjects or tags available');
  }
  
  const videoEmbedUrl = getYouTubeEmbedUrl(courseData.courseVideoLink);
  const rating = courseData.bigCourse.averageRating.toFixed(1);
  
  // Extract the main title from the course name; fallback to webLabel if needed
  const rawName = courseData.bigCourse?.name || '';
  const computedFromName = rawName.includes('-') ? rawName.split('-')[1].trim() : rawName;
  const courseTitle = (computedFromName || courseData.webLabel || `Class ${gradeNumber} Course`).trim();

  //console.log('Final subjects array for rendering:', subjects);
  //console.log('Subjects length:', subjects.length);

  return (
    <div className="min-screen mb-8 pt-0 sm:pt-0 md:pt-1 lg:pt-2 relative">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        
      {/* Background Container */}
      <div 
        className="absolute w-full"
        style={{
          top: '0px',
          height: '587px',
          opacity: 1,
          background: '#F0F7FA'
        }}
      ></div>
      
      <div key={courseData.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-2 sm:pt-3 md:pt-4 lg:pt-6 pb-8 sm:pb-12 md:pb-16">
          {/* Hero Section - Cleaner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-10 lg:gap-16 xl:gap-20 items-center">
            
            {/* Left Content */}
            <div className="space-y-3 sm:space-y-5 md:space-y-6 lg:pr-8 flex flex-col items-center lg:items-start">
              {/* Class Badge */}
              <RevealOnView from="top" durationMs={800} delayMs={0}>
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  <div className="relative w-[200px] sm:w-[240px] md:w-[280px] h-[32px] sm:h-[36px] md:h-[40px]">
                    <Image 
                      src="/grades/coursebaner.svg" 
                      alt={courseData.webLabel} 
                      width={280} 
                      height={40}
                      className="w-full h-full"
                      priority
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] sm:text-xs font-semibold">
                      {courseData.webLabel}
                    </span>
                  </div>
                  <div className="font-montserrat font-semibold text-[#1BA8EF] text-xl sm:text-2xl whitespace-nowrap">
                    {classTitle}
                  </div>
                </div>
              </RevealOnView>

              {/* Main Headline */}
              <RevealOnView from="left" durationMs={1000} delayMs={200}>
                <h1 className="font-roboto font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[36px] leading-tight text-[#161A38] text-center lg:text-left">
                  {courseData.bigCourse?.name || courseTitle}
                </h1>
              </RevealOnView>

              {/* Subjects */}
              {subjects.length > 0 && (
                  <div className="space-y-2 sm:space-y-3 text-center lg:text-left w-full">
                    <h3 className="font-roboto font-medium text-base sm:text-lg text-[#556A8E]">Subjects Covered:</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                      {subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-3 sm:px-4 py-1 rounded bg-white text-[#556A8E] font-montserrat font-medium text-sm"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
              )}

              {/* Rating Card */}
              <RevealOnView from="bottom" durationMs={1000} delayMs={600}>
                <div className="p-3 sm:p-4 bg-white w-full max-w-[340px] sm:max-w-[400px] md:max-w-[447px] shadow-md rounded-[16px] sm:rounded-[20px]">
                  <div className="text-center mb-2">
                    <span className="font-[Roboto_Serif] font-semibold text-xl sm:text-2xl text-[#626AB5]">
                      {rating}/5
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-1 mb-3">
                    {[...Array(Math.floor(parseFloat(rating)))].map((_, i) => (
                      <Image key={i} src="/heropics/fullstar.svg" alt="Star" width={18} height={18} className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                    ))}
                    {parseFloat(rating) % 1 !== 0 && (
                      <Image src="/heropics/halfstar.svg" alt="Half Star" width={18} height={18} className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                    )}
                  </div>
                  <div className="flex justify-center items-center gap-2 sm:gap-4">
                    <Image src="/heropics/trust.svg" alt="Trustpilot" width={90} height={22} className="w-[80px] h-[20px] sm:w-[90px] sm:h-[22px] md:w-[110px] md:h-[27px]" />
                    <Image src="/heropics/google play.svg" alt="Google Play" width={90} height={22} className="w-[80px] h-[20px] sm:w-[90px] sm:h-[22px] md:w-[110px] md:h-[27px]" />
                    <Image src="/heropics/google.svg" alt="Google My Business" width={90} height={22} className="w-[80px] h-[20px] sm:w-[90px] sm:h-[22px] md:w-[110px] md:h-[27px]" />
                  </div>
                </div>
              </RevealOnView>

              {/* CTA Button */}
              {/* <RevealOnView from="bottom" durationMs={1000} delayMs={800}> */}
                <button 
                  onClick={handleRegisterDemo}
                  className="w-full sm:w-full md:w-full lg:max-w-[447px] h-[46px] sm:h-[50px] md:h-[53px] rounded-xl bg-[#0595CE] text-white font-montserrat font-semibold text-base sm:text-lg md:text-xl lg:text-[23px] px-4 hover:bg-[#047aa8] transition-colors cursor-pointer"
                  style={{ cursor: 'pointer' }}
                >
                  Register for demo at just ₹{courseData.courseDemoPrice}
                </button>
              {/* </RevealOnView> */}
            </div>

            {/* Right Content - Video */}
            <div className="relative mt-2 sm:mt-6 lg:mt-0 ">
              {/* Guarantee Badge - Right Above Video */}
              <RevealOnView from="top" durationMs={800} delayMs={300}>
                <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[371px] h-[40px] sm:h-[32px] md:h-[28px] rounded-md bg-[#28A745] text-white flex items-center justify-center mb-4 sm:mb-6 shadow-lg mx-auto lg:ml-8 xl:ml-16">
                  <span className="text-xs sm:text-sm font-medium px-2">
                    The Guaranteed Path to Higher Scores
                  </span>
                </div>
              </RevealOnView>

              {/* YouTube Video */}
              {videoEmbedUrl && (
                <RevealOnView from="right" durationMs={1200} delayMs={500}>
                  <div className="relative w-full max-w-[350px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[606px] aspect-video overflow-hidden shadow-xl mx-auto lg:mx-0">
                    <iframe
                      className="w-full h-full object-cover"
                      src={videoEmbedUrl}
                      title="Course Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                </RevealOnView>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleLoginModalClose}
        onLoginSuccess={handleLoginSuccess}
        selectedClass={gradeNumber}
      />
    </div>
  );
};

export default Course;