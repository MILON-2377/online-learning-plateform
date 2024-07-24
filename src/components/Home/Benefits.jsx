"use client";
import React from "react";
import { motion } from "framer-motion";
import learning1 from "../../../public/learning1.jpg";
import learning2 from "../../../public/learning4.jpg";
import Image from "next/image";

// Example benefits data
const benefits = [
  {
    id: 1,
    title: "Improved Learning Outcomes",
    description:
      "EduConnect offers personalized learning paths and tailored resources, helping students achieve better results and master new skills effectively.",
    benefits: [
      "Customized learning plans based on student performance.",
      "Access to a diverse range of high-quality educational resources.",
      "Regular assessments and feedback to track progress.",
    ],
  },
  {
    id: 2,
    title: "Enhanced Engagement",
    description:
      "EduConnect fosters a dynamic learning environment through interactive features, making learning more engaging and enjoyable for students.",
    benefits: [
      "Live virtual classrooms with real-time interaction.",
      "Gamified learning experiences and quizzes.",
      "Discussion forums and peer collaboration tools.",
    ],
  },
  // Add other benefits as needed
];

export default function Benefits() {
  return (
    <div className=" w-[95%] mx-auto lg:w-full p-5 bg-white">
      <div className=" w-full h-full flex lg:flex-row justify-between  ">
        <motion.div
          className="lg:w-[700px] lg:h-[450px]"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={learning2}
            className="w-full h-full object-cover"
            alt="learning image"
          />
        </motion.div>

        <div className=" lg:w-[50%] px5 flex flex-col justify-between ">
          <h1 className="text-4xl mb-5 font-bold text-black ">
            Why Choose EduConnect?
          </h1>
          {benefits.map((item) => (
            <motion.div
              key={item.id}
              className=""
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl  font-semibold mb-2">{item.title}</h2>
              <p className="text-lg  mb-4">{item.description}</p>
              <ul className="list-disc  pl-5">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm  mb-2">
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
