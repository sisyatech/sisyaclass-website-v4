
import React, { useState, useEffect } from "react";
import Image from "next/image";
import RevealOnView from "../Reveal/RevealOnView";
import { usePathname } from "next/navigation";
import { API_BASE_URL, API_ENDPOINTS, IMAGE_URLS } from "@/lib/config";

interface QuickLinksProps {
  mentorIds?: number[];
}

interface MentorDetail {
  id: number;
  name: string;
  qualifications?: Array<{
    name: string;
    institution: string;
  }>;
  avgRating?: number;
  totalRatings?: number;
}

const QuickLinks = ({ mentorIds = [] }: QuickLinksProps) => {
  const pathname = usePathname();
  const [selectedMentorId, setSelectedMentorId] = useState<number | null>(null);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [mentorDetails, setMentorDetails] = useState<MentorDetail[]>([]);
  const [loading, setLoading] = useState(false);
  
  //console.log('QuickLinks rendered with mentorIds:', mentorIds);
  
  useEffect(() => {
    //console.log('QuickLinks: mentorIds prop changed to:', mentorIds);
  }, [mentorIds]);

  const fetchMentorDetails = async (mentorId: number): Promise<MentorDetail | null> => {
    try {
      //console.log('Fetching details for mentor ID:', mentorId);
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_MENTOR_DETAILS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: mentorId }),
      });

      if (!response.ok) {
        //console.warn(`Failed to fetch mentor details for ID ${mentorId}: ${response.status}`);
        // Return fallback data instead of throwing error
        return {
          id: mentorId,
          name: `Teacher ${mentorId}`,
          qualifications: [],
          avgRating: 0,
          totalRatings: 0,
        };
      }

      const result = await response.json();
      //console.log('Mentor details response:', result);

      if (result.success && result.mentor) {
        return {
          id: mentorId,
          name: result.mentor.name || `Teacher ${mentorId}`,
          qualifications: result.mentor.qualifications || [],
          avgRating: result.mentor.avgRating || 0,
          totalRatings: result.mentor.totalRatings || 0,
        };
      }
      return null;
    } catch (error) {
      //console.error('Error fetching mentor details:', error);
      return {
        id: mentorId,
        name: `Teacher ${mentorId}`,
        qualifications: [],
        avgRating: 0,
        totalRatings: 0,
      };
    }
  };

  const fetchAllMentorDetails = async () => {
    if (mentorIds.length === 0) return;
    
    setLoading(true);
    try {
      //console.log('Fetching details for all mentors:', mentorIds);
      const detailsPromises = mentorIds.map(id => fetchMentorDetails(id));
      const details = await Promise.all(detailsPromises);
      const validDetails = details.filter(detail => detail !== null) as MentorDetail[];
      //console.log('All mentor details fetched:', validDetails);
      setMentorDetails(validDetails);
    } catch (error) {
      //console.error('Error fetching all mentor details:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleTeacherClick = async () => {
    //console.log('Teachers card clicked!');
    //console.log('Current mentorIds:', mentorIds);
    //console.log('mentorIds.length:', mentorIds.length);
    //console.log('mentorIds type:', typeof mentorIds);
    
    if (mentorIds.length > 0) {
      // Fetch mentor details and show modal
      //console.log('Showing modal with all mentor IDs:', mentorIds);
      await fetchAllMentorDetails();
      setShowMentorModal(true);
    } else {
      //console.log('No mentor IDs available, using fallback ID 23');
      // Use a fallback mentor ID for testing
      setSelectedMentorId(23);
      setShowMentorModal(true);
    }
  };

  const handleCloseMentorModal = () => {
    setShowMentorModal(false);
    setSelectedMentorId(null);
  };

  const handleDemoClick = () => {
    //console.log('Demo card clicked!');
    window.open('https://sisyaclass.com/10xboostercourse/', '_blank');
  };

  // Determine which section to scroll to based on current page
  const getScheduleTarget = () => {
    // Check if we're on a subject page (contains '/grade' and has a subject)
    // URL pattern: /grade8/mathematics, /grade9/science, etc.
    if (pathname.match(/\/grade\d+\/[a-zA-Z]+/)) {
      return 'chapters';
    }
    // For class pages (/grade8) and other pages, scroll to syllabus
    return 'syllabus';
  };
  return (
    <>
    <RevealOnView from="bottom" durationMs={800} delayMs={0}>
      <div className="relative z-10 w-full  max-w-[1238px] h-auto min-h-[120px] sm:min-h-[140px] md:h-[158px] opacity-100 rounded-[27px] bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] mx-auto mt-8 flex flex-col sm:flex-row items-center justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-4 md:py-0">
      {/* Quick Links Title and Arrow */}
      <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0 sm:mr-6 md:mr-8 animate-in fade-in slide-in-from-left-4 duration-500 delay-300">
        <h2 className="font-montserrat font-semibold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-none tracking-normal bg-[#1A2439] bg-clip-text text-transparent">
          Quick Links
        </h2>
        <Image 
          src="/grades/arrow.svg" 
          alt="Arrow" 
          width={63} 
          height={63}
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 transition-transform duration-300 hover:translate-x-1"
        />
      </div>

      {/* Quick Links Cards */}
      <div className="flex flex-wrap sm:flex-nowrap justify-center gap-2 sm:gap-2 md:gap-3 lg:gap-6">
        {/* Teachers Card */}
        <div 
          className="cursor-pointer hover:scale-110 transition-all duration-300 animate-in fade-in zoom-in-50 delay-400"
          onClick={handleTeacherClick}
        >
          <div className="w-[70px] h-[53px] sm:w-[80px] sm:h-[60px] md:w-[85px] md:h-[64px] lg:w-[121px] lg:h-[93px] bg-white border-2 border-[#41AC7D] border-opacity-30 rounded-xl flex items-center justify-center">
            <Image 
              src="/grades/card.svg"
              alt="Teachers" 
              width={121} 
              height={93}
              className="w-full h-full"
            />
          </div>
        </div>

         {/* Schedule Card */}
         <div 
           className="cursor-pointer hover:scale-110 transition-all duration-300 animate-in fade-in zoom-in-50 delay-500"
           onClick={() => scrollToSection(getScheduleTarget())}
         >
           <div className="w-[70px] h-[53px] sm:w-[80px] sm:h-[60px] md:w-[85px] md:h-[64px] lg:w-[121px] lg:h-[93px] bg-white border-2 border-[#41AC7D] border-opacity-30 rounded-xl flex items-center justify-center">
             <Image 
               src="/grades/card-1.svg"
               alt="Schedule" 
               width={121} 
               height={93}
               className="w-full h-full"
             />
           </div>
         </div>


         {/* Testimonials Card */}
         <div 
           className="cursor-pointer hover:scale-110 transition-all duration-300 animate-in fade-in zoom-in-50 delay-700"
           onClick={() => scrollToSection('testimonials')}
         >
           <div className="w-[70px] h-[53px] sm:w-[80px] sm:h-[60px] md:w-[85px] md:h-[64px] lg:w-[121px] lg:h-[93px] bg-white border-2 border-[#41AC7D] border-opacity-30 rounded-xl flex items-center justify-center">
             <Image 
               src="/grades/card-5.svg"
               alt="Testimonials" 
               width={121} 
               height={93}
               className="w-full h-full"
             />
           </div>
         </div>

         {/* FAQs Card */}
         <div 
           className="cursor-pointer hover:scale-110 transition-all duration-300 animate-in fade-in zoom-in-50 delay-800"
           onClick={() => scrollToSection('faqs')}
         >
           <div className="w-[70px] h-[53px] sm:w-[80px] sm:h-[60px] md:w-[85px] md:h-[64px] lg:w-[121px] lg:h-[93px] bg-white border-2 border-[#41AC7D] border-opacity-30 rounded-xl flex items-center justify-center">
             <Image 
               src="/grades/card-4.svg"
               alt="FAQs" 
               width={121} 
               height={93}
               className="w-full h-full"
             />
           </div>
         </div>

        {/* Demo Card */}
        <div 
          className="cursor-pointer hover:scale-110 transition-all duration-300 animate-in fade-in zoom-in-50 delay-900"
          onClick={handleDemoClick}
        >
          <div className="w-[70px] h-[53px] sm:w-[80px] sm:h-[60px] md:w-[85px] md:h-[64px] lg:w-[121px] lg:h-[93px] bg-white border-2 border-[#41AC7D] border-opacity-30 rounded-xl flex items-center justify-center">
            <Image 
              src="/grades/card-3.svg"
              alt="Demo" 
              width={121} 
              height={93}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
    </RevealOnView>

    {/* Mentor Modal */}
    {showMentorModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <div className="bg-white rounded-lg p-4 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Our Teachers</h3>
            <button
              onClick={handleCloseMentorModal}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Loading teacher details...</span>
            </div>
          ) : mentorDetails.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentorDetails.map((mentor, index) => (
                <div key={mentor.id} className="text-center border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="w-24 h-24 mx-auto rounded-full mb-3 bg-gray-200 flex items-center justify-center">
                    <Image
                      src={IMAGE_URLS.MENTOR_PROFILE(mentor.id)}
                      alt={mentor.name}
                      width={96}
                      height={96}
                      className="mx-auto rounded-full"
                      onError={(e) => {
                        //console.log('Image failed to load for mentor ID:', mentor.id);
                        // Show placeholder with mentor ID
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gray-300 rounded-full">
                              <span class="text-gray-600 text-lg font-bold">${mentor.id}</span>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{mentor.name}</h4>
                  <p className="text-gray-600 text-sm mb-1">Master Teacher</p>
                  
                  {/* Qualifications */}
                  {mentor.qualifications && mentor.qualifications.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-500 mb-1">Qualification:</p>
                      <p className="text-xs text-gray-700">{mentor.qualifications[0].name}</p>
                      <p className="text-xs text-gray-500">{mentor.qualifications[0].institution}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto rounded-full mb-4 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 text-2xl font-bold">23</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Default Teacher</h4>
              <p className="text-gray-600 text-sm mb-4">Mentor ID: 23</p>
              <div className="flex gap-2 justify-center">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Book Demo
                </button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                  View Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default QuickLinks;
