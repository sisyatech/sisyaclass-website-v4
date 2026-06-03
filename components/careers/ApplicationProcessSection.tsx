import React from 'react'

export const ApplicationProcessSection = () => (
  <div className="py-10 sm:py-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
        Our Hiring Process
      </h2>
      <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        We keep things simple, transparent, and respectful of your time.
      </p>
      <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative">
        {/* Step 1 */}
        <div className="flex flex-col items-center p-5 sm:p-6">
          <div className="text-4xl sm:text-5xl font-extrabold text-blue-200">01</div>
          <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-gray-900">Apply</h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">Submit your application online. Our team will review it carefully.</p>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-center p-5 sm:p-6">
          <div className="text-4xl sm:text-5xl font-extrabold text-blue-300">02</div>
          <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-gray-900">Interview</h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">Meet with the team, showcase your skills, and learn about our culture.</p>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-center p-5 sm:p-6">
          <div className="text-4xl sm:text-5xl font-extrabold text-blue-400">03</div>
          <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-gray-900">Offer</h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">If it's a mutual fit, we'll make you an offer to join the team!</p>
        </div>
      </div>
    </div>
  </div>
);

export default ApplicationProcessSection
