import {
    VoiceInfo,
    AudioConfig,
    CancellationErrorCode,
    SpeakerAudioDestination,
    SpeechConfig,
    SpeechRecognizer,
    SpeechSynthesizer,
} from 'microsoft-cognitiveservices-speech-sdk'


// 语音识别默认配置参数
const defaultAzureRegion = import.meta.env.VITE_REGION
const defaultAzureKey = import.meta.env.VITE_SCRIPTION_KEY
const defaultAccessPassword = import.meta.env.VITE_TTS_ACCESS_PASSWORD


type Langs = readonly ['fr-FR', 'ja-JP', 'en-US', 'zh-CN', 'zh-HK', 'ko-KR', 'de-DE'];

interface Config {
    langs?: Langs,
    isFetchAllVoice?: boolean
}

const DEFAULT_LANGS: Langs = ['fr-FR', 'ja-JP', 'en-US', 'zh-CN', 'zh-HK', 'ko-KR', 'de-DE'];
const DEFAULT_IS_FETCH_ALL_VOICE = true;

export const useSpeechService = ({ langs = DEFAULT_LANGS, isFetchAllVoice = DEFAULT_IS_FETCH_ALL_VOICE }: Config = {}) => {
    // 初始化参数
    const languages = ref(langs);
    const language = ref(languages.value[0]);
    const voiceName = ref('en-US-JennyMultilingualNeural')
    // 通过传递Key和Region返回的SpeechConfig静态实例
    const speechConfig = ref(SpeechConfig.fromSubscription(defaultAzureKey, defaultAzureRegion))
    const isRecognizing = ref(false) // 语音识别中
    const isSynthesizing = ref(false) // 语音合成中
    const isSynthesError = ref(false) // 语音失败
    const isRecognizReadying = ref(false) // 语音合成准备中
    const isPlaying = ref(false) // 语音播放中
    const isPlayend = ref(false) // 语音播放结束

    const rate = ref(1) // 语速 (0,2]
    const style = ref('Neural') // 情感

    let mediaRecorder: MediaRecorder | null
    const chunks: Blob[] = []
    const audioBlob = ref<Blob>(new Blob())

    const allVoices = ref<VoiceInfo[]>([])

    const recognizer = ref<SpeechRecognizer>(new SpeechRecognizer(speechConfig.value))
    const synthesizer = ref<SpeechSynthesizer>(new SpeechSynthesizer(speechConfig.value))

}
