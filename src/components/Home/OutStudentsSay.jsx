"use client";
import React from "react";
import Image from "next/image";
import styles from '../../styles/OurStudentsSay.module.css'; // Import the CSS module

// Example testimonials data with images
const testimonials = [
    {
        id: 1,
        text: "EduConnect has transformed my learning experience. The personalized approach is fantastic!",
        name: "Alice",
        course: "Computer Science",
        image: "/path/to/image1.jpg", // Update with actual image path
      },
      {
        id: 2,
        text: "The interactive features and resources are top-notch. Highly recommend EduConnect!",
        name: "Bob",
        course: "Mathematics",
        image: "/path/to/image2.jpg", // Update with actual image path
      },
      {
        id: 3,
        text: "I love the dynamic environment. It makes studying more engaging and productive.",
        name: "Charlie",
        course: "Physics",
        image: "/path/to/image3.jpg", // Update with actual image path
      },
      {
        id: 4,
        text: "The platform’s user-friendly interface has made my studies much more enjoyable and efficient.",
        name: "David",
        course: "Engineering",
        image: "/path/to/image4.jpg", // Update with actual image path
      },
      {
        id: 5,
        text: "EduConnect’s resources and tools have significantly enhanced my learning outcomes. Truly a game-changer!",
        name: "Eva",
        course: "Biology",
        image: "/path/to/image5.jpg", // Update with actual image path
      },
];

export default function OurStudentsSay() {
  const extendedTestimonials = [...testimonials, ...testimonials]; // Duplicate testimonials for continuous effect

  return (
    <div className=" relative overflow-hidden bg-gray-100 p-10">
      <div className={styles.testimonialContainer}>
        <div className={styles.testimonialWrapper}>
          {extendedTestimonials.map((testimonial, index) => (
            <div
              key={index + 2}
              className={styles.testimonialCard}
            >
              <div className="w-24 h-24 mb-4 flex items-center justify-center">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name}'s image`}
                  width={96}
                  height={96}
                  className="object-cover rounded-full"
                />
              </div>
              <p className="text-sm italic mb-4">
                {`"${testimonial.text}"`}
              </p>
              <p className="font-semibold mb-1">{testimonial.name}</p>
              <p className="text-xs text-gray-500">{testimonial.course}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
