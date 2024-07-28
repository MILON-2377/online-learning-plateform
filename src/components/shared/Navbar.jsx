"use client";

import { useAuth } from "@/AuthProvider/AuthProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useAuth();
  const navbarLinks = NavbarTitlesHandle(user);
  const router = useRouter();
  const path = usePathname();
  // console.log(user);

  return (
    <div className="w-full">
      <div className="navbar w-full bg-base-100">
        <div className="navbar-start">
          {/* dropdown drawer for md device section */}
          <div className="dropdown lg:hidden ">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-8 sm:w-8 "
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
                    <li key={index}>
                      <a className="text-slate-700  " href={item.path}>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <a href="/" className=" md:hidden lg:block text-3xl font-bold px-5 ">
            EduConnect
          </a>

          {/* navbar links section for lg device */}
          <div className="flex items-center gap-5 px-5 ">
            {navbarLinks?.map((item, index) => (
              <Link 
              className={path === item.path ? " px-3 py-1 border border-gray-200 rounded-full font-semibold text-blue-500 " : " "}
              href={item.path} 
              key={index}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="navbar-end">
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

// navbar titels handle
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
    title: "My Classes",
    path: "/my-classes",
  },
  {
    title: "Assignments",
    path: "/assignments",
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
