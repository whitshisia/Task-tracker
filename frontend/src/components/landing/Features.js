import { Shield, Cloud, LineChart, CheckCircle } from "lucide-react";

const FEATURES = [
  {
    title: "Offline First",
    desc: "Create, edit, and delete tasks even without internet.",
    icon: Cloud,
  },
  {
    title: "Smart Sync",
    desc: "Automatically sync tasks to the backend when online.",
    icon: CheckCircle,
  },
  {
    title: "Secure Login",
    desc: "Protected JWT authentication powered by FastAPI.",
    icon: Shield,
  },
  {
    title: "AI Insights",
    desc: "Weekly performance summaries powered by Python analytics.",
    icon: LineChart,
  },
];

export default function Features() {
  return (
    <section className="px-6 py-20 bg-white dark:bg-[#0f172a]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
        Powerful Features for Better Productivity
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {FEATURES.map((f, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-lightCard dark:bg-darkCard shadow hover:shadow-xl
                       transition-all duration-300"
          >
            <f.icon className="w-10 h-10 text-skyAccent mb-4" />
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
