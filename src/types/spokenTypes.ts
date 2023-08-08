
export interface Message {
    id: number;
    isReading: boolean;
    body: {
        content: string;
        role: "user" | "assistant" | "system";
    }
}
