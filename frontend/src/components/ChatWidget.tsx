import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useChatbot } from "../hooks/useChatbot";
import { AdCampaign } from "./publicite/AdCampaign";
import { type ActiveAds, adApi } from "../api/ad.api";

type Props = {
    tenantId: string;
    title?: string;
    description?: string;
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
    variant = "platform",
}: Props) => {
    const [, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
    const [ads, setAds] = useState<ActiveAds>({});

    const {
        messages,
        sendMessage,
        loading,
    } = useChatbot(tenantId);

    const bottomRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    /*
     * Scroll automatique vers le dernier message
     */
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages, loading]);

    /*
     * Chargement des publicités
     */
    useEffect(() => {
        const loadAds = async () => {
            try {
                const dt = await adApi.getActiveAds();
                setAds(dt);
            } catch (error) {
                console.error(
                    "Erreur chargement publicités",
                    error
                );
            }
        };

        loadAds();
    }, []);

    console.log(ads)
    /*
     * Envoi du message
     */
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        setMobilePanelOpen(false);

        sendMessage(input);
        setInput("");
    };

    return (
        <div
            className={
                mode === "fullscreen"
                    ? "fixed inset-0 w-full h-[100dvh] bg-gray-100 overflow-hidden"
                    : "fixed bottom-5 right-5 z-50"
            }
        >
            {/* =========================================================
                CONTENEUR PRINCIPAL
            ========================================================= */}
            <div className="grid grid-cols-12 w-full h-full min-h-0">

                {/* =====================================================
                    SIDEBAR GAUCHE - DESKTOP UNIQUEMENT
                ===================================================== */}
                {variant === "platform" && (
                    <aside
                        className="
                            hidden
                            md:flex
                            md:col-span-2
                            h-full
                            min-h-0
                            bg-white
                            border
                            rounded-l-2xl
                            flex-col
                            p-4
                            overflow-y-auto
                        "
                    >
                        <h3 className="font-bold text-lg mb-4">
                            Menu
                        </h3>

                        <button
                            type="button"
                            className="
                                text-left
                                px-3
                                py-2
                                rounded-lg
                                hover:bg-gray-100
                                transition
                            "
                        >
                            Produits
                        </button>

                        <button
                            type="button"
                            className="
                                text-left
                                px-3
                                py-2
                                rounded-lg
                                hover:bg-gray-100
                                transition
                            "
                        >
                            Services
                        </button>
                    </aside>
                )}

                {/* =====================================================
                    CHAT PRINCIPAL
                ===================================================== */}
                <div
                    className={`
                        col-span-12
                        ${variant === "platform" ? "md:col-span-7" : "md:col-span-10"}
                        w-full
                        h-full
                        min-h-0
                        bg-white
                        md:border
                        md:rounded
                        flex
                        flex-col
                        overflow-hidden
                    `}
                >

                    {/* =================================================
                        HEADER
                    ================================================= */}
                    <header
                        className={`
                            flex
                            items-center
                            justify-center
                            flex-shrink-0
                            min-h-[64px]
                            px-3
                            py-2
                            ${primaryColor}
                            text-white
                            relative
                        `}
                    >
                        <div className="text-center min-w-0 max-w-[85%]">

                            <p className="font-bold text-base sm:text-lg truncate">
                                {title}
                            </p>

                            {description && (
                                <p className="text-xs sm:text-sm opacity-90 truncate">
                                    {description}
                                </p>
                            )}

                        </div>

                        {mode !== "fullscreen" && (
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="
                                    absolute
                                    right-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-xl
                                    w-8
                                    h-8
                                    flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    hover:bg-white/20
                                "
                                aria-label="Fermer"
                            >
                                ×
                            </button>
                        )}
                    </header>

                    {/* =================================================
                        PUBLICITÉ TOP
                    ================================================= */}
                    {variant === "platform" && (
                        <div
                            className="
                                flex-shrink-0
                                w-full
                                overflow-hidden
                                bg-gray-700
                                text-white
                            "
                        >
                            {ads.top_banner?.[0] && (
                                <AdCampaign
                                    id="ad-1"
                                    type="top-banner"
                                    description={  ads.top_banner[0].description  }
                                    linkUrl={ ads.top_banner[0].target_url  }
                                    title={ ads.top_banner[0].title  }
                                />
                            )}
                        </div>
                    )}

                    {/* =================================================
                        ZONE PRINCIPALE DES MESSAGES
                    ================================================= */}
                    <div
                        className="
                            relative
                            flex-1
                            min-h-0
                            overflow-hidden
                            bg-gray-50
                        "
                    >
                        <div
                            ref={messagesContainerRef}
                            className="
                                h-full
                                min-h-0
                                overflow-y-auto
                                overflow-x-hidden
                                p-3
                                sm:p-4
                                space-y-2
                                overscroll-contain
                            "
                        >

                            {/* MESSAGE VIDE */}
                            {messages.length === 0 && (
                                <div
                                    className="
                                        h-full
                                        flex
                                        items-center
                                        justify-center
                                        text-center
                                        text-gray-400
                                        px-6
                                    "
                                >
                                    <p className="text-sm">
                                        Comment puis-je vous aider ?
                                    </p>
                                </div>
                            )}

                            {/* =================================================
                                MESSAGES
                            ================================================= */}
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`
                                        flex
                                        w-full
                                        ${
                                            m.role === "user"
                                                ? "justify-end"
                                                : "justify-start"
                                        }
                                    `}
                                >
                                    <div
                                        className={`
                                            max-w-[88%]
                                            sm:max-w-[80%]
                                            px-3
                                            py-2
                                            rounded-2xl
                                            text-sm
                                            sm:text-base
                                            break-words
                                            ${
                                                m.role === "user"
                                                    ? `${primaryColor} text-white`
                                                    : "bg-gray-200 text-gray-900"
                                            }
                                        `}
                                        style={{
                                            overflowWrap: "anywhere",
                                        }}
                                    >

                                        {/* BOT */}
                                        {m.role === "bot" ? (
                                            <>
                                                {/* IMAGE */}
                                                {m.image && (
                                                    <div
                                                        className="
                                                            w-[320px]
                                                            max-w-full
                                                            aspect-[4/3]
                                                            overflow-hidden
                                                            rounded-xl
                                                            mb-2
                                                        "
                                                    >
                                                        <img
                                                            src={m.image}
                                                            alt="Image"
                                                            className="
                                                                w-full
                                                                h-full
                                                                object-cover
                                                                border-2
                                                                border-gray-300
                                                                rounded-xl
                                                            "
                                                        />
                                                    </div>
                                                )}

                                                {/* MARKDOWN */}
                                                <div
                                                    className="
                                                        prose
                                                        prose-sm
                                                        max-w-none
                                                        break-words
                                                        overflow-x-auto
                                                    "
                                                    style={{
                                                        overflowWrap:
                                                            "anywhere",
                                                    }}
                                                >
                                                    <ReactMarkdown
                                                        remarkPlugins={[
                                                            remarkGfm,
                                                        ]}
                                                    >
                                                        {m.text}
                                                    </ReactMarkdown>
                                                </div>
                                            </>
                                        ) : (
                                            /* USER */
                                            <div
                                                style={{
                                                    overflowWrap:
                                                        "anywhere",
                                                }}
                                            >
                                                {m.text}
                                            </div>
                                        )}

                                    </div>
                                </div>
                            ))}

                            {/* =================================================
                                INDICATEUR DE CHARGEMENT
                            ================================================= */}
                            {loading && (
                                <div className="flex justify-start">
                                    <div
                                        className="
                                            bg-gray-200
                                            text-gray-600
                                            px-3
                                            py-2
                                            rounded-2xl
                                            text-sm
                                        "
                                    >
                                        IA écrit...
                                    </div>
                                </div>
                            )}

                            <div
                                ref={bottomRef}
                                className="h-0"
                            />

                        </div>
                    </div>

                    {/* =================================================
                        ZONE MOBILE PUBLICITÉ / MENU
                    ================================================= */}
                    {variant === "platform" && (
                        <div className="relative flex-shrink-0">

                            {/* =========================================
                                PANNEAU MOBILE
                            ========================================= */}
                            <div
                                className={`
                                    absolute
                                    left-0
                                    right-0
                                    bottom-full
                                    z-30
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
                                <div className="p-3 sm:p-4">

                                {ads.sidebar && ads.sidebar.length > 0 && (
                                <>
                                <div className="mb-3">
                                    <span className="text-xs font-bold text-gray-400">
                                    SPONSORISÉ
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">

                                {ads.sidebar
                                .filter((ad) => ad && ad.title && ad.target_url)
                                .slice(0, 2)
                                .map((ad, index) => (
                                <div
                                key={ad.id ?? `sidebar-ad-${index}`}
                                className="min-w-0"
                                >
                                <AdCampaign
                                id={`ad-sidebar-${index}`}
                                type="sidebar-card"
                                description={ad.description}
                                linkUrl={ad.target_url}
                                imageUrl={
                                    `${import.meta.env.VITE_BACKEND_URL}/uploads/ads/${ad.image}`
                                }
                                title={ad.title}
                                />
                                </div>
                                ))}

                                </div>
                                </>
                                )}

                                </div>
                            </div>

                            {/* =========================================
                                BOUTON MENU MOBILE
                            ========================================= */}
                            <div
                                className="
                                    absolute
                                    -top-4
                                    left-0
                                    right-0
                                    z-40
                                    flex
                                    justify-center
                                    pointer-events-none
                                "
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setMobilePanelOpen(
                                            !mobilePanelOpen
                                        )
                                    }
                                    className="
                                        pointer-events-auto
                                        w-9
                                        h-9
                                        rounded-full
                                        border
                                        bg-white
                                        shadow-md
                                        flex
                                        items-center
                                        justify-center
                                        text-gray-700
                                    "
                                    aria-label={
                                        mobilePanelOpen
                                            ? "Fermer les publicités"
                                            : "Afficher les publicités"
                                    }
                                >
                                    {mobilePanelOpen ? "⌄" : "⌃"}
                                </button>
                            </div>

                            {/* =========================================
                                PUBLICITÉ BASSE
                            ========================================= */}
                            {ads.bottom_sheet?.[0] && (
                                <div
                                    className="
                                        relative
                                        z-20
                                        border-t
                                        bg-white
                                        max-h-[90px]
                                        sm:max-h-[110px]
                                        overflow-hidden
                                    "
                                >
                                    {ads.sidebar?.[0] && (
                                        <AdCampaign
                                            id="ad-4"
                                            type="chat-bottom-banner"
                                            title={
                                                ads.bottom_sheet[0].title
                                            }
                                            description={
                                                ads.bottom_sheet[0].description
                                            }
                                            imageUrl={`
                                                ${import.meta.env.VITE_BACKEND_URL}
                                                /uploads/ads/
                                                ${ads.bottom_sheet[0].image}
                                            `.replace(/\s+/g, "")}
                                            linkUrl={
                                                ads.sidebar[0].target_url
                                            }
                                        />
                                    )}
                                </div>
                            )}

                        </div>
                    )}

                    {/* =================================================
                        FORMULAIRE DE SAISIE
                    ================================================= */}
                    <div
                        className="
                            flex-shrink-0
                            z-40
                            bg-white
                        "
                    >
                        <form
                            onSubmit={onSubmit}
                            className="
                                p-2
                                sm:p-3
                                border-t
                                flex
                                gap-2
                                items-center
                                bg-white
                            "
                        >

                            <input
                                type="text"
                                value={input}
                                onChange={(e) =>
                                    setInput(e.target.value)
                                }
                                placeholder="Écrire un message..."
                                autoComplete="off"
                                className="
                                    flex-1
                                    min-w-0
                                    border
                                    border-gray-300
                                    rounded-full
                                    px-3
                                    py-2
                                    text-sm
                                    sm:text-base
                                    outline-none
                                    focus:border-blue-500
                                    focus:ring-1
                                    focus:ring-blue-500
                                "
                            />

                            <button
                                type="submit"
                                disabled={!input.trim() || loading}
                                className={`
                                    ${primaryColor}
                                    text-white
                                    px-3
                                    sm:px-4
                                    py-2
                                    rounded-full
                                    text-sm
                                    sm:text-base
                                    whitespace-nowrap
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    transition
                                `}
                            >
                                <span className="hidden sm:inline">
                                    Envoyer
                                </span>

                                <span className="sm:hidden">
                                    ➤
                                </span>
                            </button>

                        </form>
                    </div>

                </div>

                {/* =====================================================
                    SIDEBAR DROITE - DESKTOP UNIQUEMENT
                ===================================================== */}
                {variant === "platform" && (
                    <aside
                        className="
                            hidden
                            md:flex
                            md:col-span-3
                            h-full
                            min-h-0
                            bg-white
                            border
                            rounded-r-2xl
                            flex-col
                            overflow-hidden
                        "
                    >
                        <div
                            className="
                                w-full
                                h-full
                                p-3
                                bg-gray-50
                                flex
                                flex-col
                                gap-3
                                overflow-y-auto
                                border-l
                            "
                        >
                            <span className="text-xs font-bold text-gray-400">
                                SPONSORISÉ
                            </span>

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