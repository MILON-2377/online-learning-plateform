"use client";
import Banner from "@/components/Home/Banner";
import Benefits from "@/components/Home/Benefits";
import CallToAction from "@/components/Home/CallToAction";
import Features from "@/components/Home/Features";
import Footer from "@/components/Home/Footer";
import OurStudentsSay from "@/components/Home/OutStudentsSay";

export default function Home() {
  const user = {profession: "Student"};

  return (
    <main className=" flex flex-col gap-[100px] bg-white ">
      {/* banner section */}
      <Banner />

      {/* features section */}
      <div className="">
        <Features />
      </div>

      {/* benefits section */}
      <Benefits />

      {/* Call to action section */}
      <CallToAction />

      {/* our studens says section */}
      <OurStudentsSay />

      {/* footer section */}
      <Footer />
    </main>
  );
}
