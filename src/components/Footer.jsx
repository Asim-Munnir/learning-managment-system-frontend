import { Link } from "react-router-dom";
import { Facebook, Twitter, Github, Linkedin, School } from "lucide-react";

const linkClass =
  "relative w-fit block transition-all hover:-translate-y-[2px] text-[15px] " +
  "hover:text-blue-600 dark:hover:text-blue-400 " +
  "after:absolute after:left-1/2 after:-bottom-1 after:translate-x-[-50%] after:w-0 after:h-[2px] " +
  "after:bg-blue-600 dark:after:bg-blue-400 after:rounded-full " +
  "after:transition-all after:duration-300 hover:after:w-full";

const iconClass =
  "p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 " +
  "transition-all duration-300 hover:bg-blue-600 hover:text-white " +
  "hover:shadow-[0_4px_15px_rgba(37,99,235,0.4)] dark:hover:shadow-[0_4px_15px_rgba(37,99,235,0.4)] " +
  "cursor-pointer";

const Footer = () => {
  return (
    <footer className="mt-24 bg-white dark:bg-[#020817] border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-14">
        
        {/* Brand */}
        <div className="fade-in">
          <div className="flex items-center gap-2 mb-4">
            <School size={36} className="text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              E-Learning
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
            Master programming with structured, real-world courses crafted for developers who want to grow fast.
          </p>
        </div>

        {/* Quick Links */}
        <div className="fade-in">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link className={linkClass} to="/">Home</Link></li>
            <li><Link className={linkClass} to="/course/search">Courses</Link></li>
            <li><Link className={linkClass} to="/profile">Profile</Link></li>
            <li><Link className={linkClass} to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="fade-in">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Support</h4>
          <ul className="space-y-3">
            <li><Link className={linkClass} to="/faq">FAQ</Link></li>
            <li><Link className={linkClass} to="/about">About Us</Link></li>
            <li><Link className={linkClass} to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className={linkClass} to="/terms-&-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="fade-in">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Follow Us</h4>

          <div className="flex items-center gap-4">
            <a className={iconClass}><Facebook size={20} /></a>
            <a className={iconClass}><Twitter size={20} /></a>
            <a className={iconClass}><Linkedin size={20} /></a>
            <a className={iconClass}><Github size={20} /></a>
          </div>
        </div>

      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-5 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} E-Learning — All Rights Reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
