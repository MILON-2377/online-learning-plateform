"use client";
import React from "react";
import { motion } from "framer-motion";

// Example features data
const features = [
  {
    id: 1,
    title: "Course Management",
    description: "Organize and deliver engaging courses with ease.",
    icon: "📚", // Book with a checkmark
    img: "path/to/image1.jpg", // Replace with actual image path
  },
  {
    id: 2,
    title: "Virtual Classrooms",
    description: "Foster interactive learning through live sessions.",
    icon: "📹", // Video call
    img: "path/to/image2.jpg", // Replace with actual image path
  },
  {
    id: 3,
    title: "Assessments and Analytics",
    description: "Track progress and personalize learning paths.",
    icon: "📊", // Bar chart
    img: "path/to/image3.jpg", // Replace with actual image path
  },
  {
    id: 4,
    title: "Resource Library",
    description: "Access a vast collection of educational materials.",
    icon: "📖", // Open book
    img: "path/to/image4.jpg", // Replace with actual image path
  },
  {
    id: 5,
    title: "Discussion Forums",
    description: "Engage with peers and instructors in lively discussions.",
    icon: "💬", // Speech bubble
    img: "path/to/image5.jpg", // Replace with actual image path
  },
  {
    id: 6,
    title: "Certification Programs",
    description: "Earn certifications to showcase your achievements.",
    icon: "🏆", // Trophy
    img: "path/to/image6.jpg", // Replace with actual image path
  },
  {
    id: 7,
    title: "Mobile Access",
    description: "Learn on the go with our mobile-friendly platform.",
    icon: "📱", // Mobile phone
    img: "path/to/image7.jpg", // Replace with actual image path
  },
  {
    id: 8,
    title: "Customizable Dashboards",
    description: "Personalize your dashboard to fit your learning needs.",
    icon: "⚙️", // Gear
    img: "path/to/image8.jpg", // Replace with actual image path
  },
];

export default function Features() {
  return (
    <div className="w-[95%] mx-auto lg:w-full p-5 bg-gray-200 bg-opacity-50">
      <h1 className="text-3xl mb-5 font-bold">Features</h1>
      <div className="grid lg:grid-cols-4 gap-5">
        {features.map((item) => (
          <motion.div
            key={item.id}
            className="h-[400px] bg-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }} // Trigger animation once, with 10% of the element in view
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-[60%]">
              <img
                className="w-full h-full object-cover"
                src={item.img}
                alt={item.title}
              />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <span className="text-3xl">{item.icon}</span>
              <h1 className="text-xl text-gray-600">{item.title}</h1>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
