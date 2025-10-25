export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FA] to-[#E8F4F8] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-[#0595CE] opacity-20 leading-none mb-4">
            404
          </h1>
          
          {/* Error Message */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1A2439] mb-3">
            Oops! Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-[#556A8E] mb-6 max-w-xl mx-auto">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best students sometimes take a wrong turn!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <a
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#0595CE] text-white font-montserrat font-semibold text-base rounded-lg hover:bg-[#047aa8] transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer text-center"
          >
            🏠 Go Back Home
          </a>
          
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 bg-white text-[#0595CE] font-montserrat font-semibold text-base rounded-lg border-2 border-[#0595CE] hover:bg-[#0595CE] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            ← Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          <h3 className="text-lg font-bold text-[#1A2439] mb-4">
            Popular Pages
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a
              href="/"
              className="p-3 rounded-lg bg-[#F0F7FA] hover:bg-[#0595CE] hover:text-white transition-all duration-300 text-center group"
            >
              <div className="text-lg mb-1 group-hover:scale-110 transition-transform duration-300">🏠</div>
              <div className="text-sm font-medium">Home</div>
            </a>
            
            <a
              href="/about"
              className="p-3 rounded-lg bg-[#F0F7FA] hover:bg-[#0595CE] hover:text-white transition-all duration-300 text-center group"
            >
              <div className="text-lg mb-1 group-hover:scale-110 transition-transform duration-300">👥</div>
              <div className="text-sm font-medium">About Us</div>
            </a>
            
            <a
              href="/contact"
              className="p-3 rounded-lg bg-[#F0F7FA] hover:bg-[#0595CE] hover:text-white transition-all duration-300 text-center group"
            >
              <div className="text-lg mb-1 group-hover:scale-110 transition-transform duration-300">📞</div>
              <div className="text-sm font-medium">Contact</div>
            </a>
            
            <a
              href="/blogs"
              className="p-3 rounded-lg bg-[#F0F7FA] hover:bg-[#0595CE] hover:text-white transition-all duration-300 text-center group"
            >
              <div className="text-lg mb-1 group-hover:scale-110 transition-transform duration-300">📚</div>
              <div className="text-sm font-medium">Blogs</div>
            </a>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-[#0595CE] to-[#047aa8] rounded-xl p-4 sm:p-6 text-white">
          <h3 className="text-lg font-bold mb-3">
            Need Help Finding Something?
          </h3>
          <p className="mb-4 opacity-90 text-sm">
            Our support team is here to help you navigate back to the right path.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+917330897291"
              className="px-4 py-2 bg-white text-[#0595CE] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 text-center text-sm"
            >
              📞 Call Us: +91 7330897291
            </a>
            <a
              href="mailto:support@sisyaclass.xyz"
              className="px-4 py-2 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0595CE] transition-all duration-300 text-center text-sm"
            >
              ✉️ Email Support
            </a>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-6 text-[#556A8E]">
          <p className="text-xs italic">
            "Every expert was once a beginner. Every pro was once an amateur. 
            Every icon was once an unknown." - Robin Sharma
          </p>
        </div>
      </div>
    </div>
  );
}