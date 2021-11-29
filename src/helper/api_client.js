import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:5005",
  timeout: 25000,
});

// Add a request interceptor
request.interceptors.request.use(
  async (config) => {
    // console.log("request interceptor ==== ", config);
    const access_token = await localStorage.getItem("tokenLogin");
    if (access_token)
      config.headers["Authorization"] = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const apiClient = {
  get: (url, data = {}) => {
    // console.log('url get: ', url, data);
    return request({
      method: "get",
      url,
      params: data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  },
  post: (url, data) => {
    // console.log('post ', { url }, { data });
    return request({
      method: "post",
      url,
      data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  },
  delete: (url, data, headers = {}) =>
    request({
      method: "delete",
      url,
      data,
      headers,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      }),
  put: (url, data) =>
    request({
      method: "put",
      url,
      data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      }),
  patch: (url, data) =>
    request({
      method: "patch",
      url,
      data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      }),
};

export { apiClient };
