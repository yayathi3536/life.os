import React from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const LevelUpModal: React.FC = () => {
  const { showLevelUpModal, leveledUpTo, closeLevelUpModal, user } = useLifeOS();

  if (!showLevelUpModal || !leveledUpTo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-[#1f1f23] border border-[#a78bfa]/50 rounded-2xl p-6 shadow-[0_0_35px_rgba(167,139,250,0.35)] flex flex-col items-center text-center gap-4 animate-scaleUp">
        {/* Glowing Halo Icon */}
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#a78bfa] to-[#cebdff] p-0.5 shadow-[0_0_24px_rgba(206,189,255,0.6)] flex items-center justify-center">
          <div className="w-full h-full bg-[#121316] rounded-2xl flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-[#cebdff] text-[36px]">
              military_tech
            </span>
          </div>
          <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#4edea3] text-[#003824] text-[10px] font-bold">
            TIER UP
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-bold uppercase tracking-widest text-[#cebdff]">
            SYSTEM ASCENSION
          </span>
          <h2 className="text-[24px] font-bold text-[#e3e2e6] tracking-tight">
            Level {leveledUpTo} Achieved
          </h2>
          <p className="text-[13px] text-[#cac4d4]">
            Congratulations, <strong className="text-[#e3e2e6]">{user.name}</strong>. Your relentless consistency has unlocked the next tier baseline.
          </p>
        </div>

        {/* Perks Unlocked Card */}
        <div className="w-full p-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] flex flex-col gap-2 text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#948e9d]">
            Perks Activated
          </span>
          <div className="flex items-center gap-2 text-[12px] text-[#e3e2e6]">
            <span className="material-symbols-outlined text-[#4edea3] text-[16px]">
              check_circle
            </span>
            <span>+15% Squad XP Synergy Multiplier</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#e3e2e6]">
            <span className="material-symbols-outlined text-[#cebdff] text-[16px]">
              check_circle
            </span>
            <span>Unlocked "Master Architect" Cohort Status</span>
          </div>
        </div>

        <button
          onClick={closeLevelUpModal}
          className="w-full h-11 rounded-xl bg-gradient-to-r from-[#a78bfa] to-[#cebdff] text-[#21005e] font-bold text-[14px] shadow-lg hover:opacity-95 active:scale-95 transition-all cursor-pointer"
        >
          Claim Progression & Continue
        </button>
      </div>
    </div>
  );
};
