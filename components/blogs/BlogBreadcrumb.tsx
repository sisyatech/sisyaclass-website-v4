import Link from "next/link";

export function BlogBreadcrumb() {
  return (
    <nav className="w-full py-3 px-4 sm:px-6 md:px-8 bg-white border-b border-gray-200" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link 
              href="/" 
              className="text-gray-500 hover:text-[#0595CE] transition-colors duration-200 font-medium"
            >
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <svg 
              className="w-4 h-4 text-gray-400 mx-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-[#0595CE] font-medium">Blogs</span>
          </li>
        </ol>
      </div>
    </nav>
  );
}
