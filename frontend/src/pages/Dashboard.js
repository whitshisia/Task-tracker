import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import ProductivityCard from "../components/dashboard/ProductivityCard";
import WeeklyStatsCard from "../components/dashboard/WeeklyStatsCard";
import InsightsCard from "../components/dashboard/InsightsCard";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://127.0.0.1:8000/ai-summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setSummary(data);
    };

    fetchSummary();
  }, []);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <DashboardHeader />

        {summary ? (
          <>
            <ProductivityCard summary={summary} />
            <WeeklyStatsCard summary={summary} />
            <InsightsCard insights={summary.insights} />
          </>
        ) : (
          <div className="text-center text-gray-500">Loading analytics...</div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
