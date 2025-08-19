import axios from "axios";

const https = axios.create({
  baseURL: "https://api.zrema.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // "X-Custom-Header": "foobar",
  },
});

https.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // For example, add auth token
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes outside the range of 2xx cause this function to trigger
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Handle unauthorized access
        // e.g. redirect to login page or refresh token
        console.log("Unauthorized access - redirecting to login");
      }
      if (error.response.status === 403) {
        // Handle forbidden
        console.log("Forbidden access");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error in request setup:", error.message);
    }
    return Promise.reject(error);
  }
);

export const get = async (url, params = {}, config = {}) => {
  try {
    const response = await https.get(url);

    return response.data;
  } catch (error) {
    console.log("gettlfdjkldsfkjl", error);
    throw error;
  }
};

/**
 * Make a POST request
 * @param {string} url - The URL endpoint
 * @param {Object} data - The data to send
 * @param {Object} config - Additional config
 * @returns {Promise} - The response promise
 */
export const post = async (url, data = {}, config = {}) => {
  try {
    const response = await https.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
