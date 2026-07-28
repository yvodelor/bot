import { useEffect, useRef, useState, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useChatbot } from "../hooks/useChatbot";
import { AdCampaign} from "./publicite/AdCampaign"

const API_URL = import.meta.env.VITE_API_URL;

type Props = {
    tenantId: string;
    title?: string;
    mode?: "floating" | "fullscreen";
    primaryColor?: string;
    variant?: "platform" | "webhook";
};


export const ChatWidget = ({
    tenantId,
    title = "Assistant",
    mode = "fullscreen",
    primaryColor = "bg-blue-600",
    variant = "platform"
}: Props) => {

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

    const {
        messages,
        sendMessage,
        loading
    } = useChatbot(tenantId);


    const bottomRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);


    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;
        setMobilePanelOpen(false);

        sendMessage(input);
        setInput("");
    };

    /*   
    <div className="grid grid-cols-12 gap-4">

                <div className="col-span-12 md:col-span-4">
    */

    return (
        <div
            className={
                mode === "fullscreen"
                ? "fixed inset-0 flex w-screen h-screen bg-gray-100"
                : "fixed bottom-5 right-5"
            }
        >

            <div className="grid grid-cols-12 w-screen h-screen">

                {/* SIDEBAR DESKTOP Left */}
                {variant === "platform" && (
                    <aside  className=" col-span-12 md:col-span-2  hidden md:flex  bg-white border rounded-l-2xl flex-col p-4 " >

                        <h3 className="font-bold">
                            Menu
                        </h3>


                        <button>
                            Produits
                        </button>

                        <button>
                            Services
                        </button>

                    </aside>
                )}

                {/* CHAT */}
                <div
                    className=" col-span-12 md:col-span-7
                        h-[100vh]
                        bg-white
                        
                        rounded    
                        border
                        flex
                        flex-col
                        overflow-hidden
                    "
                >


                    {/* HEADER */}
                    <div
                        className={`
                            flex
                            justify-between items-center  p-3
                            ${primaryColor} text-white  
                        `}
                    >

                        <p className="font-bold text-center">
                            {title}
                        </p>


                        {mode !== "fullscreen" && (
                            <button
                                onClick={() => setOpen(false)}
                            >
                                X
                            </button>
                        )}

                    </div>




                    {/* PUBLICITE TOP */}
                    {variant === "platform" && (
                        <div
                            className="
                                overflow-hidden
                                bg-gray-700
                                text-white
                            "
                        >
                            <AdCampaign 
                                id="ad-1"
                                type="top-banner"
                                description="PROMOTION - 20% off New Laptops."
                                linkUrl="https://example.com"
                                title="Click here."
                            />
                        </div>
                    )}






                    {/* ZONE MESSAGE */}
                    <div
                        className="
                            relative
                            flex-1
                            overflow-hidden
                            bg-gray-50
                        "
                    >



                        {/* PANNEAU MOBILE */}
                       




                        {/* MESSAGES */}
                        <div
                            className="
                                h-full
                                overflow-y-auto
                                p-3
                                space-y-2
                            "
                        >


                            {messages.map(m => (

                                <div
                                    key={m.id}
                                    className={`
                                        flex
                                        ${
                                            m.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                        }
                                    `}
                                >


                                    <div
                                        className={`
                                            max-w-[80%]
                                            px-3
                                            py-2
                                            rounded-2xl

                                            ${
                                                m.role === "user"
                                                ? `${primaryColor} text-white`
                                                : "bg-gray-200"
                                            }
                                        `}
                                    >


                                        {m.role === "bot" ? (

                                            <ReactMarkdown
                                                remarkPlugins={[
                                                    remarkGfm
                                                ]}
                                            >
                                                {m.text}
                                            </ReactMarkdown>

                                        ) : (

                                            <div>
                                                {m.text}
                                            </div>

                                        )}
                                    </div>
                                </div>

                            ))}

                            {loading && (
                                <div>
                                    IA écrit...
                                </div>
                            )}
                            <div ref={bottomRef}/>
                        </div>
                    </div>



                    {/* MENU MOBILE */}
                    {variant === "platform" && (
                        <div className="md:hidden">

                            {/* Panneau coulissant */}
                            <div
                                className={`
                                    overflow-hidden
                                    bg-white
                                    border-t
                                    transition-all
                                    duration-300
                                    ${
                                        mobilePanelOpen
                                            ? "max-h-64"
                                            : "max-h-0"
                                    }
                                `}
                            >
                                <div className="p-4">

                                    <h3 className="font-bold mb-3">
                                        Menu
                                    </h3>

                                    <div className="space-y-2">

                                        <button
                                            type="button"
                                            className="block w-full text-left p-2 rounded hover:bg-gray-100"
                                        >
                                            Produits
                                        </button>

                                        <button
                                            type="button"
                                            className="block w-full text-left p-2 rounded hover:bg-gray-100"
                                        >
                                            Services
                                        </button>

                                        <button
                                            type="button"
                                            className="block w-full text-left p-2 rounded hover:bg-gray-100"
                                        >
                                            Promotions
                                        </button>

                                    </div>

                                </div>
                            </div>

                            {/* Poignée centrée */}
                            <div className="bg-white border-t flex justify-center py-1">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setMobilePanelOpen(!mobilePanelOpen)
                                    }
                                    className="
                                        w-10
                                        h-10
                                        rounded-full
                                        border
                                        bg-white
                                        shadow-md
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    {mobilePanelOpen ? "⌄" : "⌃"}
                                </button>

                            </div>

                        </div>
                    )}


                    {/* Zone de Saisie */}
                    <div className="border-t">
                    {/* 4. Bottom Chat Banner */}
                    <AdCampaign 
                        id="ad-4"
                        type="chat-bottom-banner"
                        title="Online Courses"
                        description="Learn tour courses, learnings to your linead on online shop."
                        imageUrl="https://via.placeholder.com/50"
                        linkUrl="https://example.com"
                    />
                
                    </div>

                    {/* INPUT */}
                    <form
                        onSubmit={onSubmit}
                        className=" p-2 border-t flex gap-2 "
                    >
                        <input
                            value={input}
                            onChange={
                                e => setInput(e.target.value)
                            }
                            className="
                                flex-1
                                border
                                rounded-full
                                px-3
                            "
                        />


                        <button
                            className={` ${primaryColor}  text-white px-4 rounded-full
                            `}
                        >
                            Envoyer
                        </button>
                    </form>

                </div>

                {/* SIDEBAR DESKTOP Right */}
                {variant === "platform" && (
                    <aside className=" hidden md:flex  col-span-12 md:col-span-3 
                    bg-white border rounded-r-2xl   flex-col p-4 "
                    >

                        {/* Colonne de droite (Sidebar Ads) */}
                    <div className="w-full p-3 bg-gray-50 flex flex-col gap-3 border-l">
                        <span className="text-xs font-bold text-gray-400">SPONSORISÉ</span>
                        
                        {/* 2. Sidebar Cards */}
                        <AdCampaign 
                        id="ad-2a"
                        type="sidebar-card"
                        title="Cloud Storage Services"
                        imageUrl="https://via.placeholder.com/150"
                        linkUrl="https://example.com"
                        />
                        <AdCampaign 
                        id="ad-2b"
                        type="sidebar-card"
                        title="AI Writing Tools"
                        imageUrl="https://via.placeholder.com/150"
                        linkUrl="https://example.com"
                        />
                    </div>

                    </aside>
                )}

            </div>


        </div>
    );
};