import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="px-6 py-20 md:py-28 text-center max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
        Stay Productive Anywhere,
        <span className="text-skyAccent"> Even Offline.</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
        A smart task manager powered by AI insights. Works offline. Syncs when online.
        Designed for speed, focus, and productivity.
      </p>

      <Link
        to="/app"
        className="inline-flex items-center gap-2 bg-skyAccent text-white px-6 py-3 rounded-xl
                   text-lg font-semibold shadow-md hover:scale-105 transition-transform">
        Get Started
        <ArrowRight className="w-5 h-5" />
      </Link>

      <div className="mt-14">
        <div className="bg-lightCard dark:bg-darkCard p-4 rounded-2xl shadow-xl mx-auto w-full max-w-3xl">
          <img
            src="/mock-dashboard.png"
            alt="app preview"
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
