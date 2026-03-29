"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // close dropdown
  useEffect(() => {
    const handleClick = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">

        {/* Logo */}
        <div
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => router.push("/")}
        >
          TaskManager
        </div>

        {/* Right Side */}
        {!user ? (
          <div className="space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="relative" ref={menuRef}>

            {/* Avatar */}
            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer"
            >
              {user.image ? (
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                user.email?.charAt(0).toUpperCase()
              )}
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-lg border text-black">

                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <Link
                  href="/task"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Task
                </Link>

                {/* Admin Panel */}
                {user.role === "ADMIN" && (
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 text-blue-600"
                  >
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}