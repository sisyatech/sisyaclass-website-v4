"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface BigCourseData {
  id: number;
  courseDemoPrice: number;
  webLabel: string;
  bigCourse: {
    name: string;
    startDate: string;
    price: number;
    currentPrice: number;
    partialPrice: number;
  };
}

interface NewSectionProps {
  gradeNumber?: number;
}

const NewSection = ({ gradeNumber }: NewSectionProps) => {
  const [courseData, setCourseData] = useState<BigCourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'full' | 'part'>('full');

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!gradeNumber) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          'https://sisyaclass.xyz/student/get_big_course_web_by_grade',
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

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setCourseData(data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [gradeNumber]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="w-full h-auto min-h-[600px] bg-[#DDDEFE80] flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0595CE] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  // Don't render if no course data
  if (!courseData) {
    return null;
  }

  // Calculate payment details based on selected payment method
  const fullPrice = courseData.bigCourse.currentPrice;
  const partPrice = courseData.bigCourse.partialPrice;
  const selectedPrice = paymentMethod === 'full' ? fullPrice : partPrice;
  
  const gstRate = 0.18;
  const priceWithoutGST = (selectedPrice / (1 + gstRate)).toFixed(2);
  const gstAmount = (selectedPrice - parseFloat(priceWithoutGST)).toFixed(2);

  return (
    <div className="w-full h-auto min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[700px] xl:min-h-[809px] -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-19 opacity-100 bg-[#DDDEFE80] flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-1000">
      {/* Course Details Title - Outside container on mobile/tablet, inside on desktop */}
      <h1 className="block lg:hidden text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 animate-in fade-in slide-in-from-top-4 duration-500 delay-1100">Course Details</h1>
      
      {/* Inner Container */}
      <div className="w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[1136px] h-auto min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[551px] mt-4 sm:mt-6 md:mt-8 lg:mt-30 opacity-100 rounded-[16px] sm:rounded-[20px] lg:rounded-[22px] bg-white shadow-[2px_2px_10px_0px_rgba(0,0,0,0.25)] p-3 sm:p-4 md:p-6 lg:p-8 relative animate-in fade-in zoom-in-95 duration-700 delay-1200">
        {/* Course Details Title - Inside container on desktop only */}
        <h1 className="hidden lg:block text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 -mt-16 sm:-mt-18 md:-mt-20 animate-in fade-in slide-in-from-left-4 duration-500 delay-1300">Course Details</h1>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 relative mt-4 sm:mt-6 md:mt-8 lg:mt-18">
          {/* Vertical Divider Line - Hidden on mobile and tablet */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#E8E8E8] transform -translate-x-1/2"></div>
          
          {/* Left Column - Features and Batch Details */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 animate-in fade-in slide-in-from-left-6 duration-700 delay-1400">
            {/* Batch Start Date */}
            <div className="w-full h-auto min-h-[35px] sm:min-h-[40px] md:min-h-[44px] px-3 sm:px-4 py-2 rounded-[8px] sm:rounded-[10px] border-[1.5px] sm:border-[1.7px] border-dashed border-[#0595CE] bg-[#EAF4F9] opacity-100">
              <span className="text-[#0595CE] font-medium text-xs sm:text-sm md:text-base">
                Batch Start date: {formatDate(courseData.bigCourse.startDate)}
              </span>
            </div>
            
            {/* Features Section */}
            <div>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#575CFB] mb-2 sm:mb-3 md:mb-4">Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="flex items-center space-x-2 p-2 rounded border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                  />
                  <span className="text-black text-xs sm:text-sm md:text-base">In Class doubt-Solving</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                  />
                  <span className="text-black text-xs sm:text-sm md:text-base">1-1 Mentorship</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded bg-[#EDEEFE80] border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                  />
                  <span className="text-black text-xs sm:text-sm md:text-base">Live Classes by IIT/NIT Educators</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded bg-[#EDEEFE80] border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                  />
                  <span className="text-black text-xs sm:text-sm md:text-base">Motivational Classes</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                  />
                  <span className="text-black text-xs sm:text-sm md:text-base">Class Materials</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                  />
                  <span className="text-black text-xs sm:text-sm md:text-base">Study Materials</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded bg-[#EDEEFE80] border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                  />
                  <span className="text-black text-xs sm:text-sm md:text-base">Assignments</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded bg-[#EDEEFE80] border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                  />
                  <span className="text-black text-xs sm:text-sm md:text-base">Access to SISYA AI</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Payment Information */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 animate-in fade-in slide-in-from-right-6 duration-700 delay-1400">
            {/* Choose Payment Method */}
            <div>
              <h3 className="mb-2 sm:mb-3 font-montserrat font-medium text-xs sm:text-[13.41px] leading-none tracking-[0.01em] text-[#ABABAB]">
                Choose payment method
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <button 
                  onClick={() => setPaymentMethod('full')}
                  className="flex items-center space-x-2 sm:space-x-3 w-full text-left"
                >
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-[1.34px] border-[#ABABAB] flex-shrink-0 ${paymentMethod === 'full' ? 'bg-[#0595CE]' : ''}`}>
                    {paymentMethod === 'full' && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">Full payment (₹{fullPrice})</span>
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-red-100 border border-red-300 text-red-600 text-xs rounded flex-shrink-0">Recommended</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('part')}
                  className="flex items-center space-x-2 sm:space-x-3 w-full text-left"
                >
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-[1.34px] border-[#ABABAB] flex-shrink-0 ${paymentMethod === 'part' ? 'bg-[#0595CE]' : ''}`}>
                    {paymentMethod === 'part' && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">Part payment (₹{partPrice})</span>
                </button>
              </div>
            </div>
            
            {/* Payment Details */}
            <div>
              <h3 className="mb-2 sm:mb-3 font-montserrat font-medium text-xs sm:text-[13.41px] leading-none tracking-[0.01em] text-[#ABABAB]">
                Payment details
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-montserrat font-normal text-xs sm:text-sm md:text-[16.1px] leading-tight tracking-[0.01em] text-[#1F1F39] flex-1 pr-2">
                    Course price (excluding GST)
                  </span>
                  <span className="font-montserrat font-semibold text-xs sm:text-sm md:text-[16.1px] leading-none tracking-[0.01em] text-right text-[#1F1F39] flex-shrink-0">
                    ₹ {priceWithoutGST}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-montserrat font-semibold text-xs sm:text-sm md:text-[16.1px] leading-tight tracking-[0.01em] text-[#1F1F39] flex-1 pr-2">
                    Coupon applied
                  </span>
                  <span className="font-montserrat font-semibold text-xs sm:text-sm md:text-[16.1px] leading-none tracking-[0.01em] text-right text-[#1F1F39] flex-shrink-0">
                    - ₹0
                  </span>
                </div>
                {/* Divider line between Coupon applied and Final amount */}
                <div className="border-t border-gray-300 my-3 sm:my-4"></div>
                <div className="flex justify-between items-start">
                  <span className="font-montserrat font-semibold text-xs sm:text-sm md:text-[16.1px] leading-tight tracking-[0.01em] text-[#1F1F39] flex-1 pr-2">
                    Final amount
                  </span>
                  <span className="font-montserrat font-semibold text-xs sm:text-sm md:text-[16.1px] leading-none tracking-[0.01em] text-right text-[#1F1F39] flex-shrink-0">
                    ₹ {priceWithoutGST}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-montserrat font-normal text-xs sm:text-sm md:text-[16.1px] leading-tight tracking-[0.01em] text-[#1F1F39] flex-1 pr-2">
                    GST (18%)
                  </span>
                  <span className="font-montserrat font-semibold text-xs sm:text-sm md:text-[16.1px] leading-none tracking-[0.01em] text-right text-[#1F1F39] flex-shrink-0">
                    ₹{gstAmount}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Total Amount */}
            <div className="border-t pt-3 sm:pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg sm:text-xl font-bold text-[#0595CE]">Total Amount</span>
                <span className="text-lg sm:text-xl font-bold text-[#0595CE]">₹{selectedPrice}</span>
              </div>
            </div>
            
            {/* Make Payment Button */}
            <div className="flex justify-center lg:justify-start pt-2 sm:pt-4">
              <button className="w-full max-w-[200px] sm:max-w-[220px] md:max-w-[233px] h-[40px] sm:h-[45px] md:h-[52px] lg:h-[59px] rounded-[25px] sm:rounded-[30px] bg-[#0595CE] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] font-roboto font-medium text-sm sm:text-base leading-none tracking-normal text-center text-white hover:bg-[#047aa8] transition-colors lg:ml-34 xl:ml-40">
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSection;
