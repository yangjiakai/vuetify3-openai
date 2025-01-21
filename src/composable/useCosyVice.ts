import { ref, reactive } from "vue";

interface CosyVoiceOptions {
  sampleRate?: number;
}

interface GenerationParams {
  mode: "sft" | "zero_shot";
  text: string;
  speaker?: string;
  promptText?: string;
  audioFile?: File;
}

export function useCosyVice(options: CosyVoiceOptions = {}) {
  const { sampleRate = 22050 } = options;

  // 响应式状态
  const audioContext = ref<AudioContext | null>(null);
  const currentSource = ref<AudioBufferSourceNode | null>(null);
  const statusMessage = ref("");
  const isLoading = ref(false);
  const isPlaying = ref(false);
  const error = ref<Error | null>(null);

  // 初始化音频上下文
  const initAudioContext = async () => {
    if (!audioContext.value) {
      audioContext.value = new (window.AudioContext ||
        window.webkitAudioContext)({
        sampleRate,
      });
    }
  };

  // 播放音频片段
  const playAudioChunk = async (arrayBuffer: ArrayBuffer) => {
    try {
      if (!audioContext.value) {
        await initAudioContext();
      }

      // 停止当前播放
      if (currentSource.value) {
        currentSource.value.stop();
        isPlaying.value = false;
      }

      // 转换音频数据
      const audioData = new Int16Array(arrayBuffer);
      const floatData = new Float32Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) {
        floatData[i] = audioData[i] / 32768.0;
      }

      // 创建音频缓冲区
      const buffer = audioContext.value.createBuffer(
        1,
        floatData.length,
        sampleRate
      );
      buffer.getChannelData(0).set(floatData);

      // 创建并播放音频源
      currentSource.value = audioContext.value.createBufferSource();
      currentSource.value.buffer = buffer;
      currentSource.value.connect(audioContext.value.destination);
      currentSource.value.start(0);
      isPlaying.value = true;

      return new Promise<void>((resolve, reject) => {
        if (!currentSource.value) return;

        currentSource.value.onended = () => {
          isPlaying.value = false;
          resolve();
        };
        currentSource.value.onerror = reject;
      });
    } catch (err) {
      isPlaying.value = false;
      error.value = err instanceof Error ? err : new Error(String(err));
      throw error.value;
    }
  };

  // 生成音频
  const generateAudio = async (params: GenerationParams) => {
    try {
      isLoading.value = true;
      statusMessage.value = "正在生成音频...";
      error.value = null;

      await initAudioContext();

      const formData = new FormData();
      let endpoint = "http://36.213.4.210:18200/inference_sft";

      if (params.mode === "sft") {
        formData.append("tts_text", params.text);
        formData.append("spk_id", params.speaker || "0");
      } else {
        if (!params.audioFile) {
          throw new Error("请上传参考音频文件");
        }
        formData.append("tts_text", params.text);
        formData.append("prompt_text", params.promptText || "");
        formData.append("prompt_wav", params.audioFile);
        endpoint = "http://36.213.4.210:18200/inference_zero_shot";
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("生成音频失败");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("无法读取响应流");
      }

      let accumulatedData = new Uint8Array();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          statusMessage.value = "播放完成";
          break;
        }

        // 累积数据
        const newData = new Uint8Array(
          accumulatedData.length + (value?.length || 0)
        );
        newData.set(accumulatedData);
        if (value) newData.set(value, accumulatedData.length);
        accumulatedData = newData;

        try {
          await playAudioChunk(accumulatedData.buffer);
          accumulatedData = new Uint8Array();
        } catch (err) {
          console.log("等待更多数据...");
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      statusMessage.value = `错误: ${error.value.message}`;
    } finally {
      isLoading.value = false;
    }
  };

  // 停止播放
  const stopPlayback = () => {
    if (currentSource.value) {
      currentSource.value.stop();
      currentSource.value = null;
      isPlaying.value = false;
    }
  };

  return {
    audioContext,
    currentSource,
    statusMessage,
    isLoading,
    isPlaying,
    error,
    initAudioContext,
    generateAudio,
    playAudioChunk,
    stopPlayback,
  };
}
