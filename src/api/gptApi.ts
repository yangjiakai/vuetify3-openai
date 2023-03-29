import { useChatStore } from "@/stores/chatStore";
const chatStore = useChatStore();

const gptInstance = axios.create({
  baseURL: "https://api.openai.com",
  timeout: 100000,
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

export const getModelsApi = () => {
  return gptInstance.get("/v1/models", {
    headers: {
      Authorization: "Bearer " + chatStore.apiKey,
    },
  });
};

// Get account balance information.
export const getBalanceApi = () => {
  return gptInstance.get("/dashboard/billing/credit_grants", {
    headers: {
      Authorization: "Bearer " + chatStore.apiKey,
    },
  });
};

// speech-to-text
export const createTranscriptionApi = (formData: any) => {
  return gptInstance.post("/v1/audio/transcriptions", formData, {
    headers: {
      Authorization: "Bearer " + chatStore.apiKey,
    },
  });
};

export {};
