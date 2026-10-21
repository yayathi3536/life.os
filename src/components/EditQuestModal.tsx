import React, { useState, useEffect } from 'react';
import { useLifeOS } from '../context/LifeOSContext';
import { QuestCategory, QuestDifficulty, QuestRecurrence } from '../types';

export const EditQuestModal: React.FC = () => {
  const { isEditQuestOpen, setIsEditQuestOpen, editingQuest, updateQuest, deleteQuest } = useLifeOS();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<QuestCategory>('Fitness');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('Medium');
  const [recurrence, setRecurrence] = useState<QuestRecurrence>('Daily');
  const [scheduledTime, setScheduledTime] = useState('08:00 AM');

  useEffect(() => {
    if (editingQuest) {
      setTitle(editingQuest.title);
      setDescription(editingQuest.description || '');
      setCategory(editingQuest.category);
      setDifficulty(editingQuest.difficulty);
      setRecurrence(editingQuest.recurrence);
      setScheduledTime(editingQuest.scheduledTime || '08:00 AM');
    }
  }, [editingQuest]);

  if (!isEditQuestOpen || !editingQuest) return null;

  const xpRewards: Record<QuestDifficulty, number> = {
    Easy: 50,
    Medium: 100,
    Hard: 150,
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    updateQuest(editingQuest.id, {
      title: title.trim(),
      description: description.trim(),
      category,
      difficulty,
      xpReward: xpRewards[difficulty],
      recurrence,
      scheduledTime,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="absolute inset-0"
        onClick={() => setIsEditQuestOpen(false)}
      ></div>

      <div className="relative w-full max-w-lg bg-[#1f1f23] border border-[#343538] rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl transition-transform duration-300 flex flex-col gap-4 max-h-[85vh] overflow-y-auto pb-safe z-10 animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#292a2d]">
          <div className="flex flex-col">
            <h2 className="text-[18px] font-bold text-[#e3e2e6] tracking-tight">
              Edit Quest
            </h2>
            <span className="text-[12px] text-[#cac4d4]">
              Tune your active quest parameters
            </span>
          </div>
          <button
            onClick={() => setIsEditQuestOpen(false)}
            className="w-8 h-8 rounded-full bg-[#292a2d] hover:bg-[#343538] flex items-center justify-center text-[#cac4d4] hover:text-[#e3e2e6] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Quest Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full h-11 px-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#cebdff]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Description / Objective
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#cebdff] resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as QuestCategory)}
                className="w-full h-11 px-3.5 appearance-none rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#cebdff] pr-9 cursor-pointer"
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

          {/* Difficulty & Yield */}
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

          {/* Schedule */}
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
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                deleteQuest(editingQuest.id);
                setIsEditQuestOpen(false);
              }}
              className="px-3.5 h-11 rounded-xl bg-[#292a2d] border border-[#ffb4ab]/30 text-[#ffb4ab] hover:bg-[#ffb4ab]/10 text-[13px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>Delete</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditQuestOpen(false)}
              className="flex-1 h-11 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[13px] font-medium hover:bg-[#292a2d] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-[#cebdff] text-[#381385] text-[13px] font-bold hover:bg-[#e8ddff] shadow-lg active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">save</span>
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
