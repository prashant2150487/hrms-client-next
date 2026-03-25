"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = React.useState("robertallen@example.com")
  const [password, setPassword] = React.useState("password123")
  const [showPassword, setShowPassword] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full mt-10 max-w-[420px]">
      <div className="space-y-4">
        {/* Email Field with Floating-like Embedded Label */}
        <div className="group relative rounded-xl border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white px-4 py-2 transition-colors">
          <label htmlFor="email" className="block text-xs font-medium text-gray-normal group-focus-within:text-primary mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border-0 p-0 text-dark placeholder-gray-400 focus:ring-0 sm:text-sm bg-transparent outline-none font-medium"
            required
          />
        </div>

        {/* Password Field with Floating-like Embedded Label */}
        <div className="group relative rounded-xl border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white px-4 py-2 transition-colors">
          <label htmlFor="password" className="block text-xs font-medium text-gray-normal group-focus-within:text-primary mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border-0 p-0 text-dark placeholder-gray-400 focus:ring-0 sm:text-[15px] bg-transparent outline-none pr-10 font-mono tracking-widest"
              required
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-dark hover:text-gray-600 transition-colors bg-white px-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye className="h-[18px] w-[18px]" /> : <EyeOff className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center group cursor-pointer">
          <input
            id="remember"
            type="checkbox"
            className="h-[18px] w-[18px] rounded-[4px] border-none text-primary focus:ring-primary focus:ring-2 focus:ring-offset-1 focus:outline-none accent-primary bg-primary/20 appearance-none defaultChecked:bg-primary cursor-pointer relative"
            defaultChecked
          />
          {/* Custom Checkbox SVG Overlay if native is tricky; we'll rely on global ring or simple accent for now */}
          <label htmlFor="remember" className="ml-3 block text-sm font-semibold text-dark cursor-pointer group-hover:text-primary transition-colors">
            Remember Me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-primary hover:text-primary-hover transition-colors">
            Forgot Password?
          </a>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full flex justify-center py-4 px-4 border border-transparent rounded-[12px] shadow-sm text-[15px] font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-[54px] items-center transition-colors tracking-wide"
      >
        Login
      </button>
    </form>
  )
}
