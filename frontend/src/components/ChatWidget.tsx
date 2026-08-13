import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useChatbot } from "../hooks/useChatbot";
import { AdCampaign} from "./publicite/AdCampaign"

import {type ActiveAds, adApi} from "../api/ad.api"


//const API_URL = import.meta.env.VITE_API_URL;

type Props = {
    tenantId: string;
    title?: string;
    description?: string
    mode?: "floating" | "fullscreen";
    primaryColor?: string;
    variant?: "platform" | "webhook";
};


export const ChatWidget = ({
    tenantId,
    title = "Assistant",
    description = "",
    mode = "fullscreen",
    primaryColor = "bg-blue-600",
    variant = "platform"
}: Props) => {

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
    const [ads, setAds] = useState<ActiveAds>({});
   
   

    const {
        messages,
        sendMessage,
        loading
    } = useChatbot(tenantId);

  
    const bottomRef = useRef<HTMLDivElement>(null);

 


    const messagesContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages, loading]);


    useEffect(() => {
        const loadAds = async () => {
            try {
                const dt = await adApi.getActiveAds();
                setAds(dt);
            } catch(error) {
                console.error(
                    "Erreur chargement publicités",
                    error
                );
            }
        };
        loadAds();

    }, []);

    console.log(ads)

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

            <div className={ open 
                ? "grid grid-cols-12 w-screen h-screen"
                : "grid grid-cols-12 w-screen h-screen"}>

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
                            items-center
                            justify-center
                            p-3
                            ${primaryColor} text-white
                            relative
                        `}
                    >
                        <div className="text-center">
                            <p className="font-bold text-lg">
                                {title}
                            </p>

                            <p className="text-xm opacity-90">
                                {description}
                            </p>
                        </div>
                        
                        {mode !== "fullscreen" && (
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute right-3 text-xl"
                            >
                                X
                            </button>
                        )}
                    
                    </div>


                    {/* PUBLICITE TOP */}
                    {variant === "platform" && (

                        <div className=" overflow-hidden  bg-gray-700 text-white "  >
                            {ads.top_banner?.[0]  && (
                           
                            <AdCampaign 
                                id="ad-1"
                                type="top-banner"
                                description={ads.top_banner[0].description}
                                linkUrl={ads.top_banner[0].target_url}
                                title={ads.top_banner[0].title}
                            />
                           
                            )}
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

                        {/* MESSAGES */}
                        <div
                              ref={messagesContainerRef}
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
                                            

                                            <>
                                                {m.image && (
                                                    <div className="w-[320px] max-w-full aspect-[4/3] overflow-hidden rounded-xl">
                                                        <img
                                                            src={m.image}
                                                            alt="Image"
                                                            className="w-full h-full object-cover border-2 border-gray-300 rounded-xl"
                                                        />
                                                    </div>
                                                )}

                                                <div>
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                    >
                                                        {m.text}
                                                    </ReactMarkdown>
                                                </div>
                                            </>

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
                           <div ref={bottomRef} className="h-0" />
                        </div>
                    </div>


                    <div className = "relative">
                        {/* MENU MOBILE */}
                        {variant === "platform" && (
                        
                            <div>
                                {/* Panneau menu derrière la pub */}
                                <div
                                    className={`
                                        absolute
                                        left-0
                                        right-0
                                        bottom-full
                                        z-10
                                        bg-white
                                        border
                                        rounded-t-xl
                                        shadow-lg
                                        transition-all
                                        duration-300
                                        overflow-hidden
                                        ${
                                            mobilePanelOpen
                                                ? "translate-y-0 opacity-100 pointer-events-auto"
                                                : "translate-y-full opacity-0 pointer-events-none"
                                        }
                                    `}
                                >
                                    <div className="p-4 pb-5">

                                       <div className="grid grid-cols-12 gap-4">
                                            <div className = "col-span-12 md:col-span-12 p-0">
                                                <span className="text-xs font-bold text-gray-400">SPONSORISÉ</span>
                                            </div>
                                            {/* 2. Sidebar Cards */}
                                            <div className = "col-span-6 md:col-span-4">
                                                <AdCampaign 
                                                id="ad-2a"
                                                type="sidebar-card"
                                                title="Cloud Storage Services"
                                                imageUrl="https://via.placeholder.com/150"
                                                linkUrl="https://example.com"
                                                />
                                            </div>

                                            <div className = "col-span-6 md:col-span-4">

                                            <AdCampaign 
                                                id="ad-2b"
                                                type="sidebar-card"
                                                title="AI Writing Tools"
                                                imageUrl="https://via.placeholder.com/150"
                                                linkUrl="https://example.com"
                                                />
                                            </div>
                                        </div>

                 

                                    </div>
                                </div>


                                {/* Poignée qui dépasse */}
                                <div
                                    className="
                                        absolute
                                        -top-5
                                        left-0
                                        right-0
                                        z-30
                                        flex
                                        justify-center
                                    "
                                >

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

                        {/* Zone Publicité - au-dessus */}
                        <div className="border-t relative z-20 bg-white">

                            {ads.sidebar?.[0]  && (
                            <AdCampaign 
                                id="ad-4"
                                type="chat-bottom-banner"
                                title={ads.sidebar[0].title}
                                description={ads.sidebar[0].description}
                                imageUrl={`${import.meta.env.VITE_BACKEND_URL}/uploads/ads/${ads.sidebar[0].image}`}
                                linkUrl={ads.sidebar[0].target_url}
                            />
                            )}

                        </div>
                    </div>
                    
                    {/* INPUT */}
                    <div className="z-20  bg-white">
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