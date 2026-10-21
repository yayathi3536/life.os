import React, { useState } from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const LeaderboardView: React.FC = () => {
  const { user, friends, weeklyActivity, setIsCreateQuestOpen, setIsSupabaseModalOpen } = useLifeOS();

  // Timeframe: 'weekly' | 'monthly' | 'allTime'
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  // Calculate current user weekly total XP
  const userWeeklyXp = weeklyActivity.reduce((acc, curr) => acc + curr.xp, 0);

  // Combine user with friends and sort
  const allRanked = [
    {
      id: user.id,
      name: 'You (Architect)',
      handle: user.handle,
      avatarUrl: user.avatarUrl,
      initials: 'YOU',
      level: user.level,
      totalXp: user.totalXp,
      weeklyXp: userWeeklyXp,
      monthlyXp: user.totalXp > 8000 ? 7420 : user.totalXp,
      allTimeXp: user.totalXp,
      streak: user.activeStreak,
      questsCompleted: 19,
      isCurrentUser: true,
      tag: 'YOU',
    },
    ...friends
      .filter((f) => f.status === 'friend')
      .map((f) => ({
        id: f.id,
        name: f.name,
        handle: f.handle,
        avatarUrl: f.avatarUrl,
        initials: f.initials,
        level: f.level,
        totalXp: f.totalXp,
        weeklyXp: f.weeklyXp,
        monthlyXp: Math.round(f.weeklyXp * 3.8),
        allTimeXp: f.totalXp,
        streak: f.streak,
        questsCompleted: f.questsCompletedThisWeek,
        isCurrentUser: false,
        tag: f.tag,
      })),
  ].sort((a, b) => {
    if (timeframe === 'weekly') return b.weeklyXp - a.weeklyXp;
    if (timeframe === 'monthly') return b.monthlyXp - a.monthlyXp;
    return b.allTimeXp - a.allTimeXp;
  });

  // Top 3 Podium members
  const top1 = allRanked[0];
  const top2 = allRanked[1];
  const top3 = allRanked[2];

  // User rank in list
  const userRankIndex = allRanked.findIndex((item) => item.isCurrentUser);
  const userRankNumber = userRankIndex + 1;

  // XP gap calculation compared to #1
  const top1Xp = top1
    ? timeframe === 'weekly'
      ? top1.weeklyXp
      : timeframe === 'monthly'
      ? top1.monthlyXp
      : top1.allTimeXp
    : 0;

  const currentActiveUserXp =
    timeframe === 'weekly'
      ? userWeeklyXp
      : timeframe === 'monthly'
      ? user.totalXp > 8000
        ? 7420
        : user.totalXp
      : user.totalXp;

  const xpGap = top1Xp - currentActiveUserXp;
  const pacePercent = Math.min(100, Math.round((currentActiveUserXp / (top1Xp || 1)) * 100));

  return (
    <div className="flex flex-col w-full pb-24 gap-5 animate-fadeIn">
      {/* 1. Header & Context */}
      <div className="flex flex-col pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[26px] sm:text-[30px] font-bold text-[#e3e2e6] tracking-tight leading-tight">
              Leaderboard
            </h1>
            <p className="text-[13px] text-[#cac4d4] mt-0.5">
              Squad rankings based on verified habits and quest completion.
            </p>
          </div>
          <div className="h-8 w-8 rounded-full bg-[#292a2d] border border-[#343538] flex items-center justify-center text-[#cac4d4]">
            <span className="material-symbols-outlined text-[18px]">group</span>
          </div>
        </div>

        {/* Demo Cohort Notice */}
        <div className="mt-2.5 flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#292a2d]/60 border border-[#343538] text-[11px] text-[#cac4d4]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dbc839]"></span>
            <span className="font-medium">Demo Cohort Standings (Local Simulation)</span>
          </div>
          <button
            onClick={() => setIsSupabaseModalOpen(true)}
            className="text-[#cebdff] hover:underline font-semibold cursor-pointer"
          >
            Phase 2 Cloud Sync Spec →
          </button>
        </div>

        {/* Timeframe Switcher Tabs */}
        <div className="mt-3.5 grid grid-cols-3 p-1 rounded-xl bg-[#0d0e11] border border-[#292a2d] gap-1">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`flex items-center justify-center py-1.5 px-3 rounded-lg text-[12px] font-semibold transition-all duration-200 cursor-pointer ${
              timeframe === 'weekly'
                ? 'bg-[#a78bfa] text-[#21005e] shadow-sm'
                : 'text-[#cac4d4] hover:text-[#e3e2e6]'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`flex items-center justify-center py-1.5 px-3 rounded-lg text-[12px] font-semibold transition-all duration-200 cursor-pointer ${
              timeframe === 'monthly'
                ? 'bg-[#a78bfa] text-[#21005e] shadow-sm'
                : 'text-[#cac4d4] hover:text-[#e3e2e6]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeframe('allTime')}
            className={`flex items-center justify-center py-1.5 px-3 rounded-lg text-[12px] font-semibold transition-all duration-200 cursor-pointer ${
              timeframe === 'allTime'
                ? 'bg-[#a78bfa] text-[#21005e] shadow-sm'
                : 'text-[#cac4d4] hover:text-[#e3e2e6]'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* 2. Minimalist Architectural Podium */}
      <div className="relative w-full rounded-2xl bg-[#0d0e11] border border-[#292a2d] p-4 sm:p-5 overflow-hidden shadow-lg">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#cebdff]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex items-end justify-between pt-4 pb-2 px-1">
          {/* #2 Left: Rank 2 */}
          {top2 && (
            <div className="flex flex-col items-center flex-1 z-10">
              <div className="relative mb-2">
                <div className="w-14 h-14 rounded-full bg-[#343538] p-0.5 ring-2 ring-[#cebdff]/40 shadow-[0_0_12px_rgba(206,189,255,0.15)] flex items-center justify-center overflow-hidden">
                  {top2.avatarUrl ? (
                    <img
                      src={top2.avatarUrl}
                      alt={top2.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="text-[14px] font-bold text-[#cebdff]">
                      {top2.initials}
                    </div>
                  )}
                </div>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-[#292a2d] text-[#cebdff] text-[10px] leading-tight font-bold shadow-md border border-[#cebdff]/20">
                  2nd
                </span>
              </div>
              <span className="text-[13px] text-[#e3e2e6] font-semibold text-center mt-1 flex items-center gap-1 truncate max-w-[80px]">
                {top2.isCurrentUser ? 'You' : top2.name.split(' ')[0]}
                {top2.isCurrentUser && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                )}
              </span>
              <span className="text-[11px] text-[#cac4d4]">Lvl {top2.level}</span>
              <div className="mt-1 text-center">
                <span className="text-[14px] font-bold text-[#e8ddff]">
                  {(timeframe === 'weekly'
                    ? top2.weeklyXp
                    : timeframe === 'monthly'
                    ? top2.monthlyXp
                    : top2.allTimeXp
                  ).toLocaleString()}
                </span>
                <span className="text-[9px] text-[#cac4d4] block uppercase tracking-wider">
                  XP
                </span>
              </div>
              {/* Pillar 2 */}
              <div className="w-full h-16 mt-3 rounded-t-lg bg-[#292a2d]/80 border-t border-x border-[#343538] flex flex-col items-center justify-end pb-1.5">
                <span className="text-[10px] text-[#cac4d4] font-semibold tracking-wider">
                  84% PACE
                </span>
              </div>
            </div>
          )}

          {/* #1 Center: Leader */}
          {top1 && (
            <div className="flex flex-col items-center flex-1 mx-2 z-20">
              <div className="relative mb-2">
                <div className="absolute -inset-1 rounded-full bg-[#cebdff]/30 blur-sm"></div>
                <div className="relative w-16 h-16 rounded-full bg-[#a78bfa] p-0.5 shadow-[0_0_20px_rgba(167,139,250,0.35)] flex items-center justify-center overflow-hidden">
                  {top1.avatarUrl ? (
                    <img
                      src={top1.avatarUrl}
                      alt={top1.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="text-[16px] font-bold text-[#21005e]">
                      {top1.initials}
                    </div>
                  )}
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#cebdff] text-[#381385] text-[10px] font-bold shadow-sm">
                  <span className="material-symbols-outlined text-[11px]">stars</span>
                  <span>1st</span>
                </div>
              </div>
              <span className="text-[14px] text-[#e3e2e6] font-bold text-center mt-1 truncate max-w-[100px]">
                {top1.isCurrentUser ? 'You' : top1.name.split(' ')[0]}
              </span>
              <span className="text-[11px] text-[#cebdff] font-semibold">
                Lvl {top1.level}
              </span>
              <div className="mt-1 text-center">
                <span className="text-[26px] font-bold text-[#cebdff] leading-none">
                  {(timeframe === 'weekly'
                    ? top1.weeklyXp
                    : timeframe === 'monthly'
                    ? top1.monthlyXp
                    : top1.allTimeXp
                  ).toLocaleString()}
                </span>
                <span className="text-[9px] text-[#cebdff] block uppercase tracking-wider font-semibold mt-0.5">
                  XP
                </span>
              </div>
              {/* Pillar 1 */}
              <div className="w-full h-24 mt-3 rounded-t-lg bg-[#a78bfa]/20 border-t border-x border-[#cebdff]/40 flex flex-col items-center justify-between py-2 relative overflow-hidden">
                <div className="w-full h-1 bg-[#cebdff]/60 absolute top-0 inset-x-0"></div>
                <span className="material-symbols-outlined text-[#cebdff] text-[16px]">
                  workspace_premium
                </span>
                <span className="text-[10px] font-bold text-[#cebdff] tracking-wider">
                  BENCHMARK
                </span>
              </div>
            </div>
          )}

          {/* #3 Right: Rank 3 */}
          {top3 && (
            <div className="flex flex-col items-center flex-1 z-10">
              <div className="relative mb-2">
                <div className="w-14 h-14 rounded-full bg-[#343538] p-0.5 shadow-sm flex items-center justify-center overflow-hidden">
                  {top3.avatarUrl ? (
                    <img
                      src={top3.avatarUrl}
                      alt={top3.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="text-[14px] font-bold text-[#cac4d4]">
                      {top3.initials}
                    </div>
                  )}
                </div>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-[#292a2d] text-[#cac4d4] text-[10px] leading-tight font-bold shadow-md border border-[#343538]">
                  3rd
                </span>
              </div>
              <span className="text-[13px] text-[#e3e2e6] font-semibold text-center mt-1 truncate max-w-[80px]">
                {top3.isCurrentUser ? 'You' : top3.name.split(' ')[0]}
              </span>
              <span className="text-[11px] text-[#cac4d4]">Lvl {top3.level}</span>
              <div className="mt-1 text-center">
                <span className="text-[14px] font-bold text-[#e3e2e6]">
                  {(timeframe === 'weekly'
                    ? top3.weeklyXp
                    : timeframe === 'monthly'
                    ? top3.monthlyXp
                    : top3.allTimeXp
                  ).toLocaleString()}
                </span>
                <span className="text-[9px] text-[#cac4d4] block uppercase tracking-wider">
                  XP
                </span>
              </div>
              {/* Pillar 3 */}
              <div className="w-full h-12 mt-3 rounded-t-lg bg-[#292a2d]/40 border-t border-x border-[#343538] flex flex-col items-center justify-end pb-1.5">
                <span className="text-[10px] text-[#cac4d4] font-semibold tracking-wider">
                  77% PACE
                </span>
              </div>
            </div>
          )}
        </div>

        {/* XP Pace Comparison Bar */}
        <div className="mt-2 pt-2 bg-[#1f1f23]/60 border border-[#292a2d] rounded-xl p-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#cac4d4]">
              {timeframe.toUpperCase()} XP Target Gap (vs #1)
            </span>
            <span
              className={`font-semibold ${
                xpGap <= 0 ? 'text-[#4edea3]' : 'text-[#4edea3]'
              }`}
            >
              {xpGap <= 0 ? 'Leading squad' : `-${xpGap.toLocaleString()} XP pace`}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#343538] rounded-full overflow-hidden flex">
            <div
              className="h-full bg-[#cebdff] rounded-full transition-all duration-500"
              style={{ width: `${pacePercent}%` }}
            ></div>
            <div
              className="h-full bg-[#cebdff]/20 rounded-r-full"
              style={{ width: `${100 - pacePercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 3. Squad Ranked List */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[11px] uppercase tracking-wider text-[#cac4d4] font-bold">
            Active Cohort ({allRanked.length} Members)
          </h2>
          <span className="text-[11px] text-[#cebdff] flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            Synced 4m ago
          </span>
        </div>

        {allRanked.map((member, index) => {
          const rank = index + 1;
          const isUser = member.isCurrentUser;
          const displayXp =
            timeframe === 'weekly'
              ? member.weeklyXp
              : timeframe === 'monthly'
              ? member.monthlyXp
              : member.allTimeXp;

          return (
            <div
              key={member.id}
              className={`relative flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 ${
                isUser
                  ? 'bg-[#292a2d] border-[#cebdff]/40 shadow-[0_0_24px_rgba(167,139,250,0.14)]'
                  : 'bg-[#1f1f23] border-[#343538]/60 hover:bg-[#292a2d]'
              }`}
            >
              {isUser && (
                <div className="absolute left-0 inset-y-0 w-1 rounded-l-xl bg-[#cebdff]"></div>
              )}

              <div className="flex items-center gap-3 min-w-0 pl-1">
                <span
                  className={`w-5 text-center text-[15px] font-bold ${
                    rank === 1
                      ? 'text-[#cebdff]'
                      : isUser
                      ? 'text-[#e8ddff]'
                      : 'text-[#cac4d4]'
                  }`}
                >
                  {rank}
                </span>

                <div className="relative w-10 h-10 rounded-full bg-[#292a2d] shrink-0 overflow-hidden border border-[#343538] flex items-center justify-center">
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[12px] font-bold text-[#cac4d4]">
                      {member.initials}
                    </span>
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[14px] truncate ${
                        isUser
                          ? 'font-bold text-[#e3e2e6]'
                          : 'font-semibold text-[#e3e2e6]'
                      }`}
                    >
                      {member.name}
                    </span>
                    {member.tag && (
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-bold tracking-wider ${
                          member.tag === 'YOU'
                            ? 'bg-[#cebdff] text-[#381385]'
                            : 'bg-[#cebdff]/10 text-[#cebdff]'
                        }`}
                      >
                        {member.tag}
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] text-[#cac4d4]">
                    {member.questsCompleted} quests completed
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 pl-2">
                <span
                  className={`text-[14px] font-bold ${
                    isUser ? 'text-[#e8ddff]' : 'text-[#e3e2e6]'
                  }`}
                >
                  {displayXp.toLocaleString()}{' '}
                  <span className="text-[10px] font-normal text-[#cac4d4]">XP</span>
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[#4edea3] text-[14px]">
                    local_fire_department
                  </span>
                  <span className="text-[11px] font-semibold text-[#4edea3]">
                    {member.streak}d
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Floating Sticky Summary Bar */}
      <div className="sticky bottom-20 z-40 w-full mt-2">
        <div className="rounded-2xl bg-[#343538]/95 border border-[#494552]/70 backdrop-blur-xl p-2.5 pl-4 pr-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[13px] font-bold text-[#e3e2e6]">
                Rank #{userRankNumber} of {allRanked.length}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#00a572] text-[#002113] text-[10px] font-bold">
                Top 15%
              </span>
            </div>
            <p className="text-[11px] text-[#cac4d4] truncate mt-0.5">
              {xpGap > 0
                ? `${xpGap.toLocaleString()} XP behind #1 (${top1?.name || 'Leader'})`
                : 'Leading squad ranking!'}
            </p>
          </div>
          <button
            onClick={() => setIsCreateQuestOpen(true)}
            className="h-10 px-4 rounded-xl bg-[#cebdff] text-[#381385] text-[13px] font-bold flex items-center gap-1.5 shrink-0 shadow-md hover:bg-[#e8ddff] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Log Quest</span>
          </button>
        </div>
      </div>
    </div>
  );
};
