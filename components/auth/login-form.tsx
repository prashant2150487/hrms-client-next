"use client"

import * as React from "react"
import Input, { PasswordInput } from "@/components/ui/input"
import { Checkbox } from "../ui/checkbox"
import { AuthService } from "@/features/auth/authApi"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/features/auth/authSlice"

export function LoginForm() {
  const [email, setEmail] = React.useState("robertallen@example.com")
  const [password, setPassword] = React.useState("password123")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full mt-10 max-w-[420px]">
      <div className="space-y-6">
        {/* Email Field */}
        <Input
          id="email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          size="lg"
          theme="purple"
          floatLabel={false}
        />

        {/* Password Field */}
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          size="lg"
          theme="purple"
          floatLabel={false}
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center group cursor-pointer">
          <Checkbox label="Accept terms" checked={true} />

        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-primary hover:text-primary-hover transition-colors">
            Forgot Password?
          </a>
        </div>
      </div>

      {/* {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </div>
      )} */}

      <button
        type="submit"
        className="mt-6 w-full flex justify-center py-4 px-4 border border-transparent rounded-[12px] shadow-sm text-[15px] font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-[54px] items-center transition-colors tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {"Login"}
      </button>
    </form>
  )
}
