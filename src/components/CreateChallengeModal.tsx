import React, { useState } from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const CreateChallengeModal: React.FC = () => {
  const { isCreateChallengeOpen, setIsCreateChallengeOpen, createChallenge } = useLifeOS();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('Squad Sprint');
  const [type, setType] = useState<'gauntlet' | 'collective' | 'habit'>('gauntlet');
  const [target, setTarget] = useState(30);
  const [unit, setUnit] = useState('days');
  const [xpReward, setXpReward] = useState(600);

  if (!isCreateChallengeOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createChallenge({
      title: title.trim(),
      description: description.trim() || 'Daily habit consistency sprint with the squad.',
      tag,
      type,
      totalTarget: Number(target) || 30,
      unit,
      xpReward: Number(xpReward) || 600,
      badgeName: `${title.split(' ')[0]} Master`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={() => setIsCreateChallengeOpen(false)}
      ></div>

      <div className="relative w-full max-w-md bg-[#1f1f23] border border-[#343538] rounded-2xl p-5 shadow-2xl z-10 animate-scaleUp">
        <div className="flex items-center justify-between pb-3 border-b border-[#292a2d]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px]">
              swords
            </span>
            <h2 className="text-[17px] font-bold text-[#e3e2e6]">
              New Squad Challenge
            </h2>
          </div>
          <button
            onClick={() => setIsCreateChallengeOpen(false)}
            className="w-8 h-8 rounded-full bg-[#292a2d] hover:bg-[#343538] flex items-center justify-center text-[#cac4d4] hover:text-[#e3e2e6] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Challenge Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., 21-Day Sunrise Running"
              required
              className="w-full h-10 px-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] placeholder:text-[#948e9d] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#cebdff]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Protocol Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Log at least 3km before 07:00 AM daily."
              className="w-full p-3 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] placeholder:text-[#948e9d] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#cebdff] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
                Target Count
              </label>
              <input
                type="number"
                min={1}
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full h-10 px-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#cebdff]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
                Metric Unit
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="days / hrs / km"
                className="w-full h-10 px-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#cebdff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
                XP Reward Pool
              </label>
              <input
                type="number"
                step={50}
                value={xpReward}
                onChange={(e) => setXpReward(Number(e.target.value))}
                className="w-full h-10 px-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#cebdff]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
                Tag
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#cebdff]"
              >
                <option value="Squad Sprint">Squad Sprint</option>
                <option value="Endurance Group">Endurance Group</option>
                <option value="Discipline Sprint">Discipline Sprint</option>
                <option value="Habit Gauntlet">Habit Gauntlet</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreateChallengeOpen(false)}
              className="flex-1 h-10 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#cac4d4] hover:text-[#e3e2e6] text-[13px] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-10 rounded-xl bg-[#cebdff] text-[#381385] text-[13px] font-bold hover:bg-[#e8ddff] transition-all shadow-md"
            >
              Launch Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
