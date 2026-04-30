"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RegisterForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle register logic here
    console.log("Register attempt with:", { name, email, password });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="group relative rounded-xl border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white px-4 py-2 transition-colors">
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-normal group-focus-within:text-primary mb-1"
            >
              name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full border-0 p-0 text-dark placeholder-gray-400 focus:ring-0 sm:text-sm bg-transparent outline-none font-medium"
              required
            />
          </div>
          <div className="group relative rounded-xl border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white px-4 py-2 transition-colors">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-normal group-focus-within:text-primary mb-1"
            >
              Email
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
          <div className="group relative rounded-xl border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white px-4 py-2 transition-colors">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-normal group-focus-within:text-primary mb-1"
            >
              Subdomain
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
          <div className="group relative rounded-xl border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white px-4 py-2 transition-colors">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-normal group-focus-within:text-primary mb-1"
            >
              Password
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
          <div className="group relative rounded-xl border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white px-4 py-2 transition-colors">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-normal group-focus-within:text-primary mb-1"
            >
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

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <div className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
