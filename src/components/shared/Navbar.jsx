"use client";

import { useAuth } from "@/AuthProvider/AuthProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  // const { user } = useAuth();
  const user = { profession: "Teacher" };
  const navbarLinks = NavbarTitlesHandle(user);
  const router = useRouter();
  const path = usePathname();
  // console.log(user);

  return (
    <div className="w-full z-20 ">
      <div
        className={`navbar w-full border-b-gray-200 ${
          path === "/assignments/teacher/all" || path === "/classes/teacher" ? "border-b-0" : " border-b  "
        } `}
      >
        <div className=" navbar-start lg:hidden ">
          {/* dropdown drawer for md device section */}
          <div className="dropdown lg:hidden mr-5 sm:mr-0 ">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-8 sm:w-8 mr-5 sm:mr-0 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                  {/* Sidebar content here */}
                  {navbarLinks?.map((item, index) => (
                    <NavbarLinks
                      key={index}
                      href={item.path}
                      isActive={path === item.path}
                      pathNam={path}
                      nestedLinks={item.nestedLinks}
                    >
                      {item.title}
                    </NavbarLinks>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <a href="/" className=" lg:hidden ml-4 text-3xl font-bold ">
            EduConnect
          </a>
        </div>

        {/* navbar links section for lg device */}
        <div className=" hidden lg:flex items-center gap-5 p-5 ">
          <div>
            <a
              href="/"
              className=" md:hidden lg:flex items-center justify-center text-3xl font-bold "
            >
              EduConnect
            </a>
          </div>
          <div className=" flex items-center gap-2 ">
            {navbarLinks?.map((item, index) => (
              <NavbarLinks
                key={index}
                href={item.path}
                isActive={path === item.path}
                pathNam={path}
                nestedLinks={item.nestedLinks}
              >
                {item.title}
              </NavbarLinks>
            ))}
          </div>
        </div>

        <div className="navbar-end">
          {
            
          }
          <a
            href="/login"
            className="px-4 py-1 rounded-full bg-blue-700 text-white hover:bg-blue-500 "
          >
            LogIn
          </a>
        </div>
      </div>
    </div>
  );
}

// navbarLink component with animation
const NavbarLinks = ({ href, isActive, children, nestedLinks, pathNam }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`px-3 py-1 rounded-full ${
          isActive
            ? "border-gray-200 border text-blue-700 font-[500] "
            : "hover:border hover:border-gray-200"
        }`}
      >
        <Link href={href} className="block">
          {children}
        </Link>
      </motion.div>
      {nestedLinks && isOpen && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute top-full left-0 mt-2 w-48 bg-white border z-50  border-gray-200 rounded-md shadow-lg"
        >
          <ul className="py-1">
            {nestedLinks.map((link, index) => (
              <li
                onClick={() => setOpen(false)}
                key={index}
                className={
                  pathNam === link.path
                    ? "hover:bg-gray-100 text-blue-500 "
                    : "hover:bg-gray-100"
                }
              >
                <Link
                  href={link.path}
                  className="block px-4 py-2 text-sm text-gray-700"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// navbar titels handler
function NavbarTitlesHandle(user) {
  if (user?.profession === "Student") return studentsNavLinks;
  if (user?.profession === "Teacher") return teacherNavtitles;
}

// students navbar links
const studentsNavLinks = [
  {
    title: "Courses",
    path: "/courses",
  },
  {
    title: "Assignments",
    path: "/assignments",
  },
  {
    title: "My Classes",
    path: "/my-classes",
  },
  {
    title: "grades",
    path: "/grades",
  },
  {
    title: "Messages",
    path: "/messages",
  },
];

// teacher navlinks
const teacherNavtitles = [
  {
    title: "Classes",
    path: "/classes/teacher",
  },
  {
    title: "Assignments",
    path: "/assignments/teacher",
    nestedLinks: [
      { title: "All Assignments", path: "/assignments/teacher/all" },
      { title: "Create Assignments", path: "/assignments/teacher/create" },
    ],
  },
  {
    title: "Grades",
    path: "/grades",
  },
  {
    title: "Students",
    path: "/students",
  },
  {
    title: "Messages",
    path: "/messages",
  },
];
