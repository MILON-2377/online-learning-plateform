"use client";
import React from "react";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <div className=" w-[95%] mx-auto lg:w-full p-5 ">
      <div className="text-center">
        <motion.h1
          className="text-3xl lg:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get Started Today!
        </motion.h1>
        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Start your journey with us and experience the benefits firsthand. Choose the option that suits you best!
        </motion.p>
        <div className="flex flex-col lg:flex-row justify-center gap-4">
          <motion.a
            href="#signup"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Sign Up for Free
          </motion.a>
          <motion.a
            href="#demo"
            className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Request a Demo
          </motion.a>
          <motion.a
            href="#learn-more"
            className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Learn More
          </motion.a>
        </div>
      </div>
    </div>
  );
}
