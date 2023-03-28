const gptInstance = axios.create({
  baseURL: "https://api.openai.com",
  timeout: 100000,
  withCredentials: true,
});

gptInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("请求异常：" + JSON.stringify(error));
    return Promise.reject(error);
  }
);

export const getModelsApi = (token: string) => {
  return gptInstance.get("/v1/models", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export {};
