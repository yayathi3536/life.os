import React, { useState } from 'react';
import { useLifeOS } from '../context/LifeOSContext';
import { NotificationType } from '../types';

export const NotificationCenter: React.FC = () => {
  const {
    isNotificationCenterOpen,
    setIsNotificationCenterOpen,
    notifications,
    unreadNotificationsCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    setActiveTab,
    setIsNotificationSettingsOpen,
  } = useLifeOS();

  const [filterType, setFilterType] = useState<string>('all');

  if (!isNotificationCenterOpen) return null;

  const filtered = notifications.filter((item) => {
    if (filterType === 'unread') return !item.isRead;
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case 'quest_completion':
        return 'task_alt';
      case 'streak_milestone':
        return 'local_fire_department';
      case 'challenge_invite':
        return 'swords';
      case 'leaderboard_update':
        return 'leaderboard';
      case 'system':
      default:
        return 'bolt';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-end p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Background click to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setIsNotificationCenterOpen(false)}
      ></div>

      <div className="relative w-full sm:max-w-md h-full sm:h-auto max-h-[92vh] bg-[#1f1f23] border-l sm:border border-[#343538] sm:rounded-3xl p-5 shadow-2xl z-10 flex flex-col gap-3.5 animate-slideLeft">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#292a2d]">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg bg-[#a78bfa]/20 border border-[#a78bfa]/30 flex items-center justify-center text-[#cebdff]">
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h2 className="text-[16px] font-bold text-[#e3e2e6]">Notifications</h2>
                {unreadNotificationsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-[#4edea3]/20 text-[#4edea3] text-[10px] font-bold">
                    {unreadNotificationsCount} new
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#cac4d4]">System alerts & squad events</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setIsNotificationCenterOpen(false);
                setIsNotificationSettingsOpen(true);
              }}
              className="w-8 h-8 rounded-lg bg-[#292a2d] hover:bg-[#343538] text-[#cac4d4] hover:text-[#e3e2e6] flex items-center justify-center transition-colors cursor-pointer"
              title="Notification Settings"
            >
              <span className="material-symbols-outlined text-[17px]">settings</span>
            </button>
            <button
              onClick={() => setIsNotificationCenterOpen(false)}
              className="w-8 h-8 rounded-lg bg-[#292a2d] hover:bg-[#343538] text-[#cac4d4] hover:text-[#e3e2e6] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: `Unread (${unreadNotificationsCount})` },
            { key: 'quest_completion', label: 'Quests' },
            { key: 'streak_milestone', label: 'Streaks' },
            { key: 'challenge_invite', label: 'Challenges' },
            { key: 'leaderboard_update', label: 'Leaderboard' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterType(tab.key)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
                filterType === tab.key
                  ? 'bg-[#cebdff] text-[#381385] font-bold shadow-sm'
                  : 'bg-[#1b1b1f] border border-[#292a2d] text-[#cac4d4] hover:text-[#e3e2e6]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 max-h-[55vh]">
          {filtered.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center p-4 rounded-xl bg-[#1b1b1f] border border-[#292a2d]">
              <span className="material-symbols-outlined text-[#948e9d] text-[32px] mb-2">
                notifications_off
              </span>
              <span className="text-[14px] font-semibold text-[#e3e2e6]">
                No notifications to display
              </span>
              <p className="text-[12px] text-[#cac4d4] mt-1 max-w-xs">
                You're all caught up! Complete quests or check in to challenges to receive updates.
              </p>
            </div>
          ) : (
            filtered.map((item) => {
              const iconName = item.icon || getIconForType(item.type);
              const isUnread = !item.isRead;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    markAsRead(item.id);
                    if (item.actionLink) {
                      setActiveTab(item.actionLink.tab);
                      setIsNotificationCenterOpen(false);
                    }
                  }}
                  className={`group relative p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isUnread
                      ? 'bg-[#292a2d] border-[#cebdff]/30 shadow-[0_0_16px_rgba(206,189,255,0.06)]'
                      : 'bg-[#1b1b1f] border-[#292a2d] hover:bg-[#292a2d]/60'
                  }`}
                >
                  {/* Status Indicator */}
                  {isUnread && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#4edea3]"></span>
                  )}

                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-[#343538] shadow-sm"
                    style={{
                      backgroundColor: `${item.iconColor || '#cebdff'}15`,
                      color: item.iconColor || '#cebdff',
                    }}
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      {iconName}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-bold text-[#e3e2e6] truncate">
                        {item.title}
                      </span>
                      {item.xpDelta && (
                        <span className="px-1.5 py-0.2 rounded bg-[#4edea3]/20 text-[#4edea3] text-[10px] font-bold">
                          +{item.xpDelta} XP
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#cac4d4] mt-0.5 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#343538]/40 text-[10px] text-[#948e9d]">
                      <span>{item.timestamp}</span>
                      {item.actionLink && (
                        <span className="text-[#cebdff] font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                          <span>{item.actionLink.label || 'View'}</span>
                          <span className="material-symbols-outlined text-[13px]">
                            arrow_forward
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-[#292a2d] flex items-center justify-between text-[12px]">
          <button
            onClick={markAllAsRead}
            disabled={unreadNotificationsCount === 0}
            className="text-[#cebdff] hover:text-[#e8ddff] font-semibold disabled:opacity-40 transition-colors cursor-pointer"
          >
            Mark all read
          </button>
          <button
            onClick={clearNotifications}
            disabled={notifications.length === 0}
            className="text-[#cac4d4] hover:text-[#ffb4ab] transition-colors cursor-pointer disabled:opacity-40"
          >
            Clear history
          </button>
        </div>
      </div>
    </div>
  );
};
