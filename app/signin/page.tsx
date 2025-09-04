"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleAuth(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (error: any) {
      setMessage(error.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Heading */}
        <div className="text-center px-2 sm:px-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Personalized AI Newsletter
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            {isSignUp ? "Create your Account" : "Sign In to your Account"}
          </p>
        </div>

        {/* Form Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6">
          <form onSubmit={handleAuth} className="space-y-6">
            {message && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 text-sm text-green-600">
                {message}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading
                  ? "Processing..."
                  : isSignUp
                  ? "Create Account"
                  : "Sign In"}
              </button>
            </div>
          </form>

          {/* Toggle SignUp/SignIn */}
          <div className="mt-6 text-center space-y-2">
            <button
              type="button"
              onClick={() => setIsSignUp((prev) => !prev)}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
            <p className="text-xs sm:text-sm text-blue-700 bg-blue-100 px-3 py-2 rounded-md">
              USE YOUR ACTUAL EMAIL FOR CONFIRMATION
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
