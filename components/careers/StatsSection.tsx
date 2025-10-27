import React from 'react'

export const StatsSection = () => (
  <div className="py-10 sm:py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-400">5M+</h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">Students Taught</p>
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-400">100K+</h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">Learning Hours</p>
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-400">20+</h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">Countries Reached</p>
        </div>
      </div>
    </div>
  </div>
);

export default StatsSection
