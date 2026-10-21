import React, { useState } from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const ChallengesView: React.FC = () => {
  const {
    challenges,
    friends,
    checkInChallenge,
    joinChallenge,
    setIsCreateChallengeOpen,
    setIsAddFriendOpen,
    acceptFriendRequest,
    rejectFriendRequest,
    setIsSupabaseModalOpen,
    triggerToast,
  } = useLifeOS();

  const [copiedLink, setCopiedLink] = useState(false);

  const heroChallenge = challenges[0];
  const otherChallenges = challenges.slice(1);

  // Separate friends vs pending invites
  const activeFriends = friends.filter((f) => f.status === 'friend');
  const pendingIncoming = friends.filter((f) => f.status === 'pending_incoming');

  const copyInviteLink = () => {
    const inviteLink = 'lifeos.app/squad/aurora';
    navigator.clipboard?.writeText(inviteLink);
    setCopiedLink(true);
    triggerToast('Invite link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-8 animate-fadeIn">
      {/* 1. Header Title & Action Area */}
      <section className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <h1 className="text-[26px] sm:text-[30px] font-bold text-[#e3e2e6] tracking-tight leading-tight">
              Grow together
            </h1>
            <p className="text-[14px] text-[#cac4d4]">
              Accountability and friendly competition with your circle.
            </p>
          </div>
          <button
            onClick={() => setIsCreateChallengeOpen(true)}
            className="shrink-0 flex items-center gap-1.5 h-10 px-4 rounded-xl bg-[#cebdff] text-[#381385] font-semibold text-[14px] transition-all duration-200 active:scale-95 shadow-[0_0_16px_rgba(206,189,255,0.2)] hover:bg-[#e8ddff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Create</span>
          </button>
        </div>

        {/* Demo Simulation Notice */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#292a2d]/60 border border-[#343538] text-[11px] text-[#cac4d4]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dbc839]"></span>
            <span className="font-medium">Demo Squad Simulation (Local State)</span>
          </div>
          <button
            onClick={() => setIsSupabaseModalOpen(true)}
            className="text-[#cebdff] hover:underline font-semibold cursor-pointer"
          >
            Phase 2 Cloud Sync Spec →
          </button>
        </div>
      </section>

      {/* 2. Featured Group Challenge (Hero Card) */}
      {heroChallenge && (
        <section className="relative overflow-hidden rounded-2xl bg-[#292a2d] border border-[#343538] p-4 sm:p-5 shadow-lg">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#a78bfa]/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-4">
            {/* Top Meta Badge & Title */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#cebdff]/10 text-[#cebdff] border border-[#cebdff]/20 text-[11px] font-semibold tracking-wider uppercase">
                  {heroChallenge.tag}
                </span>
                <span className="text-[12px] text-[#cac4d4]">
                  Day {heroChallenge.daysElapsed} of {heroChallenge.daysTotal} •{' '}
                  {heroChallenge.daysTotal - heroChallenge.daysElapsed} days left
                </span>
              </div>
              <h2 className="text-[18px] font-bold text-[#e3e2e6] tracking-tight">
                {heroChallenge.title}
              </h2>
              <p className="text-[13px] text-[#cac4d4] leading-relaxed">
                {heroChallenge.description}
              </p>
            </div>

            {/* Collective Visual Meter */}
            <div className="flex flex-col gap-2 p-3 rounded-xl bg-[#1b1b1f] border border-[#343538]/60">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#cac4d4]">Team Velocity</span>
                <span className="text-[12px] font-bold text-[#4edea3]">
                  {Math.round((heroChallenge.currentProgress / heroChallenge.totalTarget) * 100)}% Completed
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#343538] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00a572] to-[#4edea3] transition-all duration-500"
                  style={{
                    width: `${Math.round(
                      (heroChallenge.currentProgress / heroChallenge.totalTarget) * 100
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="flex items-center justify-between pt-1">
                {/* Geometric Avatar Stack */}
                <div className="flex items-center -space-x-2">
                  {heroChallenge.participants.slice(0, 4).map((p, i) => (
                    <div
                      key={p.id || i}
                      className="w-7 h-7 rounded-lg bg-[#343538] border border-[#1b1b1f] text-[#cebdff] flex items-center justify-center text-[10px] font-bold shadow-sm"
                      style={{
                        backgroundColor: p.isCurrentUser ? '#cebdff' : undefined,
                        color: p.isCurrentUser ? '#381385' : undefined,
                      }}
                      title={p.name}
                    >
                      {p.initials}
                    </div>
                  ))}
                  {heroChallenge.participants.length > 4 && (
                    <div className="w-7 h-7 rounded-lg bg-[#292a2d] border border-[#1b1b1f] text-[#cac4d4] flex items-center justify-center text-[10px] font-semibold">
                      +{heroChallenge.participants.length - 4}
                    </div>
                  )}
                </div>
                <span className="text-[12px] text-[#cac4d4]">
                  {heroChallenge.participants.length} Active Squad Members
                </span>
              </div>
            </div>

            {/* Standing Box */}
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#1f1f23] border border-[#343538]/70">
              <div className="w-8 h-8 rounded-lg bg-[#38393c] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#4edea3] text-[20px]">
                  military_tech
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-semibold text-[#e3e2e6] truncate">
                  Rank #{heroChallenge.userRank || 2} • 26 hrs logged
                </span>
                <span className="text-[11px] text-[#cac4d4] truncate">
                  {heroChallenge.userLoggedValue || 'Trailing Alex M. by 2 hrs (28 hrs)'}
                </span>
              </div>
            </div>

            {/* Action Check In Button */}
            <button
              onClick={() => checkInChallenge(heroChallenge.id)}
              className={`w-full h-11 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                heroChallenge.userCheckedInToday
                  ? 'bg-[#00a572] text-[#e3e2e6] shadow-sm'
                  : 'bg-[#cebdff] text-[#381385] hover:bg-[#e8ddff] active:scale-[0.99] shadow-[0_0_20px_rgba(206,189,255,0.2)]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {heroChallenge.userCheckedInToday ? 'check_circle' : 'verified'}
              </span>
              <span>
                {heroChallenge.userCheckedInToday
                  ? 'Logged Today (+50 XP Secured)'
                  : 'Check In Today (+50 XP)'}
              </span>
            </button>
          </div>
        </section>
      )}

      {/* 3. Active & Upcoming Challenges List */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-[#e3e2e6] tracking-tight">
            Active & Upcoming
          </h3>
          <span className="text-[12px] text-[#cac4d4] font-medium">
            {otherChallenges.length} Ongoing
          </span>
        </div>

        {otherChallenges.map((ch) => {
          const progressPercent = Math.min(
            100,
            Math.round((ch.currentProgress / (ch.totalTarget || 1)) * 100)
          );

          return (
            <div
              key={ch.id}
              className="flex flex-col gap-3 p-4 rounded-2xl bg-[#1f1f23] border border-[#343538]/70 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#4edea3]/15 text-[#4edea3] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">
                      {ch.type === 'collective'
                        ? 'directions_walk'
                        : ch.type === 'habit'
                        ? 'nutrition'
                        : 'flag'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h4 className="text-[14px] font-semibold text-[#e3e2e6] truncate">
                      {ch.title}
                    </h4>
                    <span className="text-[12px] text-[#cac4d4]">
                      {ch.participants.length} participants collaborating
                    </span>
                  </div>
                </div>

                {ch.userHasJoined ? (
                  <span className="px-2 py-0.5 rounded-full bg-[#38393c] text-[#cac4d4] text-[11px] font-medium">
                    {progressPercent}%
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-[#cebdff]/10 text-[#cebdff] text-[11px] font-semibold">
                    Starts in 4d
                  </span>
                )}
              </div>

              {ch.userHasJoined ? (
                <div className="flex flex-col gap-1.5">
                  <div className="w-full h-1.5 rounded-full bg-[#343538] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#4edea3] transition-all"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#cac4d4]">
                    <span>
                      {ch.currentProgress.toLocaleString()} / {ch.totalTarget.toLocaleString()}{' '}
                      {ch.unit}
                    </span>
                    <span className="text-[#4edea3] font-medium">
                      {(ch.totalTarget - ch.currentProgress).toLocaleString()} remaining
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-[13px] text-[#cac4d4] leading-relaxed">
                  {ch.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#dbc839] text-[16px]">
                    stars
                  </span>
                  <span className="text-[12px] text-[#cac4d4]">
                    {ch.badgeName} & +{ch.xpReward} XP
                  </span>
                </div>

                {ch.userHasJoined ? (
                  <button
                    onClick={() => triggerToast(`Viewing progress logs for ${ch.title}`)}
                    className="px-3 py-1 rounded-lg bg-[#38393c] text-[#e3e2e6] text-[12px] font-medium hover:bg-[#292a2d] transition-colors cursor-pointer"
                  >
                    View Log
                  </button>
                ) : (
                  <button
                    onClick={() => joinChallenge(ch.id)}
                    className="px-4 py-1.5 rounded-lg bg-[#cebdff] text-[#381385] text-[12px] font-semibold transition-all duration-200 active:scale-95 shadow-sm hover:bg-[#e8ddff] cursor-pointer"
                  >
                    Join Challenge
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* 4. Friends Circle / Squad Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[16px] font-bold text-[#e3e2e6] tracking-tight">
              Friends Circle
            </h3>
            <span className="px-1.5 py-0.5 rounded bg-[#292a2d] text-[#cac4d4] text-[11px] font-medium">
              {activeFriends.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#4edea3] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
              Live Activity
            </span>
            <button
              onClick={() => setIsAddFriendOpen(true)}
              className="text-[12px] font-semibold text-[#cebdff] hover:text-[#e8ddff] ml-1 flex items-center gap-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">person_add</span>
              <span>Find</span>
            </button>
          </div>
        </div>

        {/* Pending Friend Requests if any */}
        {pendingIncoming.length > 0 && (
          <div className="flex flex-col gap-2 p-3 rounded-xl bg-[#292a2d]/90 border border-[#a78bfa]/40 mb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#cebdff] font-bold">
              Pending Friend Requests ({pendingIncoming.length})
            </span>
            {pendingIncoming.map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#a78bfa] text-[#21005e] flex items-center justify-center font-bold text-[11px]">
                    {f.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-[#e3e2e6]">{f.name}</span>
                    <span className="text-[11px] text-[#cac4d4]">{f.handle}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => acceptFriendRequest(f.id)}
                    className="px-2.5 py-1 rounded-lg bg-[#4edea3] text-[#003824] text-[11px] font-bold hover:opacity-90"
                  >
                    Accept (+100 XP)
                  </button>
                  <button
                    onClick={() => rejectFriendRequest(f.id)}
                    className="px-2 py-1 rounded-lg bg-[#343538] text-[#cac4d4] text-[11px] hover:text-[#ffb4ab]"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Friend Cards Vertical Stack */}
        <div className="flex flex-col gap-2">
          {activeFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#1f1f23] border border-[#343538]/60 shadow-sm hover:bg-[#292a2d] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                {friend.avatarUrl ? (
                  <img
                    src={friend.avatarUrl}
                    alt={friend.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-[#4edea3]/15 text-[#4edea3] flex items-center justify-center text-[14px] font-bold shrink-0">
                    {friend.initials}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-semibold text-[#e3e2e6] truncate">
                      {friend.name}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-[#cebdff]/10 text-[#cebdff] text-[10px] font-bold shrink-0">
                      Lvl {friend.level}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#cac4d4] truncate">
                    {friend.recentActivity}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 pl-2">
                <span className="text-[12px] font-semibold text-[#e3e2e6]">
                  {friend.totalXp.toLocaleString()} XP
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    friend.tag === 'Leader'
                      ? 'text-[#4edea3]'
                      : friend.tag === 'Consistent'
                      ? 'text-[#dbc839]'
                      : 'text-[#cebdff]'
                  }`}
                >
                  {friend.gauntletRank ? `#${friend.gauntletRank} Gauntlet` : friend.tag || 'Active'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Squad Invitation Card */}
        <div className="mt-1 p-4 rounded-2xl bg-[#292a2d] border border-[#343538] flex flex-col gap-2.5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#cebdff] text-[20px]">
                group_add
              </span>
              <span className="text-[14px] font-bold text-[#e3e2e6]">
                Invite to Squad
              </span>
            </div>
            <span className="text-[11px] text-[#4edea3] font-semibold">
              +100 XP per invite
            </span>
          </div>

          <p className="text-[13px] text-[#cac4d4] leading-relaxed">
            Share your direct squad sync link. When friends accept, challenges sync automatically.
          </p>

          <div className="flex items-center justify-between p-2 pl-3 rounded-xl bg-[#0d0e11] border border-[#343538]">
            <code className="text-[12px] text-[#cebdff] font-mono select-all">
              lifeos.app/squad/aurora
            </code>
            <button
              onClick={copyInviteLink}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#38393c] text-[#e3e2e6] hover:bg-[#292a2d] transition-all text-[12px] font-semibold cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copiedLink ? 'done' : 'content_copy'}
              </span>
              <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
