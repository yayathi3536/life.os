import React, { useState } from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const AddFriendModal: React.FC = () => {
  const {
    isAddFriendOpen,
    setIsAddFriendOpen,
    sendFriendRequest,
    friends,
    acceptFriendRequest,
    rejectFriendRequest,
    triggerToast,
  } = useLifeOS();

  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isAddFriendOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = sendFriendRequest(query);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setQuery('');
      setIsAddFriendOpen(false);
    }
  };

  const pendingIncoming = friends.filter((f) => f.status === 'pending_incoming');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={() => setIsAddFriendOpen(false)}
      ></div>

      <div className="relative w-full max-w-md bg-[#1f1f23] border border-[#343538] rounded-2xl p-5 shadow-2xl z-10 animate-scaleUp">
        <div className="flex items-center justify-between pb-3 border-b border-[#292a2d]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#cebdff] text-[20px]">
              person_add
            </span>
            <h2 className="text-[17px] font-bold text-[#e3e2e6]">
              Find & Invite Friends
            </h2>
          </div>
          <button
            onClick={() => setIsAddFriendOpen(false)}
            className="w-8 h-8 rounded-full bg-[#292a2d] hover:bg-[#343538] flex items-center justify-center text-[#cac4d4] hover:text-[#e3e2e6] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Search / Invite Form */}
        <form onSubmit={handleSend} className="flex flex-col gap-3.5 mt-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
              Friend Handle or Email
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="@username or friend@domain.com"
                required
                className="flex-1 h-10 px-3.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d] text-[#e3e2e6] placeholder:text-[#948e9d] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#cebdff]"
              />
              <button
                type="submit"
                className="px-4 h-10 rounded-xl bg-[#cebdff] text-[#381385] text-[13px] font-bold hover:bg-[#e8ddff] transition-all shrink-0 cursor-pointer"
              >
                Send Invite
              </button>
            </div>
            {errorMsg && (
              <span className="text-[12px] text-[#ffb4ab] mt-1">{errorMsg}</span>
            )}
          </div>
        </form>

        {/* Direct Link Share */}
        <div className="mt-4 p-3 rounded-xl bg-[#1b1b1f] border border-[#292a2d] flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#cac4d4] font-medium">Your Direct Sync Link</span>
            <span className="text-[#4edea3] font-semibold">+100 XP per join</span>
          </div>
          <div className="flex items-center justify-between p-2 pl-3 rounded-lg bg-[#0d0e11] border border-[#292a2d]">
            <span className="text-[12px] font-mono text-[#cebdff]">
              lifeos.app/squad/aurora
            </span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText('lifeos.app/squad/aurora');
                triggerToast('Copied link!');
              }}
              className="text-[11px] font-semibold text-[#e3e2e6] bg-[#292a2d] hover:bg-[#343538] px-2 py-1 rounded transition-colors"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Incoming Friend Requests */}
        {pendingIncoming.length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#cac4d4] font-bold">
              Pending Invites ({pendingIncoming.length})
            </span>
            {pendingIncoming.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#1b1b1f] border border-[#292a2d]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#a78bfa] text-[#21005e] font-bold text-[11px] flex items-center justify-center">
                    {p.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-[#e3e2e6]">
                      {p.name}
                    </span>
                    <span className="text-[11px] text-[#cac4d4]">{p.handle}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => acceptFriendRequest(p.id)}
                    className="px-2.5 py-1 rounded-lg bg-[#4edea3] text-[#003824] text-[11px] font-bold"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => rejectFriendRequest(p.id)}
                    className="px-2 py-1 rounded-lg bg-[#292a2d] text-[#cac4d4] text-[11px] hover:text-[#ffb4ab]"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
