import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  Clock,
  ShieldCheck,
  BarChart3,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              H
            </div>
            <span className="text-xl font-bold tracking-tight text-black">HRMS</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
            <Link href="#solutions" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Solutions</Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
              Log in
            </Link>
            <Link href="/register">
              <Button className="rounded-full shadow-sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>

          {/* Decorative blur blobs */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] -translate-y-[20%] translate-x-[30%] rounded-full bg-blue-100/50 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] translate-y-[20%] -translate-x-[20%] rounded-full bg-indigo-100/50 blur-[100px]"></div>

          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-600 mb-4 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                Announcing HRMS 2.0
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                Modern HR for <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Modern Teams</span>
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
                Streamline your workforce management with an intelligent platform that puts people first. Onboard, manage, and scale your team effortlessly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/register">
                  <Button size="lg" className="rounded-full h-12 px-8 shadow-lg shadow-blue-600/20 w-full sm:w-auto text-base">
                    Start for free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button variant="outline" size="lg" className="rounded-full h-12 px-8 w-full sm:w-auto text-base border-gray-200">
                    Book a demo
                  </Button>
                </Link>
              </div>

              <div className="pt-8 flex items-center justify-center gap-8 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> No credit card required</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> 14-day free trial</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-32 bg-gray-50/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to manage your team
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Powerful tools that automate the busywork so you can focus on building a great company culture.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Employee Directory</h3>
                <p className="text-gray-600">
                  A centralized hub for all employee information, documents, and organizational charts.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Time & Attendance</h3>
                <p className="text-gray-600">
                  Effortless time tracking, leave requests, and automated scheduling for your entire workforce.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Reviews</h3>
                <p className="text-gray-600">
                  Set goals, track progress, and conduct continuous performance evaluations with ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[25%] -right-[10%] w-[50%] h-[150%] rounded-full border border-white/10"></div>
            <div className="absolute top-[20%] -left-[10%] w-[40%] h-[120%] rounded-full border border-white/10"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              Ready to transform your HR?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of companies that use our HRMS to build better workplaces and empower their employees.
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="rounded-full h-14 px-10 text-lg text-blue-600 font-semibold shadow-xl hover:scale-105 transition-transform">
                Get started for free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center border-[0px]">
          <div className="mb-8 flex items-center gap-2 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              H
            </div>
            <span className="text-xl font-bold tracking-tight">HRMS</span>
          </div>
          <div className="flex gap-6 mb-8 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Product</Link>
            <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-white transition-colors">About</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} HRMS Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
