import { Configuration, OpenAIApi } from "openai";
import { useChatStore } from "@/stores/chatStore";

const chatStore = useChatStore();

// OpenAIApi 库动态地使用用户输入的 API 密钥
// 每次请求 API 时创建一个新的 OpenAIApi 实例。虽然这样会产生一些开销，但在大多数情况下，这种开销不会对性能产生显著影响。
const getOpenAI = () => {
  const configuration = new Configuration({
    apiKey: chatStore.apiKey,
  });
  return new OpenAIApi(configuration);
};

export const createCompletion: any = (keyword: string) => {
  const openai = getOpenAI();
  return openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: keyword }],
  });
};

export const translationApi: any = (content: string, prompt: string) => {
  const openai = getOpenAI();
  return openai.createChatCompletion({
    stream: true,
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: prompt },
      { role: "user", content: content },
    ],
  });
};

export const listModelsApi: any = () => {
  const openai = getOpenAI();
  return openai.listModels();
};

// openai.listModels
// https://platform.openai.com/docs/api-reference/models/list

// openai.retrieveModel
// GET https://api.openai-proxy.com/v1/models/{model}

function generatePrompt(animal: string) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.
  
  Animal: Cat
  Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
  Animal: Dog
  Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
  Animal: ${capitalizedAnimal}
  Names:`;
}
