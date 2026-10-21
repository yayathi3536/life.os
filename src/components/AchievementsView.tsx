import React, { useState } from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const AchievementsView: React.FC = () => {
  const { achievements, user, setActiveTab } = useLifeOS();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'consistency', label: 'Consistency' },
    { key: 'learning', label: 'Learning' },
    { key: 'fitness', label: 'Fitness' },
    { key: 'growth', label: 'Personal Growth' },
  ];

  const filtered = achievements.filter((ach) => {
    if (categoryFilter === 'all') return true;
    return ach.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const totalScoreXp = achievements
    .filter((a) => a.isUnlocked)
    .reduce((acc, curr) => acc + curr.xpReward, 3450); // baseline mastery points

  return (
    <div className="flex flex-col w-full pb-20 animate-fadeIn">
      {/* 1. Progress Overview Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1f1f23] border border-[#343538] p-4 sm:p-5 shadow-lg mb-4">
        <div className="relative z-10 flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#cebdff]">
                Mastery Record
              </span>
              <h2 className="text-[26px] font-bold text-[#e3e2e6] mt-0.5 tracking-tight">
                Milestones
              </h2>
              <p className="text-[13px] text-[#cac4d4] mt-0.5 leading-relaxed">
                Tangible markers of discipline, focus, and mastery.
              </p>
            </div>
            <div className="flex flex-col items-end bg-[#292a2d] border border-[#343538] px-3 py-1.5 rounded-xl shrink-0">
              <span className="text-[10px] text-[#cac4d4] uppercase font-semibold">
                Total Score
              </span>
              <span className="text-[16px] font-bold text-[#cebdff] tracking-tight">
                {totalScoreXp.toLocaleString()}{' '}
                <span className="text-[11px] text-[#cac4d4] font-normal">XP</span>
              </span>
            </div>
          </div>

          {/* Segmented Metric Row */}
          <div className="mt-4 pt-3 bg-[#1b1b1f] border border-[#292a2d] rounded-xl p-3.5">
            <div className="flex items-center justify-between text-[12px] mb-2 font-medium">
              <span className="text-[#e3e2e6]">
                {unlockedCount} of {achievements.length + 36} Unlocked
              </span>
              <span className="text-[#cebdff] font-bold">43%</span>
            </div>

            {/* Segmented Sleek Progress Bar */}
            <div className="h-1.5 w-full bg-[#343538] rounded-full overflow-hidden flex">
              <div
                className="h-full bg-[#cebdff] rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(206,189,255,0.45)]"
                style={{ width: '43%' }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 pt-2 text-center border-t border-[#292a2d]/60">
              <div className="flex flex-col">
                <span className="text-[11px] text-[#cac4d4]">Active Tier</span>
                <span className="text-[13px] font-bold text-[#e3e2e6]">Adept III</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#cac4d4]">In Flight</span>
                <span className="text-[13px] font-bold text-[#4edea3]">7 Goals</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#cac4d4]">Next Perk</span>
                <span className="text-[13px] font-bold text-[#dbc839]">5,000 XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-4 no-scrollbar">
        {categories.map((cat) => {
          const isActive = categoryFilter === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setCategoryFilter(cat.key)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#cebdff] text-[#381385] shadow-sm'
                  : 'bg-[#292a2d] text-[#cac4d4] hover:text-[#e3e2e6]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 3. Milestone Cards Stack */}
      <div className="flex flex-col gap-3">
        {filtered.map((item) => {
          const isUnlocked = item.isUnlocked;
          const isLocked = item.lockedReason;

          return (
            <div
              key={item.id}
              className={`group relative rounded-xl p-4 transition-all duration-200 border ${
                isUnlocked
                  ? 'bg-[#1f1f23] border-[#343538] hover:bg-[#292a2d]'
                  : isLocked
                  ? 'bg-[#0d0e11]/80 border-[#292a2d] opacity-75'
                  : 'bg-[#1b1b1f] border-[#292a2d] hover:bg-[#1f1f23]'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Badge Icon */}
                <div
                  className={`relative w-11 h-11 shrink-0 rounded-xl flex items-center justify-center border ${
                    isUnlocked
                      ? 'bg-[#343538] border-[#cebdff]/30 shadow-[0_0_12px_rgba(206,189,255,0.18)]'
                      : isLocked
                      ? 'bg-[#1f1f23] border-[#343538]'
                      : 'bg-[#292a2d] border-[#343538]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[22px] ${
                      isUnlocked
                        ? 'text-[#cebdff]'
                        : isLocked
                        ? 'text-[#948e9d]'
                        : 'text-[#cac4d4]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {isUnlocked && (
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#00a572] rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#00311f] text-[10px] font-bold">
                        check
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wide ${
                        isUnlocked
                          ? 'text-[#cebdff]'
                          : isLocked
                          ? 'text-[#948e9d]'
                          : 'text-[#cac4d4]'
                      }`}
                    >
                      {item.categoryLabel}
                    </span>
                    <span className="text-[11px] text-[#cac4d4]">
                      {isUnlocked
                        ? item.unlockedAt
                        : isLocked
                        ? 'Locked'
                        : `${Math.round((item.progress / item.target) * 100)}%`}
                    </span>
                  </div>

                  <h3
                    className={`text-[15px] font-bold mt-0.5 truncate ${
                      isUnlocked
                        ? 'text-[#e3e2e6]'
                        : isLocked
                        ? 'text-[#cac4d4]'
                        : 'text-[#e3e2e6]'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-[13px] mt-0.5 line-clamp-2 leading-relaxed ${
                      isLocked ? 'blur-[1.5px] select-none text-[#948e9d]' : 'text-[#cac4d4]'
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* Progress Bar for in-progress achievements */}
                  {!isUnlocked && !isLocked && (
                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] text-[#cac4d4] mb-1">
                        <span>Progress</span>
                        <span className="text-[#e3e2e6] font-medium">
                          {item.progress} / {item.target} {item.unit || ''}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-[#343538] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4edea3] rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.round((item.progress / item.target) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Footer status row */}
                  <div className="flex items-center justify-between mt-3 pt-1 border-t border-[#343538]/40">
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[13px]">
                          local_fire_department
                        </span>
                        Completed
                      </span>
                    ) : isLocked ? (
                      <span className="text-[11px] text-[#948e9d] font-medium">
                        {item.lockedReason}
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#cac4d4]">
                        {item.target - item.progress} remaining
                      </span>
                    )}

                    <span
                      className={`text-[12px] font-bold ${
                        isUnlocked
                          ? 'text-[#cebdff]'
                          : isLocked
                          ? 'text-[#948e9d]'
                          : 'text-[#cac4d4]'
                      }`}
                    >
                      +{item.xpReward.toLocaleString()} XP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Ambient Micro Quote for Stoic Tone */}
      <div className="mt-6 mb-2 p-4 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-center">
        <p className="text-[13px] text-[#cac4d4] italic">
          "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
        </p>
        <span className="text-[10px] text-[#948e9d] uppercase tracking-wider block mt-1.5 font-bold">
          — Will Durant
        </span>
      </div>
    </div>
  );
};
