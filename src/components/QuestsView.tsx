import React, { useState } from 'react';
import { useLifeOS } from '../context/LifeOSContext';
import { QuestCategory } from '../types';

export const QuestsView: React.FC = () => {
  const {
    quests,
    toggleQuestCompletion,
    deleteQuest,
    openEditQuest,
    setIsCreateQuestOpen,
  } = useLifeOS();

  // Status Filter: 'all' | 'today' | 'upcoming' | 'completed'
  const [statusFilter, setStatusFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  // Category Filter: 'all' | QuestCategory
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: 'All Categories' },
    { key: 'Learning', label: 'Learning' },
    { key: 'Fitness', label: 'Fitness' },
    { key: 'Discipline', label: 'Discipline' },
    { key: 'Creativity', label: 'Creativity' },
    { key: 'Social', label: 'Social' },
    { key: 'Personal', label: 'Personal' },
  ];

  // Filter calculations
  const filteredQuests = quests.filter((q) => {
    // Status
    if (statusFilter === 'completed' && !q.isCompleted) return false;
    if (statusFilter === 'upcoming' && q.isCompleted) return false;
    // Category
    if (categoryFilter !== 'all' && q.category.toLowerCase() !== categoryFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  // Dynamic counts for status tabs
  const allCount = quests.length;
  const todayCount = quests.filter((q) => q.recurrence === 'Daily' || !q.isCompleted).length;
  const upcomingCount = quests.filter((q) => !q.isCompleted).length;
  const completedCount = quests.filter((q) => q.isCompleted).length;

  // Total XP pool of remaining incomplete quests
  const remainingXpPool = quests
    .filter((q) => !q.isCompleted)
    .reduce((acc, curr) => acc + curr.xpReward, 0);

  return (
    <div className="flex flex-col w-full pb-8 gap-4 animate-fadeIn">
      {/* 1. Header / Action Bar */}
      <div className="flex items-start justify-between gap-3 pt-2 mb-1">
        <div className="flex flex-col min-w-0">
          <h1 className="text-[26px] sm:text-[30px] font-bold text-[#e3e2e6] tracking-tight leading-tight">
            Your quests
          </h1>
          <p className="text-[13px] text-[#cac4d4] mt-0.5">
            Focus on what matters most today.
          </p>
        </div>
        <button
          onClick={() => setIsCreateQuestOpen(true)}
          className="shrink-0 flex items-center gap-1.5 h-10 px-4 rounded-xl bg-[#a78bfa] text-[#21005e] font-semibold text-[14px] shadow-md hover:bg-[#cebdff] active:scale-95 transition-all duration-150 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Create Quest</span>
        </button>
      </div>

      {/* 2. Status Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#1b1b1f] border border-[#292a2d] rounded-xl overflow-x-auto no-scrollbar">
        <button
          onClick={() => setStatusFilter('all')}
          className={`flex-1 min-w-[70px] py-1.5 px-3 rounded-lg text-[12px] text-center transition-colors font-medium cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-[#a78bfa] text-[#21005e] font-semibold shadow-sm'
              : 'text-[#cac4d4] hover:text-[#e3e2e6]'
          }`}
        >
          All ({allCount})
        </button>
        <button
          onClick={() => setStatusFilter('today')}
          className={`flex-1 min-w-[70px] py-1.5 px-3 rounded-lg text-[12px] text-center transition-colors font-medium cursor-pointer ${
            statusFilter === 'today'
              ? 'bg-[#a78bfa] text-[#21005e] font-semibold shadow-sm'
              : 'text-[#cac4d4] hover:text-[#e3e2e6]'
          }`}
        >
          Today ({todayCount})
        </button>
        <button
          onClick={() => setStatusFilter('upcoming')}
          className={`flex-1 min-w-[78px] py-1.5 px-3 rounded-lg text-[12px] text-center transition-colors font-medium cursor-pointer ${
            statusFilter === 'upcoming'
              ? 'bg-[#a78bfa] text-[#21005e] font-semibold shadow-sm'
              : 'text-[#cac4d4] hover:text-[#e3e2e6]'
          }`}
        >
          Upcoming ({upcomingCount})
        </button>
        <button
          onClick={() => setStatusFilter('completed')}
          className={`flex-1 min-w-[86px] py-1.5 px-3 rounded-lg text-[12px] text-center transition-colors font-medium cursor-pointer ${
            statusFilter === 'completed'
              ? 'bg-[#a78bfa] text-[#21005e] font-semibold shadow-sm'
              : 'text-[#cac4d4] hover:text-[#e3e2e6]'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* 3. Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = categoryFilter.toLowerCase() === cat.key.toLowerCase();
          return (
            <button
              key={cat.key}
              onClick={() => setCategoryFilter(cat.key)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#343538] text-[#e3e2e6] border border-[#cebdff]/40 shadow-sm'
                  : 'bg-[#1b1b1f] border border-[#292a2d] text-[#cac4d4] hover:text-[#e3e2e6] hover:bg-[#1f1f23]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 4. Focus Rhythm Meter (Delight Widget) */}
      <div className="p-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-[#292a2d] text-[#cebdff]">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-[#cac4d4] font-medium">Daily Cadence</span>
            <span className="text-[14px] text-[#e3e2e6] font-semibold">
              {completedCount} of {allCount} Milestones Ready
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/20">
          <span className="material-symbols-outlined text-[15px]">trending_up</span>
          <span className="text-[12px] font-semibold">+{remainingXpPool} XP pool</span>
        </div>
      </div>

      {/* 5. Interactive Quest List */}
      <div className="flex flex-col gap-2.5" id="quest-list">
        {filteredQuests.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center p-4 rounded-xl bg-[#1f1f23] border border-[#292a2d]">
            <span className="material-symbols-outlined text-[#948e9d] text-[36px] mb-2">
              task_alt
            </span>
            <span className="text-[15px] font-semibold text-[#e3e2e6]">
              No quests match this filter
            </span>
            <p className="text-[13px] text-[#cac4d4] mt-1 max-w-xs">
              Try switching your category or create a new daily quest.
            </p>
            <button
              onClick={() => setIsCreateQuestOpen(true)}
              className="mt-4 px-4 py-2 rounded-xl bg-[#a78bfa] text-[#21005e] text-[13px] font-semibold hover:bg-[#cebdff] transition-colors"
            >
              + Create New Quest
            </button>
          </div>
        ) : (
          filteredQuests.map((quest) => {
            const isDone = quest.isCompleted;
            const diffColor =
              quest.difficulty === 'Hard'
                ? 'bg-[#93000a]/30 text-[#ffb4ab]'
                : quest.difficulty === 'Medium'
                ? 'bg-[#af9e00]/25 text-[#f8e454]'
                : 'bg-[#4edea3]/20 text-[#4edea3]';

            const diffDotColor =
              quest.difficulty === 'Hard'
                ? 'bg-[#ffb4ab]'
                : quest.difficulty === 'Medium'
                ? 'bg-[#dbc839]'
                : 'bg-[#4edea3]';

            return (
              <div
                key={quest.id}
                className={`quest-item group p-4 rounded-xl border transition-all duration-200 shadow-sm ${
                  isDone
                    ? 'bg-[#0d0e11]/80 border-[#292a2d]/50 opacity-75'
                    : 'bg-[#1b1b1f] border-[#292a2d] hover:bg-[#1f1f23]'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Completion Toggle Button */}
                  <button
                    onClick={() => toggleQuestCompletion(quest.id)}
                    aria-label="Toggle quest completion"
                    className={`quest-toggle shrink-0 w-6 h-6 mt-0.5 rounded-lg flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer ${
                      isDone
                        ? 'bg-[#4edea3] text-[#003824]'
                        : 'bg-[#292a2d] text-transparent hover:bg-[#343538]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] font-bold">
                      check
                    </span>
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        onClick={() => toggleQuestCompletion(quest.id)}
                        className={`text-[14px] font-semibold cursor-pointer ${
                          isDone ? 'line-through text-[#cac4d4]' : 'text-[#e3e2e6]'
                        }`}
                      >
                        {quest.title}
                      </span>
                      <span className="shrink-0 px-2 py-0.5 rounded text-[11px] font-bold bg-[#cebdff]/10 text-[#cebdff] border border-[#cebdff]/20">
                        +{quest.xpReward} XP
                      </span>
                    </div>

                    {quest.description && (
                      <p className="text-[13px] text-[#cac4d4] line-clamp-1 mb-2">
                        {quest.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#292a2d] text-[#cac4d4]">
                        {quest.category}
                      </span>
                      <span
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${diffColor}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${diffDotColor}`}></span>
                        {quest.difficulty}
                      </span>

                      {quest.subtasks && quest.subtasks.length > 0 && (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#343538] text-[#cebdff]">
                          <span className="material-symbols-outlined text-[13px]">tune</span>
                          <span className="text-[11px] font-medium">
                            {quest.subtasks.filter((s) => s.isDone).length}/
                            {quest.subtasks.length} subtasks
                          </span>
                        </div>
                      )}

                      {isDone ? (
                        <span className="text-[11px] text-[#4edea3] font-medium ml-auto flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            verified
                          </span>
                          Completed {quest.completedAt || 'Today'}
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#cac4d4] flex items-center gap-1 ml-auto">
                          <span className="material-symbols-outlined text-[14px]">
                            schedule
                          </span>
                          {quest.scheduledTime || quest.recurrence}
                        </span>
                      )}

                      {/* Edit action button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditQuest(quest);
                        }}
                        className="opacity-0 group-hover:opacity-100 hover:text-[#cebdff] text-[#948e9d] transition-all p-1 cursor-pointer"
                        title="Edit quest"
                      >
                        <span className="material-symbols-outlined text-[15px]">edit</span>
                      </button>

                      {/* Delete action option */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteQuest(quest.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] text-[#948e9d] transition-all p-1 -mr-1 cursor-pointer"
                        title="Delete quest"
                      >
                        <span className="material-symbols-outlined text-[15px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 6. Deliberate Visual Asset Card (Focus Environment) */}
      <div className="relative mt-2 rounded-2xl overflow-hidden p-5 bg-[#1b1b1f] border border-[#292a2d] shadow-sm">
        <div className="relative z-10 flex flex-col gap-2 max-w-[280px]">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#cebdff]/10 text-[#cebdff] border border-[#cebdff]/20 w-fit">
            <span className="material-symbols-outlined text-[14px]">neurology</span>
            <span className="text-[11px] font-semibold">Protocol Insight</span>
          </div>
          <h3 className="text-[16px] font-bold text-[#e3e2e6] tracking-tight">
            Flow State Preservation
          </h3>
          <p className="text-[13px] text-[#cac4d4] leading-relaxed">
            Batch high-cognitive load quests before 13:00 to maximize neural recovery cycles.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-36 pointer-events-none opacity-25 flex items-center justify-center">
          <svg className="w-full h-full text-[#cebdff]" fill="none" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeDasharray="4 6"
              strokeWidth="1.5"
            ></circle>
            <circle cx="80" cy="80" r="46" stroke="currentColor" strokeWidth="1"></circle>
            <circle
              cx="80"
              cy="80"
              fill="currentColor"
              fillOpacity="0.15"
              r="22"
            ></circle>
          </svg>
        </div>
      </div>
    </div>
  );
};
