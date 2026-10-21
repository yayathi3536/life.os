import React from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const NotificationSettingsModal: React.FC = () => {
  const {
    isNotificationSettingsOpen,
    setIsNotificationSettingsOpen,
    notificationPreferences,
    updateNotificationPreferences,
    sendTestNotification,
  } = useLifeOS();

  if (!isNotificationSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="absolute inset-0"
        onClick={() => setIsNotificationSettingsOpen(false)}
      ></div>

      <div className="relative w-full max-w-md bg-[#1f1f23] border border-[#343538] rounded-2xl p-5 shadow-2xl z-10 max-h-[88vh] overflow-y-auto flex flex-col gap-4 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#292a2d]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#cebdff] text-[20px]">
              tune
            </span>
            <div>
              <h2 className="text-[17px] font-bold text-[#e3e2e6]">
                Notification Preferences
              </h2>
              <span className="text-[11px] text-[#cac4d4]">
                Configure alerts, sounds, and squad events
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsNotificationSettingsOpen(false)}
            className="w-8 h-8 rounded-full bg-[#292a2d] hover:bg-[#343538] flex items-center justify-center text-[#cac4d4] hover:text-[#e3e2e6] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Configuration Toggles */}
        <div className="flex flex-col divide-y divide-[#292a2d] bg-[#1b1b1f] border border-[#292a2d] rounded-xl overflow-hidden">
          {/* 1. Quest Completions */}
          <div className="flex items-center justify-between p-3.5">
            <div className="flex items-start gap-2.5 min-w-0 pr-2">
              <span className="material-symbols-outlined text-[#cebdff] text-[18px] mt-0.5">
                task_alt
              </span>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#e3e2e6]">
                  Quest Completions & XP
                </span>
                <span className="text-[11px] text-[#cac4d4] leading-relaxed">
                  Real-time alerts when daily and weekly quests are finished and XP is credited.
                </span>
              </div>
            </div>
            <button
              onClick={() =>
                updateNotificationPreferences({
                  questCompletions: !notificationPreferences.questCompletions,
                })
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                notificationPreferences.questCompletions ? 'bg-[#4edea3]' : 'bg-[#343538]'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-[#121316] transition-transform absolute top-1 ${
                  notificationPreferences.questCompletions ? 'right-1' : 'left-1'
                }`}
              ></span>
            </button>
          </div>

          {/* 2. Streak Reminders */}
          <div className="flex items-center justify-between p-3.5">
            <div className="flex items-start gap-2.5 min-w-0 pr-2">
              <span className="material-symbols-outlined text-[#4edea3] text-[18px] mt-0.5">
                local_fire_department
              </span>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#e3e2e6]">
                  Streak Reminders & Milestones
                </span>
                <span className="text-[11px] text-[#cac4d4] leading-relaxed">
                  Alerts when your daily streak is verified or when you approach a record.
                </span>
              </div>
            </div>
            <button
              onClick={() =>
                updateNotificationPreferences({
                  streakReminders: !notificationPreferences.streakReminders,
                })
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                notificationPreferences.streakReminders ? 'bg-[#4edea3]' : 'bg-[#343538]'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-[#121316] transition-transform absolute top-1 ${
                  notificationPreferences.streakReminders ? 'right-1' : 'left-1'
                }`}
              ></span>
            </button>
          </div>

          {/* 3. Challenge Invites */}
          <div className="flex items-center justify-between p-3.5">
            <div className="flex items-start gap-2.5 min-w-0 pr-2">
              <span className="material-symbols-outlined text-[#cebdff] text-[18px] mt-0.5">
                swords
              </span>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#e3e2e6]">
                  Challenge Invites & Squad Sprints
                </span>
                <span className="text-[11px] text-[#cac4d4] leading-relaxed">
                  Invitations to private group challenges and squad check-in updates.
                </span>
              </div>
            </div>
            <button
              onClick={() =>
                updateNotificationPreferences({
                  challengeInvites: !notificationPreferences.challengeInvites,
                })
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                notificationPreferences.challengeInvites ? 'bg-[#4edea3]' : 'bg-[#343538]'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-[#121316] transition-transform absolute top-1 ${
                  notificationPreferences.challengeInvites ? 'right-1' : 'left-1'
                }`}
              ></span>
            </button>
          </div>

          {/* 4. Leaderboard Updates */}
          <div className="flex items-center justify-between p-3.5">
            <div className="flex items-start gap-2.5 min-w-0 pr-2">
              <span className="material-symbols-outlined text-[#dbc839] text-[18px] mt-0.5">
                leaderboard
              </span>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#e3e2e6]">
                  Friend Leaderboard Updates
                </span>
                <span className="text-[11px] text-[#cac4d4] leading-relaxed">
                  Real-time alerts when friends pass your score or close the weekly XP pace gap.
                </span>
              </div>
            </div>
            <button
              onClick={() =>
                updateNotificationPreferences({
                  leaderboardAlerts: !notificationPreferences.leaderboardAlerts,
                })
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                notificationPreferences.leaderboardAlerts ? 'bg-[#4edea3]' : 'bg-[#343538]'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-[#121316] transition-transform absolute top-1 ${
                  notificationPreferences.leaderboardAlerts ? 'right-1' : 'left-1'
                }`}
              ></span>
            </button>
          </div>

          {/* 5. Sound Chime */}
          <div className="flex items-center justify-between p-3.5">
            <div className="flex items-start gap-2.5 min-w-0 pr-2">
              <span className="material-symbols-outlined text-[#e3e2e6] text-[18px] mt-0.5">
                volume_up
              </span>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#e3e2e6]">
                  Audio Chime & Feedback
                </span>
                <span className="text-[11px] text-[#cac4d4] leading-relaxed">
                  Subtle synthesized audio ping upon quest completions and milestone achievements.
                </span>
              </div>
            </div>
            <button
              onClick={() =>
                updateNotificationPreferences({
                  soundEnabled: !notificationPreferences.soundEnabled,
                })
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                notificationPreferences.soundEnabled ? 'bg-[#4edea3]' : 'bg-[#343538]'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-[#121316] transition-transform absolute top-1 ${
                  notificationPreferences.soundEnabled ? 'right-1' : 'left-1'
                }`}
              ></span>
            </button>
          </div>

          {/* 6. In-App Toast Banner */}
          <div className="flex items-center justify-between p-3.5">
            <div className="flex items-start gap-2.5 min-w-0 pr-2">
              <span className="material-symbols-outlined text-[#e3e2e6] text-[18px] mt-0.5">
                campaign
              </span>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#e3e2e6]">
                  In-App Banner Toasts
                </span>
                <span className="text-[11px] text-[#cac4d4] leading-relaxed">
                  Display floating top notification banners when events occur.
                </span>
              </div>
            </div>
            <button
              onClick={() =>
                updateNotificationPreferences({
                  inAppBanner: !notificationPreferences.inAppBanner,
                })
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                notificationPreferences.inAppBanner ? 'bg-[#4edea3]' : 'bg-[#343538]'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-[#121316] transition-transform absolute top-1 ${
                  notificationPreferences.inAppBanner ? 'right-1' : 'left-1'
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Live Test Notification Sandbox */}
        <div className="p-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-[#cebdff] uppercase tracking-wider">
              Live Preview & Test
            </span>
            <span className="text-[#cac4d4]">Trigger sample events</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => sendTestNotification('quest_completion')}
              className="py-1.5 px-2.5 rounded-lg bg-[#292a2d] hover:bg-[#343538] text-[11px] font-semibold text-[#e3e2e6] border border-[#343538] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px] text-[#cebdff]">
                task_alt
              </span>
              <span>Test Quest</span>
            </button>

            <button
              onClick={() => sendTestNotification('streak_milestone')}
              className="py-1.5 px-2.5 rounded-lg bg-[#292a2d] hover:bg-[#343538] text-[11px] font-semibold text-[#e3e2e6] border border-[#343538] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px] text-[#4edea3]">
                local_fire_department
              </span>
              <span>Test Streak</span>
            </button>

            <button
              onClick={() => sendTestNotification('challenge_invite')}
              className="py-1.5 px-2.5 rounded-lg bg-[#292a2d] hover:bg-[#343538] text-[11px] font-semibold text-[#e3e2e6] border border-[#343538] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px] text-[#cebdff]">
                swords
              </span>
              <span>Test Challenge</span>
            </button>

            <button
              onClick={() => sendTestNotification('leaderboard_update')}
              className="py-1.5 px-2.5 rounded-lg bg-[#292a2d] hover:bg-[#343538] text-[11px] font-semibold text-[#e3e2e6] border border-[#343538] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px] text-[#dbc839]">
                leaderboard
              </span>
              <span>Test Leaderboard</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#292a2d] flex justify-end">
          <button
            onClick={() => setIsNotificationSettingsOpen(false)}
            className="px-4 py-2 rounded-xl bg-[#cebdff] text-[#381385] text-[13px] font-bold hover:bg-[#e8ddff] transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
