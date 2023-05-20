import axios from "axios";

const api = {
  //get current status
  getCurrentStatus: async () => {
    const response = await axios.get("http://localhost:5000/status");
    return response.data;
  },

  //get history
  getStatusHistory: async () => {
    const response = await axios.get("http://localhost:5000/history");
    return response.data;
  },
};

export default api;
