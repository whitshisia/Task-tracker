import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="px-6 py-20 text-center bg-skyAccent text-white">
      <h2 className="text-4xl font-bold mb-4">
        Ready to Take Control of Your Tasks?
      </h2>

      <p className="text-lg mb-8">
        Join thousands who use this app to stay focused, organized, and productive.
      </p>

      <Link
        to="/app"
        className="bg-white text-skyAccent font-semibold px-8 py-3 rounded-xl
                   shadow-md hover:scale-105 transition-transform text-lg"
      >
        Start Now — It's Free
      </Link>
    </section>
  );
}
