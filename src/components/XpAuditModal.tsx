import React from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const XpAuditModal: React.FC = () => {
  const { isXpAuditOpen, setIsXpAuditOpen, xpLedger, user } = useLifeOS();

  if (!isXpAuditOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={() => setIsXpAuditOpen(false)}
      ></div>

      <div className="relative w-full max-w-lg bg-[#1f1f23] border border-[#343538] rounded-2xl p-5 shadow-2xl z-10 max-h-[85vh] flex flex-col gap-3.5 animate-scaleUp">
        <div className="flex items-center justify-between pb-3 border-b border-[#292a2d]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#cebdff] text-[20px]">
              receipt_long
            </span>
            <div>
              <h2 className="text-[17px] font-bold text-[#e3e2e6]">
                XP Audit & Transaction Ledger
              </h2>
              <span className="text-[11px] text-[#cac4d4]">
                Auditable, immutable ledger preventing duplicate quest rewards
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsXpAuditOpen(false)}
            className="w-8 h-8 rounded-full bg-[#292a2d] hover:bg-[#343538] flex items-center justify-center text-[#cac4d4] hover:text-[#e3e2e6] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Ledger Summary Stats */}
        <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#1b1b1f] border border-[#292a2d]">
          <div>
            <span className="text-[10px] text-[#cac4d4] uppercase font-semibold">
              Audited Balance
            </span>
            <div className="text-[18px] font-bold text-[#cebdff] tracking-tight">
              {user.totalXp.toLocaleString()} XP
            </div>
          </div>
          <div>
            <span className="text-[10px] text-[#cac4d4] uppercase font-semibold">
              Recorded Operations
            </span>
            <div className="text-[18px] font-bold text-[#4edea3] tracking-tight">
              {xpLedger.length} Records
            </div>
          </div>
        </div>

        {/* Transaction History List */}
        <div className="flex flex-col gap-2 overflow-y-auto pr-1 max-h-[50vh]">
          {xpLedger.map((tx) => {
            const isPositive = tx.amount >= 0;
            return (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#1b1b1f] border border-[#292a2d] hover:border-[#343538] transition-colors"
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-[13px] font-semibold text-[#e3e2e6] truncate">
                    {tx.reason}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#cac4d4]">
                    <span className="font-mono text-[10px] text-[#948e9d]">{tx.id}</span>
                    <span>•</span>
                    <span>{new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {tx.category && (
                      <>
                        <span>•</span>
                        <span className="text-[#cebdff]">{tx.category}</span>
                      </>
                    )}
                  </div>
                </div>

                <div
                  className={`text-[14px] font-bold shrink-0 ${
                    isPositive ? 'text-[#4edea3]' : 'text-[#ffb4ab]'
                  }`}
                >
                  {isPositive ? `+${tx.amount}` : tx.amount} XP
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-[#292a2d] flex justify-end">
          <button
            onClick={() => setIsXpAuditOpen(false)}
            className="px-4 py-2 rounded-xl bg-[#292a2d] hover:bg-[#343538] text-[#e3e2e6] text-[13px] font-semibold transition-colors"
          >
            Close Audit Log
          </button>
        </div>
      </div>
    </div>
  );
};
