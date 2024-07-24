"use client";
import React from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Logo and Company Info */}
          <div className="mb-6 md:mb-0">
            <Image
              src="/path/to/logo.png" // Update with your logo path
              alt="Company Logo"
              width={120}
              height={40}
            />
            <p className="mt-2 text-sm">© 2024 EduConnect. All rights reserved.</p>
            <p className="text-sm mt-2">123 Learning St, Knowledge City, AC 12345</p>
            <p className="text-sm mt-1">Phone: (123) 456-7890</p>
            <p className="text-sm mt-1">Email: support@educonnect.com</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row md:space-x-6 mb-6 md:mb-0">
            <a href="#about" className="mb-2 md:mb-0 hover:text-gray-400">About Us</a>
            <a href="#services" className="mb-2 md:mb-0 hover:text-gray-400">Services</a>
            <a href="#contact" className="mb-2 md:mb-0 hover:text-gray-400">Contact</a>
            <a href="#blog" className="mb-2 md:mb-0 hover:text-gray-400">Blog</a>
            <a href="#careers" className="mb-2 md:mb-0 hover:text-gray-400">Careers</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-6 md:mb-0">
            <a href="https://facebook.com" className="text-white hover:text-gray-400" aria-label="Facebook">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" className="text-white hover:text-gray-400" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" className="text-white hover:text-gray-400" aria-label="LinkedIn">
              <FaLinkedinIn size={20} />
            </a>
            <a href="https://instagram.com" className="text-white hover:text-gray-400" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h4>
          <p className="text-sm mb-4">Stay updated with our latest news and offers.</p>
          <form className="flex flex-col md:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 mb-2 md:mb-0 md:mr-2 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
