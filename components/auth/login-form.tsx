"use client";

import * as React from "react";
import Input, { PasswordInput } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { login } from "@/api/auth/auth";
import Button from "../ui/button";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = React.useState<string>("admin11@lapscore.com");
  const [password, setPassword] = React.useState<string>("test11@123");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setLoading(true);
      setError("");
      const res = await login({
        email,
        password,
      });
      toast.success(res.data.message || "Login successfull");
      if (res.data.success) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Login Error", err);
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.message || "An error occurred during login."
        );
        toast.error(
          err.response?.data.message || "An error occured during login."
        );
      } else {
        setError("An error occurred during login.");
        toast.error("An error occured during login.");
      }
    } finally {
      setLoading(false);
    }
  };
  console.log(email, password);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full mt-10 max-w-[420px]"
    >
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
          <a
            href="#"
            className="font-medium text-primary hover:text-primary-hover transition-colors"
          >
            Forgot Password?
          </a>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}
      <Button fullWidth disabled={loading} size="lg" variant="primary">
        Login
      </Button>
    </form>
  );
}
