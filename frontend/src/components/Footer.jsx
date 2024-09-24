import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <div className="bg-gradient-to-r from-pink-200 to-orange-200 pt-6 ">
       <div className="bg-gradient-to-r from-teal-300 to-purple-300 text-gray-900 py-8 relative overflow-hidden rounded-t-3xl md:rounded-t-3xl shadow-lg">
       <div className="container mx-auto text-center">
            {/* Footer Text */}
            <p className="text-lg">&copy; {new Date().getFullYear()} <span className="font-bold">Blogyfi</span>. All rights reserved.</p>
            <p className="text-md mt-2">Created by <span className="font-semibold text-indigo-700"><a 
  href="https://www.linkedin.com/in/thevaibhavpandey/" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="text-indigo-600 hover:underline"
>
  Vaibhav Pandey
</a>

            </span></p>
            
            {/* Image Link with Hover Animation */}
            <a 
              href="https://www.linkedin.com/in/thevaibhavpandey/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4"
            >
              <img
                className="transition-transform duration-500 ease-in-out hover:scale-125 hover:shadow-2xl hover:brightness-150"
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/500/linkedin.png"
                alt="LinkedIn"
              />
            </a>
          </div>
  
          {/* Animated Background Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-400 rounded-full opacity-20 animate-pulse delay-75"></div>
        </div>
      </div>
    );
  };
  
  export default Footer;
  