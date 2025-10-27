import React from 'react'

export const StatsSection = () => (
  <div className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-600">5M+</h2>
          <p className="mt-2 text-lg font-medium text-gray-600">Students Taught</p>
        </div>
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-600">100K+</h2>
          <p className="mt-2 text-lg font-medium text-gray-600">Learning Hours</p>
        </div>
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-600">20+</h2>
          <p className="mt-2 text-lg font-medium text-gray-600">Countries Reached</p>
        </div>
      </div>
    </div>
  </div>
);

export default StatsSection
