import React, { useState } from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const EditProfileModal: React.FC = () => {
  const { isEditProfileOpen, setIsEditProfileOpen, user, updateProfile } = useLifeOS();

  const [name, setName] = useState(user.name);
  const [handle, setHandle] = useState(user.handle);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [tierName, setTierName] = useState(user.tierName);

  if (!isEditProfileOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || user.name,
      handle: handle.trim() || user.handle,
      avatarUrl: avatarUrl.trim() || user.avatarUrl,
      tierName: tierName.trim() || user.tierName,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={() => setIsEditProfileOpen(false)}
      ></div>

      <div className="relative w-full max-w-md bg-[#1f1f23] border border-[#343538] rounded-2xl p-5 shadow-2xl z-10 animate-scaleUp">
        <div className="flex items-center justify-between pb-3 border-b border-[#292a2d]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#cebdff] text-[20px]">
              tune
            </span>
            <h2 className="text-[17px] font-bold text-[#e3e2e6]">
              Edit Operator Profile
            </h2>
          </div>
          <button
            onClick={() => setIsEditProfileOpen(false)}
            className="w-8 h-8 rounded-full bg-[#292a2d] hover:bg-[#343538] flex items-center justify-center text-[#cac4d4] hover:text-[#e3e2e6] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-10 px-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#cebdff]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              System Handle
            </label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              required
              className="w-full h-10 px-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#cebdff]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Class / Archetype
            </label>
            <input
              type="text"
              value={tierName}
              onChange={(e) => setTierName(e.target.value)}
              placeholder="e.g. Architect, Strategist, Alchemist"
              className="w-full h-10 px-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#cebdff]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Avatar Image URL
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#cebdff]"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className="flex-1 h-10 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#cac4d4] hover:text-[#e3e2e6] text-[13px] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-10 rounded-xl bg-[#cebdff] text-[#381385] text-[13px] font-bold hover:bg-[#e8ddff] transition-all shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
