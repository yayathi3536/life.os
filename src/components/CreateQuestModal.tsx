import React, { useState } from 'react';
import { useLifeOS } from '../context/LifeOSContext';
import { QuestCategory, QuestDifficulty, QuestRecurrence } from '../types';

export const CreateQuestModal: React.FC = () => {
  const { isCreateQuestOpen, setIsCreateQuestOpen, createQuest } = useLifeOS();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<QuestCategory>('Fitness');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('Medium');
  const [recurrence, setRecurrence] = useState<QuestRecurrence>('Daily');
  const [scheduledTime, setScheduledTime] = useState('08:00 AM');

  if (!isCreateQuestOpen) return null;

  const xpRewards: Record<QuestDifficulty, number> = {
    Easy: 50,
    Medium: 100,
    Hard: 150,
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createQuest({
      title: title.trim(),
      category,
      difficulty,
      xpReward: xpRewards[difficulty],
      recurrence,
      scheduledTime,
    });

    setTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Background click to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setIsCreateQuestOpen(false)}
      ></div>

      <div className="relative w-full max-w-lg bg-[#1f1f23] border-t border-x border-[#343538] rounded-t-3xl p-5 shadow-2xl transition-transform duration-300 flex flex-col gap-4 max-h-[85vh] overflow-y-auto pb-safe z-10 animate-slideUp">
        {/* Drawer handle & Title */}
        <div className="flex flex-col gap-1.5">
          <div className="w-12 h-1 bg-[#343538] rounded-full mx-auto"></div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <h2 className="text-[18px] font-bold text-[#e3e2e6] tracking-tight">
                New Quest
              </h2>
              <span className="text-[12px] text-[#cac4d4]">
                Configure your active protocol
              </span>
            </div>
            <button
              onClick={() => setIsCreateQuestOpen(false)}
              className="w-8 h-8 rounded-full bg-[#292a2d] hover:bg-[#343538] flex items-center justify-center text-[#cac4d4] hover:text-[#e3e2e6] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {/* Field 1: Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Quest Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., 5km Tempo Run or Systems Review"
              required
              className="w-full h-11 px-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] placeholder:text-[#948e9d] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#cebdff] shadow-inner"
            />
          </div>

          {/* Field 2: Category Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as QuestCategory)}
                className="w-full h-11 px-3.5 appearance-none rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#cebdff] pr-9 shadow-inner cursor-pointer"
              >
                <option value="Discipline">Discipline</option>
                <option value="Fitness">Fitness</option>
                <option value="Learning">Learning</option>
                <option value="Creativity">Creativity</option>
                <option value="Social">Social</option>
                <option value="Personal">Personal</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#cac4d4] pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Field 3: Difficulty & Yield Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Difficulty & Yield
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDifficulty('Easy')}
                className={`py-2.5 px-2 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all text-center cursor-pointer ${
                  difficulty === 'Easy'
                    ? 'bg-[#292a2d] border-[#4edea3]/50 text-[#4edea3] ring-1 ring-[#4edea3]/40'
                    : 'bg-[#1b1b1f] border-[#292a2d] text-[#cac4d4] hover:text-[#e3e2e6]'
                }`}
              >
                <span className="text-[13px] font-bold">Easy</span>
                <span className="text-[11px] text-[#4edea3] font-semibold">+50 XP</span>
              </button>

              <button
                type="button"
                onClick={() => setDifficulty('Medium')}
                className={`py-2.5 px-2 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all text-center cursor-pointer ${
                  difficulty === 'Medium'
                    ? 'bg-[#292a2d] border-[#cebdff]/50 text-[#cebdff] ring-1 ring-[#cebdff]/40'
                    : 'bg-[#1b1b1f] border-[#292a2d] text-[#cac4d4] hover:text-[#e3e2e6]'
                }`}
              >
                <span className="text-[13px] font-bold">Medium</span>
                <span className="text-[11px] text-[#cebdff] font-semibold">+100 XP</span>
              </button>

              <button
                type="button"
                onClick={() => setDifficulty('Hard')}
                className={`py-2.5 px-2 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all text-center cursor-pointer ${
                  difficulty === 'Hard'
                    ? 'bg-[#292a2d] border-[#ffb4ab]/50 text-[#ffb4ab] ring-1 ring-[#ffb4ab]/40'
                    : 'bg-[#1b1b1f] border-[#292a2d] text-[#cac4d4] hover:text-[#e3e2e6]'
                }`}
              >
                <span className="text-[13px] font-bold">Hard</span>
                <span className="text-[11px] text-[#ffb4ab] font-semibold">+150 XP</span>
              </button>
            </div>
          </div>

          {/* Field 4: Recurrence Schedule */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Recurrence Schedule
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Daily', 'Mon/Wed/Fri', 'Once'] as QuestRecurrence[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRecurrence(r)}
                  className={`py-2 px-3 rounded-xl border text-[12px] font-semibold text-center transition-all cursor-pointer ${
                    recurrence === r
                      ? 'bg-[#292a2d] border-[#cebdff]/40 text-[#e8ddff] ring-1 ring-[#cebdff]/30'
                      : 'bg-[#1b1b1f] border-[#292a2d] text-[#cac4d4] hover:text-[#e3e2e6]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCreateQuestOpen(false)}
              className="flex-1 h-11 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[14px] font-medium hover:bg-[#292a2d] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-[#a78bfa] text-[#21005e] text-[14px] font-bold hover:bg-[#cebdff] shadow-lg active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>Save Quest</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
