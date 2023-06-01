import axios from "axios";

const api = {
  //get current status
  getCurrentStatus: async () => {
    const response = await axios.get("https://us-central1-iot-dashboard-mern.cloudfunctions.net/getStatus");
    return response.data;
  },

  //get history
  getStatusHistory: async () => {
    const response = await axios.get("https://us-central1-iot-dashboard-mern.cloudfunctions.net/getHistory");
    return response.data;
  },
};

export default api;
