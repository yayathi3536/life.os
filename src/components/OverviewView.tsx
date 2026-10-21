import React from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const OverviewView: React.FC = () => {
  const {
    user,
    quests,
    toggleQuestCompletion,
    openEditQuest,
    weeklyActivity,
    challenges,
    achievements,
    setActiveTab,
    setIsCreateQuestOpen,
  } = useLifeOS();

  // Calculate dynamic stats
  const todayQuests = quests.slice(0, 4); // Featured for today on dashboard
  const completedTodayCount = todayQuests.filter((q) => q.isCompleted).length;
  const remainingCount = todayQuests.length - completedTodayCount;
  const percentDone = Math.round((completedTodayCount / (todayQuests.length || 1)) * 100);

  // Progression math
  const progressPercent = Math.min(
    100,
    Math.round((user.currentTierXp / (user.nextTierXp || 1)) * 100)
  );

  // Featured squad challenge (e.g. Deep Work or first active gauntlet)
  const featuredChallenge = challenges[0];

  // Featured unlocked milestone
  const unlockedMilestone =
    achievements.find((a) => a.isUnlocked) || achievements[0];

  // Total weekly XP calculated from weekly activity
  const totalWeeklyXp = weeklyActivity.reduce((acc, curr) => acc + curr.xp, 0);

  return (
    <div className="flex flex-col w-full gap-6 select-none animate-fadeIn">
      {/* 1. Top Greeting & Context */}
      <section className="flex flex-col gap-1.5 pt-1">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-[#292a2d]/70 backdrop-blur-md border border-[#494552]/40 shadow-sm">
          <span className="material-symbols-outlined text-[#cebdff] text-[14px]">
            calendar_today
          </span>
          <span className="text-[11px] text-[#cac4d4] font-medium tracking-wide">
            Wednesday, October 24
          </span>
        </div>

        <div className="flex items-baseline justify-between mt-1">
          <div>
            <h1 className="text-[26px] sm:text-[30px] font-bold text-[#e3e2e6] tracking-tight leading-tight">
              Make today count.
            </h1>
            <p className="text-[14px] text-[#cac4d4] mt-0.5">
              Small steps. Real progress.
            </p>
          </div>

          <div
            onClick={() => setIsCreateQuestOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#292a2d] border border-[#494552]/40 text-[#e8ddff] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Quick Add Action"
          >
            <span className="material-symbols-outlined text-[20px]">bolt</span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4edea3]"></span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Player Progression Architecture Card */}
      <section className="relative overflow-hidden rounded-2xl bg-[#1f1f23] border border-[#343538]/70 p-4 sm:p-5 shadow-lg">
        {/* Subtle Lavender & Mint Ambient Glows */}
        <div className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#a78bfa]/10 blur-3xl"></div>
        <div className="pointer-events-none absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-[#00a572]/10 blur-3xl"></div>

        <div className="relative flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[#cebdff] font-bold px-2 py-0.5 rounded bg-[#a78bfa]/20 border border-[#a78bfa]/30">
                Level {user.level}
              </span>
              <span className="text-[#cac4d4]">•</span>
              <span className="text-[14px] font-semibold text-[#e3e2e6] tracking-tight">
                {user.tierName}
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/20">
              <span className="material-symbols-outlined text-[#4edea3] text-[14px]">
                auto_awesome
              </span>
              <span className="text-[11px] font-semibold text-[#4edea3]">
                {user.multiplier}x Active
              </span>
            </div>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[30px] font-bold text-[#e3e2e6] tracking-tight">
                {user.totalXp.toLocaleString()}
              </span>
              <span className="text-[11px] font-semibold text-[#cac4d4] uppercase tracking-wider">
                TOTAL XP
              </span>
            </div>
            <div className="text-[12px] text-[#cac4d4] text-right font-medium">
              <span className="text-[#e3e2e6] font-bold">
                {user.currentTierXp.toLocaleString()}
              </span>{' '}
              / {user.nextTierXp.toLocaleString()} XP
            </div>
          </div>

          {/* Linear Micro Progress Track */}
          <div className="w-full bg-[#0d0e11] h-2.5 rounded-full overflow-hidden flex relative p-0.5 border border-[#343538]/50">
            <div
              className="h-full bg-gradient-to-r from-[#a78bfa] to-[#cebdff] rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(167,139,250,0.6)]"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[#cac4d4] text-[11px] pt-0.5 font-medium">
            <span className="text-[#cac4d4]/80">Tier {user.level} Baseline</span>
            <span className="text-[#cebdff] font-bold">
              {progressPercent}% to Level {user.level + 1}
            </span>
          </div>
        </div>
      </section>

      {/* 3. 3-Column Metrics Row */}
      <section className="grid grid-cols-3 gap-2.5">
        {/* Metric 1: Daily Quests */}
        <div
          onClick={() => setActiveTab('quests')}
          className="flex flex-col justify-between p-3 rounded-xl bg-[#1f1f23] border border-[#343538]/60 shadow-sm min-w-0 cursor-pointer hover:border-[#a78bfa]/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#cac4d4] font-semibold uppercase tracking-wider truncate">
              Daily Quests
            </span>
            <div className="relative w-4 h-4 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 24 24">
                <circle
                  className="text-[#292a2d]"
                  cx="12"
                  cy="12"
                  fill="transparent"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="3"
                ></circle>
                <circle
                  className="text-[#cebdff] transition-all duration-500"
                  cx="12"
                  cy="12"
                  fill="transparent"
                  r="9"
                  stroke="currentColor"
                  strokeDasharray="56.5"
                  strokeDashoffset={56.5 - (56.5 * percentDone) / 100}
                  strokeLinecap="round"
                  strokeWidth="3"
                ></circle>
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-[16px] text-[#e3e2e6] font-bold tracking-tight block">
              {completedTodayCount} / {todayQuests.length}
            </span>
            <span className="block text-[10px] text-[#cac4d4] truncate">
              {percentDone}% Done
            </span>
          </div>
        </div>

        {/* Metric 2: Current Streak */}
        <div
          onClick={() => setActiveTab('profile')}
          className="flex flex-col justify-between p-3 rounded-xl bg-[#1f1f23] border border-[#343538]/60 shadow-sm min-w-0 cursor-pointer hover:border-[#4edea3]/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#cac4d4] font-semibold uppercase tracking-wider truncate">
              Active Chain
            </span>
            <span className="material-symbols-outlined text-[#4edea3] text-[16px]">
              local_fire_department
            </span>
          </div>
          <div className="mt-2">
            <span className="text-[16px] text-[#4edea3] font-bold tracking-tight block">
              {user.activeStreak} Days
            </span>
            <span className="block text-[10px] text-[#cac4d4] truncate">
              Record Match
            </span>
          </div>
        </div>

        {/* Metric 3: Weekly XP */}
        <div
          onClick={() => setActiveTab('leaderboard')}
          className="flex flex-col justify-between p-3 rounded-xl bg-[#1f1f23] border border-[#343538]/60 shadow-sm min-w-0 cursor-pointer hover:border-[#a78bfa]/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#cac4d4] font-semibold uppercase tracking-wider truncate">
              Weekly XP
            </span>
            <span className="material-symbols-outlined text-[#cebdff] text-[15px]">
              trending_up
            </span>
          </div>
          <div className="mt-2">
            <span className="text-[16px] text-[#e3e2e6] font-bold tracking-tight block">
              +{totalWeeklyXp.toLocaleString()}
            </span>
            <span className="block text-[10px] text-[#4edea3] font-semibold">
              +18% pace
            </span>
          </div>
        </div>
      </section>

      {/* 4. Today's Quests Module */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] font-bold text-[#e3e2e6] tracking-tight">
              Today's Quests
            </h2>
            <span className="flex items-center justify-center px-2 py-0.5 rounded-full bg-[#292a2d] text-[#cac4d4] text-[10px] font-semibold">
              {remainingCount} left
            </span>
          </div>
          <button
            onClick={() => setIsCreateQuestOpen(true)}
            className="flex items-center gap-1 text-[12px] font-semibold text-[#cebdff] hover:text-[#e8ddff] transition-colors cursor-pointer active:scale-95 duration-150"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add Quest</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {todayQuests.map((quest) => {
            const isDone = quest.isCompleted;
            const diffColor =
              quest.difficulty === 'Hard'
                ? 'text-[#ffb4ab]'
                : quest.difficulty === 'Medium'
                ? 'text-[#dbc839]'
                : 'text-[#4edea3]';

            const catBadgeClass =
              quest.category === 'Discipline'
                ? 'bg-[#a78bfa]/20 text-[#cebdff]'
                : quest.category === 'Fitness'
                ? 'bg-[#00a572]/20 text-[#4edea3]'
                : 'bg-[#292a2d] text-[#cac4d4]';

            return (
              <div
                key={quest.id}
                className={`quest-item group flex items-start justify-between p-3.5 rounded-xl border transition-all duration-200 shadow-sm ${
                  isDone
                    ? 'bg-[#1b1b1f]/70 border-[#292a2d]/50 opacity-70'
                    : 'bg-[#1f1f23] border-[#343538]/60 hover:bg-[#292a2d]'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0 flex-1 pr-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleQuestCompletion(quest.id);
                    }}
                    className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded shrink-0 transition-colors cursor-pointer ${
                      isDone
                        ? 'bg-[#4edea3] text-[#003824]'
                        : 'bg-[#343538] text-transparent hover:bg-[#494552]'
                    }`}
                    aria-label={`Toggle ${quest.title}`}
                  >
                    <span className="material-symbols-outlined text-[14px] font-bold">
                      check
                    </span>
                  </button>

                  <div
                    onClick={() => openEditQuest(quest)}
                    className="flex flex-col min-w-0 flex-1 cursor-pointer"
                  >
                    <span
                      className={`text-[14px] font-semibold tracking-tight leading-snug line-clamp-1 hover:text-[#cebdff] transition-colors ${
                        isDone
                          ? 'line-through text-[#cac4d4]'
                          : 'text-[#e3e2e6]'
                      }`}
                    >
                      {quest.title}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${catBadgeClass}`}>
                        {quest.category}
                      </span>
                      <span className={`text-[10px] font-medium ${diffColor}`}>
                        {quest.difficulty}
                      </span>
                      <span className="text-[#494552] text-[10px]">•</span>
                      <span
                        className={`text-[10px] font-medium ${
                          isDone ? 'text-[#4edea3]' : 'text-[#cac4d4]'
                        }`}
                      >
                        +{quest.xpReward} XP
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => openEditQuest(quest)}
                  className="flex items-center cursor-pointer p-1 -mr-1"
                  title="Edit quest"
                >
                  {isDone ? (
                    <span className="material-symbols-outlined text-[#4edea3] text-[18px] shrink-0 mt-0.5">
                      verified
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[#948e9d] text-[18px] shrink-0 mt-0.5 group-hover:text-[#e3e2e6] transition-colors">
                      chevron_right
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Weekly Activity Visualization Minimalist Chart */}
      <section className="flex flex-col gap-3 p-4 rounded-2xl bg-[#1f1f23] border border-[#343538]/70 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#cebdff] text-[18px]">
              equalizer
            </span>
            <h3 className="text-[14px] font-bold text-[#e3e2e6] tracking-tight">
              Weekly Activity
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cebdff] animate-pulse"></span>
            <span className="text-[11px] text-[#cac4d4] font-medium">
              Daily Goal: 500 XP
            </span>
          </div>
        </div>

        {/* Minimal Modern CSS Column Bar Chart with Hairline Goal Baseline */}
        <div className="relative pt-4 pb-1">
          {/* Target Goal Baseline Line */}
          <div className="absolute inset-x-0 top-12 h-px bg-[#494552]/40 pointer-events-none flex items-center justify-end">
            <span className="text-[9px] text-[#948e9d] pr-1 -mt-3.5 tracking-wider font-mono">
              500 XP
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 items-end h-28 pt-4">
            {weeklyActivity.map((item, idx) => {
              const isToday = item.isToday;
              // Max height calculation based on 500 max goal
              const heightPercent = Math.min(100, Math.max(10, Math.round((item.xp / 500) * 100)));

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                  title={`${item.day}: ${item.xp} XP`}
                >
                  <div
                    className={`w-full max-w-[22px] rounded-t transition-all duration-300 ${
                      isToday
                        ? 'bg-gradient-to-t from-[#a78bfa] to-[#cebdff] shadow-[0_0_12px_rgba(167,139,250,0.6)]'
                        : 'bg-[#343538] group-hover:bg-[#cebdff]/40'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                  <span
                    className={`text-[10px] ${
                      isToday
                        ? 'text-[#cebdff] font-bold'
                        : 'text-[#cac4d4] font-medium'
                    }`}
                  >
                    {item.shortDay}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Squad Challenge Preview Card */}
      {featuredChallenge && (
        <section
          onClick={() => setActiveTab('challenges')}
          className="flex flex-col gap-3 p-4 rounded-2xl bg-[#1f1f23] border border-[#343538]/70 shadow-md cursor-pointer hover:border-[#cebdff]/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
                swords
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#cac4d4] font-semibold">
                {featuredChallenge.tag}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#343538] text-[#4edea3]">
              {featuredChallenge.daysTotal - featuredChallenge.daysElapsed} days left
            </span>
          </div>

          <div>
            <h3 className="text-[16px] font-bold text-[#e3e2e6] tracking-tight">
              {featuredChallenge.title}
            </h3>
            <p className="text-[13px] text-[#cac4d4] mt-0.5">
              {featuredChallenge.description}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#cac4d4]">Squad Collective Sync</span>
              <span className="text-[#e3e2e6] font-semibold">
                {Math.round((featuredChallenge.currentProgress / featuredChallenge.totalTarget) * 100)}%
              </span>
            </div>
            <div className="w-full bg-[#0d0e11] h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00a572] to-[#4edea3] rounded-full"
                style={{
                  width: `${Math.round(
                    (featuredChallenge.currentProgress / featuredChallenge.totalTarget) * 100
                  )}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            {/* Minimalist geometric participant avatars */}
            <div className="flex items-center -space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#343538] border border-[#1f1f23] flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[#cebdff] text-[14px]">
                  psychology
                </span>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#a78bfa] border border-[#1f1f23] flex items-center justify-center text-[#3c1989] text-[10px] font-bold shadow-sm">
                RK
              </div>
              <div className="w-7 h-7 rounded-full bg-[#00a572] border border-[#1f1f23] flex items-center justify-center text-[#00311f] text-[10px] font-bold shadow-sm">
                AL
              </div>
              <div className="w-7 h-7 rounded-full bg-[#292a2d] border border-[#1f1f23] flex items-center justify-center text-[9px] text-[#cac4d4] font-semibold shadow-sm">
                +{featuredChallenge.participants.length}
              </div>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#343538]">
              <span className="material-symbols-outlined text-[#dbc839] text-[14px]">
                military_tech
              </span>
              <span className="text-[12px] text-[#e3e2e6] font-semibold">
                Rank #{featuredChallenge.userRank || 2}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 7. Recent Milestone Card */}
      {unlockedMilestone && (
        <section
          onClick={() => setActiveTab('achievements')}
          className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#292a2d]/80 border border-[#343538] shadow-md cursor-pointer hover:border-[#a78bfa]/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0d0e11] border border-[#343538] flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[#cebdff] text-[22px]">
              workspace_premium
            </span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#cebdff] font-bold">
                Milestone Unlocked
              </span>
            </div>
            <span className="text-[14px] text-[#e3e2e6] font-semibold tracking-tight truncate">
              {unlockedMilestone.title}
            </span>
            <span className="text-[13px] text-[#cac4d4] truncate">
              {unlockedMilestone.description}
            </span>
          </div>
          <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
            verified
          </span>
        </section>
      )}
    </div>
  );
};
