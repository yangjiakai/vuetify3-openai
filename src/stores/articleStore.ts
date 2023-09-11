import { defineStore } from 'pinia'
import { Gender } from "~/src/enums";
export const useArticleStore = defineStore({
    id: 'article',
    state: () => ({
        voiceConfig: {
            voiceStyle: "",
            voiceRate: 1.0,
            gender: Gender.Woman,
            language: "en-US",
            voiceName: "en-US-AmberNeural",
            localName: "Amber",
        },
        showConfigDialog: false,
        sourceArticle: `
        UI stands for user interface. It is the point of contact between humans and computers. Any technology you interact with as a user is part of the user interface. For example, screens, sounds, overall style, and responsiveness are all elements of UI. A user interface involves the following four components:
        
        Navigational elements. Navigational elements help users navigate an interface. Examples of navigational elements in UI include slide bars, search fields, and back arrows. 
        
        Input controls. On-page elements that enable users to input information are input controls. Buttons, checkboxes, and text fields are all examples of input controls. 
        
        Informational components. Informational components are used to communicate information to the user. A progress bar beneath a video or tutorial is an example of an informational component. 
        
        Containers. Containers organize content into easily digestible sections. Rather than listing every subheading underneath a tab, a container element like an accordion menu may be used to hide or show content. 
        `,
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["voiceConfig"] }],
    },

    actions: {

    },
})