import {
  AudioConfig,
  SpeakerAudioDestination,
  SpeechConfig,
  SpeechSynthesizer,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";

self.onmessage = async (event) => {
  const {
    subscriptionKey,
    region,
    text,
    voiceConfig,
    speechSynthesisLanguage,
    speechSynthesisVoiceName,
    voiceStyle,
    voiceRate,
  } = event.data;

  const speechConfig = SpeechConfig.fromSubscription(subscriptionKey, region);
  speechConfig.speechSynthesisLanguage = speechSynthesisLanguage;
  speechConfig.speechSynthesisVoiceName = speechSynthesisVoiceName;

  const player = new SpeakerAudioDestination();
  const audioConfig = AudioConfig.fromSpeakerOutput(player);
  const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

  const ssml = `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" 
           xmlns:mstts="https://www.w3.org/2001/mstts" 
           xml:lang="${speechSynthesisLanguage}">
      <voice name="${voiceConfig?.voiceName || speechSynthesisVoiceName}">
        <mstts:express-as type="${voiceConfig?.voiceStyle || voiceStyle}">
          <prosody rate="${voiceConfig?.voiceRate || voiceRate}">
            ${text}
          </prosody>
        </mstts:express-as>
      </voice>
    </speak>`;

  try {
    const result = await new Promise((resolve, reject) => {
      synthesizer.speakSsmlAsync(
        ssml,
        (speechResult) => {
          if (speechResult.reason === ResultReason.SynthesizingAudioCompleted) {
            resolve(speechResult);
          } else {
            reject(
              new Error(
                `Speech synthesis failed with reason: ${speechResult.reason}`
              )
            );
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
    self.postMessage({ type: "result", result });
  } catch (error) {
    self.postMessage({ type: "error", error });
  } finally {
    synthesizer.close();
  }
};
