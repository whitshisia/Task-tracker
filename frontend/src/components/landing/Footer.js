export default function Footer() {
  return (
    <footer className="px-6 py-10 text-center text-gray-600 dark:text-gray-300">
      <p>&copy; {new Date().getFullYear()} Smart Task Tracker. All rights reserved.</p>
      <p className="mt-2">
        Built by Whitney 🧡 Powered by React + FastAPI
      </p>
    </footer>
  );
}
