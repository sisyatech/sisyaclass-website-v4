"use client";

import React, { useState, useMemo } from "react";
import JobCard from "./JobCard"; // Assuming JobCard is in the same directory
import { ApplicationModal } from "./ApplicationModal";

// --- Job Interface ---
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  salary: string;
  level: string;
  postedTime: string;
  locationStatus: string;
  icon?: React.ReactNode;
}

// --- Mock Data ---
const jobs: Job[] = [
  {
    id: 1,
    title: "Master Teacher",
    department: "Teaching",
    location: "Visakhapatnam",
    type: "Fulltime",
    description: "• Minimum 2+ Years Of Experience In Online Coaching.",
    salary: "4-6 LPA",
    level: "Mid Level",
    postedTime: "3 Days Ago",
    locationStatus: "On-Site",
  },
  {
    id: 2,
    title: "Mentor Teacher",
    department: "Teaching",
    location: "Visakhapatnam",
    type: "Fulltime",
    description: "• Minimum 2+ Years Of Experience In Online Coaching.",
    salary: "4-6 LPA",
    level: "Mid Level",
    postedTime: "3 Days Ago",
    locationStatus: "On-Site",
  },
  {
    id: 3,
    title: "Graphic Designer",
    department: "Design",
    location: "Visakhapatnam",
    type: "Fulltime",
    description: "• Minimum 2+ Years Of Experience In Graphic Design.",
    salary: "4-6 LPA",
    level: "Mid Level",
    postedTime: "3 Days Ago",
    locationStatus: "On-Site",
  },
  {
    id: 4,
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Fulltime",
    description: "• 5+ Years React experience.",
    salary: "15-20 LPA",
    level: "Senior Level",
    postedTime: "1 Day Ago",
    locationStatus: "Remote",
  },
  {
    id: 5,
    title: "Content Strategist - K-12",
    department: "Marketing",
    location: "Bangalore, IN",
    type: "Contract",
    description: "• Create engaging educational content for various platforms.",
    salary: "Competitive",
    level: "Mid Level",
    postedTime: "5 Days Ago",
    locationStatus: "Hybrid",
  },
  {
    id: 6,
    title: "Senior UI/UX Designer",
    department: "Product",
    location: "Remote",
    type: "Fulltime",
    description: "• Design intuitive and beautiful user interfaces.",
    salary: "18-22 LPA",
    level: "Senior Level",
    postedTime: "2 Days Ago",
    locationStatus: "Remote",
  },
];

// --- Component ---
export const OpeningsSection = () => {
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const departments = ["All", ...new Set(jobs.map((j) => j.department))];

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesDept = selectedDept === "All" || job.department === selectedDept;
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()); // Added location search
      return matchesDept && matchesSearch;
    });
  }, [selectedDept, searchTerm]);

  return (
    <div id="open-positions" className="py-10 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center">
          Join Our Team
        </h2>

        {/* Filters */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Department Filter */}
            <div className="w-full md:w-64 relative">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none transition-all cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "All" ? "All Departments" : dept}
                  </option>
                ))}
              </select>
              <svg 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(searchTerm || selectedDept !== "All") && (
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <span>Active filters:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  "{searchTerm}"
                </span>
              )}
              {selectedDept !== "All" && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {selectedDept}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDept("All");
                }}
                className="ml-2 text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Job List */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onApplyClick={() => handleApplyClick(job)} />
            ))
          ) : (
            <div className="text-center py-12 md:col-span-2 lg:col-span-3">
              <h3 className="text-xl font-semibold text-gray-700">
                No matching positions found.
              </h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or check out our talent community!
              </p>
            </div>
          )}
        </div>

        {/* Application Modal */}
        {isModalOpen && selectedJob && (
          <ApplicationModal job={selectedJob} onClose={handleModalClose} />
        )}
      </div>
    </div>
  );
};

export default OpeningsSection;
