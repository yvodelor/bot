import { useState, useRef } from "react";
import { type ChatMessage, sendChatMessage } from "../api/chat.api";


export const useChatbot = (tenantId: string) => {

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const [sessionId, setSessionId] = useState<string | null>(
        () => localStorage.getItem(`chat_session_${tenantId}`)
    );

    const [loading, setLoading] = useState(false);

    const abortRef = useRef<AbortController | null>(null);


    const sendMessage = async (text: string) => {

        if (!text.trim() || loading) return;


        const userMsg: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            text,
            
            createdAt: new Date().toISOString()
        };


        setMessages(prev => [...prev, userMsg]);

        setLoading(true);

        abortRef.current = new AbortController();


        try {

            const data = await sendChatMessage(
                tenantId,
                {
                    message: text,
                    sessionId,
                    
                    channel: 'web'
                },
                abortRef.current.signal
            );


            console.log(data);


            if (data.sessionId !== sessionId) {

                setSessionId(data.sessionId);

                localStorage.setItem(
                    `chat_session_${tenantId}`,
                    data.sessionId
                );
            }


            const botMsg: ChatMessage = {
                id: crypto.randomUUID(),
                role: "bot",
                text: data.text,
                image: data.image,
                createdAt: new Date().toISOString()
            };

            console.log('messagebot', botMsg);

            setMessages(prev => [...prev, botMsg]);


        } catch (e: any) {

            if (e.name !== "CanceledError") {

                setMessages(prev => [
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        role: "bot",
                        text: "Désolé, erreur réseau. Réessaie.",
                        createdAt: new Date().toISOString()
                    }
                ]);
            }

        } finally {

            setLoading(false);

        }
    };


    const clearChat = () => {

        setMessages([]);

        setSessionId(null);

        localStorage.removeItem(
            `chat_session_${tenantId}`
        );
    };


    return {
        messages,
        sendMessage,
        loading,
        clearChat
    };
};