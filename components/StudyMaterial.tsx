import React from "react";

const StudyMaterial = () => {
  return (
    <div className="relative py-5 sm:py-12 px-6 sm:px-8 lg:px-20 mt-10 w-full bg-[#DADADA66]">
      <div className="max-w-7xl mx-auto">
        {/* Study Material Title */}
        <h2 className="font-montserrat font-bold text-[14px] leading-[19px] tracking-[0.03em] text-[#1A2439] mb-6">
          Study Material
        </h2>

        {/* Four Columns of NCERT Links (responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Column 1 */}
          <div className="space-y-3"> 
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity" style={{ color: '#161A38' }}>NCERT</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity" style={{ color: '#161A38' }}>NCERT solutions</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38]">NCERT solutions for class 12<span className="hidden sm:inline"><br /></span></a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">NCERT solutions for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>Maths</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">NCERT solutions for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>Physics</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">NCERT solutions for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>science</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">NCERT solutions for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>English</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">NCERT solutions for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>Hindi</a>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity" style={{ color: '#161A38' }}>Study Materials</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity" style={{ color: '#161A38' }}>Study Materials solutions</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38]">Study Materials for class 12<span className="hidden sm:inline"><br /></span></a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">Study Materials for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>Maths</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">Study Materials for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>Physics</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">Study Materials for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>science</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">Study Materials for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>English</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">Study Materials for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>Hindi</a>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity" style={{ color: '#161A38' }}>Sample Papers</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity" style={{ color: '#161A38' }}>Sample Papers solutions</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38]">Sample Papers for class 12<span className="hidden sm:inline"><br /></span></a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">Sample Papers for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>Maths</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">Sample Papers for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>Physics</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">Sample Papers for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>science</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">Sample Papers for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>English</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38] whitespace-nowrap sm:whitespace-normal">Sample Papers for class 12<span className="hidden sm:inline"><br /></span><span className="inline sm:hidden"> </span>Hindi</a>
          </div>

          {/* Column 4 */}
              <div className="space-y-3">
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity" style={{ color: '#161A38' }}>Previous Year Papers</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity" style={{ color: '#161A38' }}>Previous Year Papers solutions</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38]">Previous Year Papers for class 12<span className="hidden sm:inline"><br /></span></a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38]">Previous Year Papers for class 12<span className="hidden sm:inline"><br /></span> Maths</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38]">Previous Year Papers for class 12<span className="hidden sm:inline"><br /></span> Physics</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38]">Previous Year Papers for class 12<span className="hidden sm:inline"><br /></span> science</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38]">Previous Year Papers for class 12<span className="hidden sm:inline"><br /></span> English</a>
            <a href="#" className="block font-roboto font-normal text-[12px] leading-[14px] tracking-wide hover:opacity-70 transition-opacity text-[#161A38]">Previous Year Papers for class 12<span className="hidden sm:inline"><br /></span> Hindi</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterial;
