import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
        {/* Left Section: Logo and Company Info */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">MyBlogSite</h2>
          <p className="text-gray-400">Your daily dose of quality content.</p>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Section: Social Media Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
          <ul className="flex space-x-4">
            <li><a href="https://facebook.com" className="hover:text-blue-500"><i className="fab fa-facebook-f"></i> Facebook</a></li>
            <li><a href="https://twitter.com" className="hover:text-blue-300"><i className="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="https://instagram.com" className="hover:text-pink-500"><i className="fab fa-instagram"></i> Instagram</a></li>
            <li><a href="https://linkedin.com" className="hover:text-blue-700"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} MyBlogSite. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
