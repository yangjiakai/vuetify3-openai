import { Ref } from "vue";
import { useSpokenStore } from "@/stores/spokenStore";


// Read the stream from the server
export const read = async (
  reader: any,
  target: Ref<string> | Ref<any[]>
): Promise<any> => {
  // TextDecoder is a built-in object that allows you to convert a stream of bytes into a string
  const decoder = new TextDecoder("utf-8");
  // Destructure the value returned by reader.read()
  const { done, value } = await reader.read();
  // If the stream is done reading, release the lock on the reader
  if (done) return reader.releaseLock();
  // Convert the stream of bytes into a string
  const chunk = decoder.decode(value, { stream: true });
  // Split the string into an array of strings
  const jsons = chunk
    .split("data:")
    .map((data) => {
      // Trim any whitespace
      const trimData = data.trim();
      // If the string is empty, return undefined
      if (trimData === "") return undefined;
      // If the string is [DONE], return undefined
      if (trimData === "[DONE]") return undefined;
      // Otherwise, parse the string as JSON
      return JSON.parse(data.trim());
    })
    // Filter out any undefined values
    .filter((data) => data);
  // Combine the data into a single string
  const streamMessage = jsons
    .map((jn) => jn.choices.map((choice: any) => choice.delta.content).join(""))
    .join("");
  // Update the ref to the target element with the new string
  const response = streamMessage;
  if (target.value instanceof Array) {
    target.value[target.value.length - 1].content += response;
  } else {
    target.value = target.value += response;
  }
  // Repeat the process
  return read(reader, target);
};


// util.ts
export const readStream = async (
  reader: any,
  callback: (message: string) => void
) => {
  const decoder = new TextDecoder("utf-8");
  const { done, value } = await reader.read();
  if (done) return reader.releaseLock();

  const chunk = decoder.decode(value, { stream: true });
  const jsons = chunk
    .split("data:")
    .map(data => {
      const trimData = data.trim();
      if (trimData === "" || trimData === "[DONE]") return undefined;
      return JSON.parse(trimData);
    })
    .filter(data => data);

  const streamMessage = jsons
    .map(jn => jn.choices.map(choice => choice.delta.content).join(""))
    .join("");
  callback(streamMessage);

  return readStream(reader, callback);  // Recursive call
};


// Count the number of code blocks and complete the last one if it is not completed
export const countAndCompleteCodeBlocks = (text: string) => {
  const codeBlocks = text.split("```").length - 1;
  if (codeBlocks && codeBlocks % 2 !== 0) {
    return text + "\n```\n";
  }
  return text;
};

export const formatForTTS = (text) => {
  // 去除换行符
  let formattedText = text.replace(/\r?\n|\r/g, " ");

  // 如果需要，你还可以去除其他特殊字符
  // formattedText = formattedText.replace(/[特定的特殊字符]/g, '替换字符或空字符串');

  return formattedText;
}