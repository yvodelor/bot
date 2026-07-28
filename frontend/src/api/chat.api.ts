import axiosClient from "./axiosClient";

   

export type ChatRole = 'user' | 'bot'


export interface ChatMessage{
    id: string;
    role: ChatRole;
    text:string;
    image_url?: string;
    createdAt: string;
}
export interface ChatResponse {
    text: string,
    image_url?: string;
    sessionId: string,
    
}

export type ChatRequest = {
    message: string;
    sessionId: string | null;
    channel: string;
};


export const sendChatMessage = async (
    tenantId: string,
    payload: ChatRequest,
    signal?: AbortSignal
): Promise<ChatResponse> => {

    const {data} = await axiosClient.post<ChatResponse>(
        `/chat/${tenantId}`,
        payload,
        {signal}
    );

    return data;
};