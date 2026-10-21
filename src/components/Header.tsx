import React from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    user,
    unreadNotificationsCount,
    setIsNotificationCenterOpen,
  } = useLifeOS();

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Overview';
      case 'quests':
        return 'Quests';
      case 'challenges':
        return 'Challenges';
      case 'leaderboard':
        return 'Leaderboard';
      case 'profile':
        return 'Profile';
      case 'achievements':
        return 'Achievements';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#121316]/80 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.25)] border-b border-[#292a2d]/40">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          {activeTab === 'achievements' ? (
            <button
              onClick={() => setActiveTab('overview')}
              className="w-10 h-10 -ml-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors"
              aria-label="Back to overview"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : null}

          {/* Minimalist 3D-styled Logo Icon */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#cebdff]/20 to-[#a78bfa]/40 border border-[#cebdff]/30 flex items-center justify-center shadow-[0_0_12px_rgba(167,139,250,0.25)] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[#cebdff] text-[18px]">
                deployed_code
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] text-[#e3e2e6] tracking-tight leading-none group-hover:text-[#cebdff] transition-colors">
                LIFE OS
              </span>
              <span className="text-[11px] text-[#cac4d4] font-medium leading-tight mt-0.5">
                {getTabTitle()}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Date, Fire Streak & Profile Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="hidden xs:flex flex-col text-right pr-1">
            <span className="text-[11px] text-[#cac4d4] font-medium">Wed, Oct 24</span>
          </div>

          {/* 14d Active Streak Pill */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#292a2d]/70 border border-[#494552]/40 backdrop-blur-md cursor-pointer hover:border-[#4edea3]/40 transition-colors shadow-sm"
            title={`${user.activeStreak} days active streak`}
          >
            <span className="material-symbols-outlined text-[#4edea3] text-[15px]">
              local_fire_department
            </span>
            <span className="text-[11px] font-semibold text-[#4edea3]">
              {user.activeStreak}d
            </span>
          </div>

          {/* Notification Center Bell Button */}
          <button
            onClick={() => setIsNotificationCenterOpen(true)}
            className="relative w-8 h-8 rounded-full bg-[#292a2d] border border-[#494552]/40 text-[#cac4d4] hover:text-[#e3e2e6] hover:bg-[#343538] flex items-center justify-center transition-colors cursor-pointer"
            title="Notifications"
            aria-label="Open notifications"
          >
            <span className="material-symbols-outlined text-[18px]">
              {unreadNotificationsCount > 0 ? 'notifications_active' : 'notifications'}
            </span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#4edea3] text-[#003824] text-[9px] font-bold flex items-center justify-center shadow-sm">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* User Profile Mini Avatar Button */}
          <button
            onClick={() => setActiveTab('profile')}
            className="w-8 h-8 rounded-full bg-[#cebdff] text-[#381385] flex items-center justify-center shrink-0 hover:ring-2 hover:ring-[#a78bfa] transition-all cursor-pointer shadow-sm overflow-hidden"
            title="View Profile"
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-[18px]">person</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
