import React from 'react';
import { useLifeOS } from '../context/LifeOSContext';
import { ActiveTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useLifeOS();

  const navItems: { tab: ActiveTab; label: string; icon: string }[] = [
    { tab: 'overview', label: 'Overview', icon: 'grid_view' },
    { tab: 'quests', label: 'Quests', icon: 'task_alt' },
    { tab: 'challenges', label: 'Challenges', icon: 'swords' },
    { tab: 'leaderboard', label: 'Ranking', icon: 'leaderboard' },
    { tab: 'profile', label: 'Profile', icon: 'account_circle' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#121316]/85 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.5)] border-t border-[#292a2d]/40">
      <div className="max-w-2xl mx-auto flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center justify-center min-w-[58px] h-12 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#e8ddff] bg-[#a78bfa]/20 shadow-[0_0_16px_rgba(167,139,250,0.22)] border border-[#cebdff]/30'
                  : 'text-[#cac4d4] hover:text-[#e3e2e6] hover:bg-[#1f1f23]/60'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#cebdff]' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] tracking-wide font-medium mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
