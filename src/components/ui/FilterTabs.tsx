'use client';

import { useState } from 'react';

export default function FilterTabs() {
  const [activeTab, setActiveTab] = useState('All Chats');

  const tabs = [
    { name: 'All Chats', badge: null },
    { name: 'Groups', badge: null },
    { name: 'Unread', badge: '3' },
    { name: 'Calls', badge: null }
  ];

  return (
    <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar sticky top-0 bg-[#0B0F19]/95 backdrop-blur-sm z-40">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <button 
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition border ${
              isActive 
                ? 'bg-slate-800 text-white border-slate-700' 
                : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-800/50'
            }`}
          >
            {tab.name}
            {tab.badge && (
              <span className="ml-1 bg-sky-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
