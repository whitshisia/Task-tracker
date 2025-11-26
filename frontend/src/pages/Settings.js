import React, { useContext } from "react";
import Layout from "../layout/Layout";
import { ThemeContext } from "../context/ThemeContext";

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-sky-600">Settings</h1>

        <div className="bg-white dark:bg-darkCard p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">Theme</h2>

          <div className="flex flex-col gap-3">
            {["light", "dark", "system"].map((mode) => (
              <label
                key={mode}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="theme"
                  value={mode}
                  checked={theme === mode}
                  onChange={() => setTheme(mode)}
                />
                <span className="capitalize">{mode} mode</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
