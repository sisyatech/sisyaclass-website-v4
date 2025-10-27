import React from 'react'

export const ApplicationProcessSection = () => (
  <div className="py-16 sm:py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
        Our Hiring Process
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        We keep things simple, transparent, and respectful of your time.
      </p>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 relative">
        {/* Step 1 */}
        <div className="flex flex-col items-center p-6">
          <div className="text-5xl font-extrabold text-blue-200">01</div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">Apply</h3>
          <p className="mt-2 text-base text-gray-600">Submit your application online. Our team will review it carefully.</p>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-center p-6">
          <div className="text-5xl font-extrabold text-blue-300">02</div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">Interview</h3>
          <p className="mt-2 text-base text-gray-600">Meet with the team, showcase your skills, and learn about our culture.</p>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-center p-6">
          <div className="text-5xl font-extrabold text-blue-400">03</div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">Offer</h3>
          <p className="mt-2 text-base text-gray-600">If it's a mutual fit, we'll make you an offer to join the team!</p>
        </div>
      </div>
    </div>
  </div>
);

export default ApplicationProcessSection
