import React, { useState } from 'react';

// 1. Types des emplacements et données d'une campagne
export type AdPlacementType = 
  | 'top-banner' 
  | 'sidebar-card' 
  | 'chat-overlay' 
  | 'chat-bottom-banner' 
  | 'inline-input-ad';

export interface AdCampaignProps {
  id: string;
  type: AdPlacementType;
  title?: string;
  description?: string;
  imageUrl?: string;
  linkUrl: string;
  badgeText?: string;
  action?: string;
  isDismissible?: boolean;
  onClose?: (id: string) => void;
}

// 2. Composant réutilisable
export const AdCampaign: React.FC<AdCampaignProps> = ({
  id,
  type,
  title,
  description,
  imageUrl,
  linkUrl,
  badgeText = 'SPONSORISÉ',
  action,
  isDismissible = true,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    if (onClose) onClose(id);
  };

  if (!isVisible) return null;

  // Render en fonction du type de campagne
  switch (type) {
    // ----------------------------------------------------
    // TYPE 1: Bandeau supérieur (Top Banner)
    // ----------------------------------------------------
    case 'top-banner':
      return (
        <div className="bg-gray-300 text-gray-800 py-1.5 px-4 text-xs font-semibold flex items-center justify-between border-b border-gray-400">
          <div className="flex-1 text-center">
            <span>{description} </span>
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-black">
              {title || action || 'Cliquez ici'}
            </a>
          </div>
          {isDismissible && (
            <button onClick={handleClose} className="text-gray-600 hover:text-black font-bold ml-2">
              ✕
            </button>
          )}
        </div>
      );

    // ----------------------------------------------------
    // TYPE 2: Cartes de la colonne latérale (Sidebar Card)
    // ----------------------------------------------------
    case 'sidebar-card':
      return (
        <a 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative block bg-white rounded-lg shadow border border-gray-200 overflow-hidden group transition hover:shadow-md"
        >
          {isDismissible && (
            <button 
              onClick={handleClose} 
              className="absolute top-2 right-2 bg-black/60 hover:bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center z-10"
            >
              ✕
            </button>
          )}
          {imageUrl && (
            <div className="h-28 bg-gray-100 overflow-hidden">
              <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition" />
            </div>
          )}
          <div className="p-3">
            <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
            {description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>}
          </div>
        </a>
      );

    // ----------------------------------------------------
    // TYPE 3: Pop-up overlay dans le chat (Chat Overlay)
    // ----------------------------------------------------
    case 'chat-overlay':
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg max-w-xs text-xs">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{badgeText}</span>
            {isDismissible && (
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            )}
          </div>
          <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="block text-gray-800 hover:underline">
            {title && <p className="font-bold text-sm text-gray-900 mb-0.5">{title}</p>}
            <p className="font-semibold">{description}</p>
            <span className="text-gray-400 text-[11px] block mt-1">{linkUrl}</span>
          </a>
        </div>
      );

    // ----------------------------------------------------
    // TYPE 4: Bandeau au-dessus du champ de texte
    // ----------------------------------------------------
    case 'chat-bottom-banner':
      return (
        <div className="bg-white/90 border-t border-gray-200 p-2 flex items-center gap-3">
          {imageUrl && (
            <img src={imageUrl} alt={title} className="w-12 h-12 object-cover rounded" />
          )}
          <div className="flex-1 min-w-0">
            <h5 className="font-bold text-xs text-gray-900 truncate">{title}</h5>
            <p className="text-xs text-gray-600 truncate">{description}</p>
          </div>
          <a 
            href={linkUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs font-semibold text-blue-600 hover:underline shrink-0"
          >
            {action || 'Découvrir' }
          </a>
        </div>
      );

    // ----------------------------------------------------
    // TYPE 5: Encart intégré dans la barre d'envoi
    // ----------------------------------------------------
    case 'inline-input-ad':
      return (
        <a 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-black max-w-xs truncate"
        >
          <span className="bg-gray-200 border border-gray-400 text-gray-600 text-[10px] font-bold px-1 rounded">
            AD
          </span>
          <span className="font-semibold truncate">{title}:</span>
          <span className="truncate">{description}</span>
        </a>
      );

    default:
      return null;
  }
};