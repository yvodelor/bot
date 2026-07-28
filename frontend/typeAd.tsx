import React from 'react';
import { AdCampaign } from './AdCampaign';

export const ChatPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Zone Principale du Chat */}
      <div className="flex-1 flex flex-col bg-white">
        
        {/* 1. Top Banner */}
        <AdCampaign 
          id="ad-1"
          type="top-banner"
          description="PROMOTION - 20% off New Laptops."
          linkUrl="https://example.com"
          title="Click here."
        />

        {/* Corps de chat */}
        <div className="flex-1 p-4 relative overflow-y-auto">
          {/* Messages... */}

          {/* 3. Overlay Ad (Flottant en bas à droite) */}
          <div className="absolute bottom-4 right-4">
            <AdCampaign 
              id="ad-3"
              type="chat-overlay"
              description="Our technology is built to options and free landing."
              linkUrl="https://sponsore.com"
            />
          </div>
        </div>

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

          {/* Input & Inline Ad */}
          <div className="p-3 flex items-center gap-2">
            <input type="text" placeholder="Tapez votre message..." className="flex-1 border rounded-full px-4 py-2 text-sm" />
            
            {/* 5. Inline Input Ad */}
            <AdCampaign 
              id="ad-5"
              type="inline-input-ad"
              title="VPN deal"
              description="for 304 coff, smek new deal."
              linkUrl="https://example.com"
            />
            
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Envoyer</button>
          </div>
        </div>
      </div>

      {/* Colonne de droite (Sidebar Ads) */}
      <div className="w-64 p-3 bg-gray-50 flex flex-col gap-3 ">
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

    </div>
  );
};