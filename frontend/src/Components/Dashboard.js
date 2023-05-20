import React, { useState, useEffect } from "react";
import StatusTable from "./StatusTable";
import api from "../services/api";

const Dashboard = () => {
  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const currentStatus = await api.getCurrentStatus();
        setStatus(currentStatus);
      } catch (error) {
        console.error("Error fetching current status:", error);
      }
    };

    const fetchHistory = async () => {
      try {
        const statusHistory = await api.getStatusHistory();
        setHistory(statusHistory);
      } catch (error) {
        console.error("Error fetching status history:", error);
      }
    };

    fetchStatus();
    fetchHistory();

    // Fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchStatus();
      fetchHistory();
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {status && (
        <div>
          <h2>Current Status</h2>
          <StatusTable status={status} />
        </div>
      )}

      <div>
        <h2>Status History</h2>
        <StatusTable status={history} />
      </div>
    </div>
  );
};

export default Dashboard;
