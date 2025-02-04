"use client";
import { svgIconClasses } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TemporaryDrawer from "@/components/TemporaryDrawer";
import BasicModal from "@/components/BasicModal";

const Navbar = () => {
  const [isClick, setIsCLick] = useState(false);

  const toggleNavbar = () => {
    setIsCLick(!isClick);
  };

  return (
    <>
      <nav className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <TemporaryDrawer />
              <div className="flex-shrink-0">
                <Link href="" className="text-white">
                  LOGO
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <Link
                  href=""
                  className="text-white hover:bg-sky-700 hover:text-white rounded-2xl p-2"
                >
                  Home
                </Link>
                <Link
                  href=""
                  className="text-white hover:bg-sky-700 hover:text-white rounded-2xl p-2"
                >
                  Product
                </Link>
                <Link
                  href=""
                  className="text-white hover:bg-sky-700 hover:text-white rounded-2xl p-2"
                >
                  About Us
                </Link>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-white  hover:text-white"
                onClick={toggleNavbar}
              >
                {isClick ? (
                  <svg
                    className="h-6 m-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6L12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 m-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isClick && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href=""
                className="text-white block hover:bg-sky-700 hover:text-white rounded-2xl p-2"
              >
                Home
              </Link>
              <Link
                href=""
                className="text-white block hover:bg-sky-700 hover:text-white rounded-2xl p-2"
              >
                Home
              </Link>
              <Link
                href=""
                className="text-white block hover:bg-sky-700 hover:text-white rounded-2xl p-2"
              >
                Home
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
