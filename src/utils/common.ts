// Debounce
export const debounce = (func: Function, wait: number): Function => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Throttle
export const throttle = (func: Function, wait: number): Function => {
  let timeout;
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, args);
      }, wait);
    }
  };
};

// Format file size
export const formatFileSize = (size: number): string => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

// 判断当前设备是否为移动端
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
};

// scroll to top
interface ScrollOptions {
  behavior?: "auto" | "smooth";
  block?: "start" | "center" | "end" | "nearest";
  inline?: "start" | "center" | "end" | "nearest";
  top?: number;
}

export const scrollToTop = (
  element: HTMLElement | null,
  options: ScrollOptions = { top: 0, behavior: "auto" }
): void => {
  if (!element) {
    console.error("Element not found");
    return;
  }
  element.scrollTo({
    ...options,
  });
};

// scroll to bottom with smooth animation
export const scrollToBottom = (
  element: HTMLElement | null,
  options: ScrollOptions = { behavior: "smooth" },
  duration: number = 300
): void => {
  if (!element) return;

  const start = element.scrollTop;
  const end = element.scrollHeight;
  const change = end - start;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    element.scrollTop = start + change * ease;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

// 输入语言表示，输出语言中文
// Chinese = "zh-CN",  中文
// English = "en-US",  英语(美)
// Japanese = "ja-JP", 日语
// Korean = "ko-KR",  韩语
export const getLanguageName = (language: string): string => {
  switch (language) {
    case "zh-CN":
      return "中文";
    case "en-US":
      return "英语";
    case "ja-JP":
      return "日语";
    case "ko-KR":
      return "韩语";
    default:
      return "未选定";
  }
};

// 输入语言表示，输出语言英文
export const getLanguageNameEn = (language: string): string => {
  switch (language) {
    case "zh-CN":
      return "Chinese";
    case "en-US":
      return "English";
    case "ja-JP":
      return "Japanese";
    case "ko-KR":
      return "Korean";
    default:
      return "Not selected";
  }
};

const MAX_SENTENCE_LENGTH = 30; // 每个小段文本的最大长度
export const splitText = (text: string): string[] => {
  const sentences = text.split(/(?<=[.?!])\s/g); // 将文本按照句子进行分割
  const result: string[] = [];
  let currentSentence = "";
  for (const sentence of sentences) {
    if (currentSentence.length + sentence.length <= MAX_SENTENCE_LENGTH) {
      currentSentence += sentence;
    } else {
      result.push(currentSentence);
      currentSentence = sentence;
    }
  }
  if (currentSentence.length > 0) {
    result.push(currentSentence);
  }
  return result;
};
