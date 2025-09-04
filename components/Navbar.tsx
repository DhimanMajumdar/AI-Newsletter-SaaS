"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi"; // Logout icon from react-icons

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/signin");
  };

  if (!user) {
    return null; // Don't show navbar if not logged in
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Personalized AI Newsletter
            </Link>
          </div>

          {/* User info + Logout */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="text-sm sm:text-base text-gray-600 truncate max-w-[100px] sm:max-w-[200px]">
              Welcome, {user.email}
            </span>

            {/* Logout Button for medium+ screens */}
            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center px-3 py-2 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Logout
            </button>

            {/* Logout Icon for small screens */}
            <button
              onClick={handleLogout}
              className="sm:hidden inline-flex items-center p-2 rounded-md text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              aria-label="Logout"
            >
              <FiLogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
