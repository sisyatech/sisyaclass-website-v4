import React from 'react';

// --- SVG Icons ---
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 mr-1">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

// Basic Placeholder Icon
const JobIconPlaceholder = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-500">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);


// --- Updated Job Interface ---
interface Job {
  id: number;
  title: string;
  department: string; // Keep for filtering, maybe display optionally
  location: string;
  type: string; // e.g., "Fulltime"
  description: string; // e.g., "Minimum 2+ Years Of Experience..."
  salary: string; // e.g., "4-6 LPA"
  level: string; // e.g., "Mid Level"
  postedTime: string; // e.g., "3 Days Ago"
  locationStatus: string; // e.g., "On-Site" or "Remote"
  icon?: React.ReactNode; // Optional: Specific icon component per job
}

// --- Updated Mock Data ---
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
    // icon: <SomeSpecificIcon /> // Add specific icons later
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
];

// --- Updated JobCard Component ---
interface JobCardProps {
  job: Job;
  onApplyClick: () => void;
}

export const JobCard = ({ job, onApplyClick }: JobCardProps) => (
  <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg w-full max-w-sm flex flex-col justify-between h-[320px]">
    {/* Top Section: Title, Location, Icon */}
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
        <div className="flex items-center mt-1">
          <LocationIcon />
          <span className="text-sm text-gray-600">{job.location}</span>
        </div>
      </div>
      <div className="shrink-0 ml-4">
        {/* Render specific icon if provided, otherwise placeholder */}
        {job.icon || <JobIconPlaceholder />} 
      </div>
    </div>

    {/* Middle Section: Description & Tags */}
    <div>
      <p className="text-sm text-gray-700 mb-4 h-12 overflow-hidden"> 
        {job.description}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full">{job.type}</span>
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">{job.locationStatus}</span>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">{job.salary}</span>
        <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-full">{job.level}</span>
      </div>
    </div>

    {/* Bottom Section: Posted Time & Apply Button */}
    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
      <span className="text-xs text-gray-500">{job.postedTime}</span>
      <button 
        onClick={onApplyClick}
        className="bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
      >
        Apply Now
      </button>
    </div>
  </div>
);

// Keep the default export if this is the main component in the file
export default JobCard;
