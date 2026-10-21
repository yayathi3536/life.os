import React from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const ProfileView: React.FC = () => {
  const {
    user,
    setActiveTab,
    setIsEditProfileOpen,
    setIsXpAuditOpen,
    setIsSupabaseModalOpen,
    setIsNotificationSettingsOpen,
    notificationPreferences,
    updatePreferences,
    resetAllData,
    triggerToast,
  } = useLifeOS();

  const togglePrivacy = () => {
    const nextPrivacy =
      user.preferences.squadPrivacy === 'Friends Only'
        ? 'Public'
        : user.preferences.squadPrivacy === 'Public'
        ? 'Private'
        : 'Friends Only';
    updatePreferences({ squadPrivacy: nextPrivacy });
    triggerToast(`Squad Privacy updated to ${nextPrivacy}`);
  };

  const toggleSync = () => {
    const nextSync =
      user.preferences.healthSync === 'Apple Health'
        ? 'Google Fit'
        : user.preferences.healthSync === 'Google Fit'
        ? 'Disabled'
        : 'Apple Health';
    updatePreferences({ healthSync: nextSync });
    triggerToast(`Health Telemetry: ${nextSync}`);
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-24 animate-fadeIn">
      {/* 1. Profile Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1b1b1f] border border-[#292a2d] p-4 sm:p-5 shadow-lg flex flex-col gap-4">
        {/* Ambient subtle background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#a78bfa]/10 blur-3xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#292a2d] p-0.5 shadow-sm border border-[#343538]">
                {user.avatarUrl ? (
                  <img
                    alt={user.name}
                    className="w-full h-full object-cover rounded-lg"
                    src={user.avatarUrl}
                  />
                ) : (
                  <div className="w-full h-full bg-[#343538] flex items-center justify-center font-bold text-[20px] text-[#cebdff]">
                    JT
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-[#4edea3] text-[#003824] shadow-sm">
                <span className="material-symbols-outlined text-[12px] font-bold">
                  verified
                </span>
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-[20px] font-bold text-[#e3e2e6] tracking-tight truncate">
                  {user.name}
                </h1>
              </div>
              <span className="text-[12px] text-[#cebdff] font-medium tracking-wide">
                {user.handle}
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="px-2 py-0.5 rounded bg-[#a78bfa]/20 text-[#cebdff] border border-[#a78bfa]/30 text-[11px] font-bold">
                  Lvl {user.level}
                </span>
                <span className="text-[#cac4d4] text-[11px] font-medium">
                  • {user.tierName} Class
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="shrink-0 p-2 rounded-xl bg-[#1f1f23] border border-[#343538] text-[#cac4d4] hover:text-[#e3e2e6] hover:bg-[#292a2d] transition-colors flex items-center justify-center cursor-pointer active:scale-95"
            title="Edit Profile"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Micro Stats Ribbon */}
        <div className="flex items-center justify-between pt-2 border-t border-[#292a2d]/80 text-[#cac4d4] text-[12px]">
          <div className="flex items-center gap-1 truncate">
            <span className="material-symbols-outlined text-[14px] text-[#948e9d]">
              calendar_today
            </span>
            <span>Joined {user.joinedDate}</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-[#cebdff]">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            <span>{user.totalXp.toLocaleString()} Total XP</span>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row (Compact Horizontal Strip) */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col p-3 rounded-xl bg-[#1b1b1f] border border-[#292a2d] shadow-sm">
          <span className="text-[11px] text-[#cac4d4] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#cebdff]">
              task_alt
            </span>{' '}
            Quests
          </span>
          <span className="text-[20px] font-bold text-[#e3e2e6] mt-0.5">284</span>
          <span className="text-[10px] text-[#4edea3] font-semibold">91.4% Rate</span>
        </div>

        <div className="flex flex-col p-3 rounded-xl bg-[#1b1b1f] border border-[#292a2d] shadow-sm">
          <span className="text-[11px] text-[#cac4d4] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#4edea3]">
              local_fire_department
            </span>{' '}
            Current
          </span>
          <span className="text-[20px] font-bold text-[#4edea3] mt-0.5">
            {user.activeStreak}
            <span className="text-[12px] text-[#cac4d4] font-normal">d</span>
          </span>
          <span className="text-[10px] text-[#cac4d4]">Active Streak</span>
        </div>

        <div className="flex flex-col p-3 rounded-xl bg-[#1b1b1f] border border-[#292a2d] shadow-sm">
          <span className="text-[11px] text-[#cac4d4] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#dbc839]">
              workspace_premium
            </span>{' '}
            Record
          </span>
          <span className="text-[20px] font-bold text-[#e3e2e6] mt-0.5">
            {user.recordStreak}
            <span className="text-[12px] text-[#cac4d4] font-normal">d</span>
          </span>
          <span className="text-[10px] text-[#dbc839] font-semibold">Personal Best</span>
        </div>
      </div>

      {/* Screen 6 Navigation: Mastery & Achievements Access */}
      <div
        onClick={() => setActiveTab('achievements')}
        className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1f1f23] border border-[#343538] hover:border-[#cebdff]/40 transition-colors cursor-pointer shadow-sm group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#cebdff]/15 text-[#cebdff] flex items-center justify-center border border-[#cebdff]/20">
            <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#e3e2e6] group-hover:text-[#cebdff] transition-colors">
              Mastery Milestones & Perks
            </span>
            <span className="text-[11px] text-[#cac4d4]">
              18 of 42 Unlocked • Adept III Tier (4,250 XP)
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#cebdff]">
          <span>View Badges</span>
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
            chevron_right
          </span>
        </div>
      </div>

      {/* 3. Skill Attributes Section */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#cebdff]">
              interests
            </span>
            <h2 className="text-[15px] font-bold text-[#e3e2e6] tracking-tight">
              Skill Attributes
            </h2>
          </div>
          <span className="text-[11px] text-[#cac4d4] font-medium">6 Dimensions</span>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-[#1b1b1f] border border-[#292a2d] p-4 shadow-sm">
          {Object.entries(user.skills).map(([key, skill]) => {
            return (
              <div key={key} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[#e3e2e6]">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    ></span>
                    <span className="text-[13px] font-semibold">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-1.5 py-0.2 rounded bg-[#292a2d] text-[#e3e2e6] font-semibold">
                      Lvl {skill.level}
                    </span>
                    <span
                      className="text-[11px] font-bold"
                      style={{ color: skill.color }}
                    >
                      {skill.progressPercent}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-[#343538] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${skill.progressPercent}%`,
                      backgroundColor: skill.color,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Monthly Activity Heatmap Section */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#4edea3]">
              grid_on
            </span>
            <h2 className="text-[15px] font-bold text-[#e3e2e6] tracking-tight">
              Monthly Activity
            </h2>
          </div>
          <span className="text-[11px] text-[#4edea3] font-semibold">
            26 / 30 Days Active
          </span>
        </div>

        <div className="flex flex-col rounded-2xl bg-[#1b1b1f] border border-[#292a2d] p-4 shadow-sm gap-3">
          <div className="flex items-center justify-between text-[#cac4d4] text-[11px] pb-1 border-b border-[#292a2d]">
            <span className="font-semibold">October 2024</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#948e9d]">Less</span>
              <span className="w-2.5 h-2.5 rounded-xs bg-[#343538] inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-[#a78bfa]/40 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-[#cebdff] inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-[#4edea3] inline-block"></span>
              <span className="text-[10px] text-[#948e9d]">More</span>
            </div>
          </div>

          {/* 7 columns x 4 rows grid */}
          <div className="grid grid-cols-7 gap-1.5 pt-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} className="text-center text-[10px] text-[#948e9d] font-bold">
                {day}
              </div>
            ))}

            {/* Week 1 */}
            <div className="h-6 rounded bg-[#343538]/40 flex items-center justify-center text-[10px] text-[#cac4d4]/40">
              30
            </div>
            <div className="h-6 rounded bg-[#a78bfa]/30 flex items-center justify-center text-[10px] text-[#e3e2e6]">
              1
            </div>
            <div className="h-6 rounded bg-[#cebdff] flex items-center justify-center text-[10px] text-[#381385] font-bold">
              2
            </div>
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              3
            </div>
            <div className="h-6 rounded bg-[#cebdff] flex items-center justify-center text-[10px] text-[#381385] font-bold">
              4
            </div>
            <div className="h-6 rounded bg-[#343538] flex items-center justify-center text-[10px] text-[#cac4d4]">
              5
            </div>
            <div className="h-6 rounded bg-[#a78bfa]/50 flex items-center justify-center text-[10px] text-[#e3e2e6]">
              6
            </div>

            {/* Week 2 */}
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              7
            </div>
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              8
            </div>
            <div className="h-6 rounded bg-[#cebdff] flex items-center justify-center text-[10px] text-[#381385] font-bold">
              9
            </div>
            <div className="h-6 rounded bg-[#cebdff] flex items-center justify-center text-[10px] text-[#381385] font-bold">
              10
            </div>
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              11
            </div>
            <div className="h-6 rounded bg-[#a78bfa]/40 flex items-center justify-center text-[10px] text-[#e3e2e6]">
              12
            </div>
            <div className="h-6 rounded bg-[#343538] flex items-center justify-center text-[10px] text-[#cac4d4]">
              13
            </div>

            {/* Week 3 (Streak begins) */}
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              14
            </div>
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              15
            </div>
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              16
            </div>
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              17
            </div>
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              18
            </div>
            <div className="h-6 rounded bg-[#cebdff] flex items-center justify-center text-[10px] text-[#381385] font-bold">
              19
            </div>
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              20
            </div>

            {/* Week 4 (Active streak continues, 24 highlighted) */}
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              21
            </div>
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              22
            </div>
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold">
              23
            </div>
            <div className="h-6 rounded bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold shadow-[0_0_8px_rgba(78,222,163,0.5)] ring-2 ring-[#4edea3]">
              24
            </div>
            <div className="h-6 rounded bg-[#1f1f23] flex items-center justify-center text-[10px] text-[#948e9d]">
              25
            </div>
            <div className="h-6 rounded bg-[#1f1f23] flex items-center justify-center text-[10px] text-[#948e9d]">
              26
            </div>
            <div className="h-6 rounded bg-[#1f1f23] flex items-center justify-center text-[10px] text-[#948e9d]">
              27
            </div>
          </div>
        </div>
      </div>

      {/* 5. Quick Settings & System Preferences */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#948e9d]">
              settings
            </span>
            <h2 className="text-[15px] font-bold text-[#e3e2e6] tracking-tight">
              System Preferences
            </h2>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-[#292a2d] rounded-2xl bg-[#1b1b1f] border border-[#292a2d] shadow-sm overflow-hidden">
          {/* Setting 1: Cadence */}
          <div
            onClick={() => triggerToast(`Morning cadence configured at ${user.preferences.reminderTime}`)}
            className="flex items-center justify-between p-3.5 hover:bg-[#1f1f23] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#292a2d] flex items-center justify-center text-[#cebdff]">
                <span className="material-symbols-outlined text-[18px]">alarm</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#e3e2e6]">
                  Daily Reminder & Cadence
                </span>
                <span className="text-[11px] text-[#cac4d4]">
                  {user.preferences.cadence}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded bg-[#292a2d] text-[11px] font-bold text-[#cebdff]">
                {user.preferences.reminderTime}
              </span>
              <span className="material-symbols-outlined text-[#948e9d] text-[18px]">
                chevron_right
              </span>
            </div>
          </div>

          {/* Setting 2: Squad Privacy */}
          <div
            onClick={togglePrivacy}
            className="flex items-center justify-between p-3.5 hover:bg-[#1f1f23] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#292a2d] flex items-center justify-center text-[#dbc839]">
                <span className="material-symbols-outlined text-[18px]">
                  shield_person
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#e3e2e6]">
                  Squad Privacy
                </span>
                <span className="text-[11px] text-[#cac4d4]">
                  Visibility of completed logs
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded bg-[#292a2d] text-[11px] font-bold text-[#e3e2e6]">
                {user.preferences.squadPrivacy}
              </span>
              <span className="material-symbols-outlined text-[#948e9d] text-[18px]">
                chevron_right
              </span>
            </div>
          </div>

          {/* Setting 3: Health Sync */}
          <div
            onClick={toggleSync}
            className="flex items-center justify-between p-3.5 hover:bg-[#1f1f23] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#292a2d] flex items-center justify-center text-[#4edea3]">
                <span className="material-symbols-outlined text-[18px]">favorite</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#e3e2e6]">
                  Health & Device Sync
                </span>
                <span className="text-[11px] text-[#cac4d4]">
                  Biometrics and steps telemetry
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00a572]/20 border border-[#00a572]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                <span className="text-[11px] text-[#4edea3] font-semibold">
                  {user.preferences.healthSync}
                </span>
              </div>
              <span className="material-symbols-outlined text-[#948e9d] text-[18px]">
                chevron_right
              </span>
            </div>
          </div>

          {/* Setting 4: Notifications (Configurable) */}
          <div
            onClick={() => setIsNotificationSettingsOpen(true)}
            className="flex items-center justify-between p-3.5 hover:bg-[#1f1f23] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#292a2d] flex items-center justify-center text-[#cebdff]">
                <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#e3e2e6]">
                  Push & In-App Notifications
                </span>
                <span className="text-[11px] text-[#cac4d4]">
                  Quests, streaks, challenges & leaderboard alerts
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded bg-[#a78bfa]/20 text-[11px] font-bold text-[#cebdff]">
                {notificationPreferences.soundEnabled ? 'Chime Active' : 'Silent'}
              </span>
              <span className="material-symbols-outlined text-[#948e9d] text-[18px]">
                chevron_right
              </span>
            </div>
          </div>

          {/* Setting 5: XP Audit Ledger (Auditable Records) */}
          <div
            onClick={() => setIsXpAuditOpen(true)}
            className="flex items-center justify-between p-3.5 hover:bg-[#1f1f23] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#292a2d] flex items-center justify-center text-[#cebdff]">
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#e3e2e6]">
                  XP Audit Ledger
                </span>
                <span className="text-[11px] text-[#cac4d4]">
                  Verified immutable reward transaction history
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-[#a78bfa]/20 text-[10px] font-bold text-[#cebdff]">
                Verified Log
              </span>
              <span className="material-symbols-outlined text-[#948e9d] text-[18px]">
                chevron_right
              </span>
            </div>
          </div>

          {/* Setting 5: Supabase Phase 2 Integration Details */}
          <div
            onClick={() => setIsSupabaseModalOpen(true)}
            className="flex items-center justify-between p-3.5 hover:bg-[#1f1f23] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#292a2d] flex items-center justify-center text-[#4edea3]">
                <span className="material-symbols-outlined text-[18px]">database</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#e3e2e6]">
                  Phase 2: Supabase Isolation Spec
                </span>
                <span className="text-[11px] text-[#cac4d4]">
                  Separate dedicated project schema & RLS rules
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-[#38393c] text-[10px] font-semibold text-[#4edea3]">
                Isolated
              </span>
              <span className="material-symbols-outlined text-[#948e9d] text-[18px]">
                chevron_right
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Account Actions */}
      <div className="flex items-center justify-between px-2 pt-1 pb-4">
        <button
          onClick={resetAllData}
          className="flex items-center gap-1.5 text-[#cac4d4] hover:text-[#ffb4ab] transition-colors text-[12px] font-medium cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          <span>Reset Sample Session</span>
        </button>
        <span className="text-[11px] text-[#948e9d]">
          LIFE OS v2.4.0 • Build 849
        </span>
      </div>
    </div>
  );
};
