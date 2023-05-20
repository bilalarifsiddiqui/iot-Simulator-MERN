import React from "react";
import "./StatusTable.css";

const StatusTable = ({ status }) => {
  const isSingleStatus = status.length === 1;

  return (
    <div className="status-table-container">
      <table className="status-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Humidity</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {status.map((item, index) => (
            <tr key={item.timestamp}>
              <td className={isSingleStatus ? "pulse-green" : ""}>
                {item.timestamp}
              </td>
              <td className={isSingleStatus ? "pulse-green" : ""}>
                {item.humidity}
              </td>
              <td className={isSingleStatus ? "pulse-green" : ""}>
                {item.temperature}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusTable;
