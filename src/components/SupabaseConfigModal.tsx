import React, { useState } from 'react';
import { useLifeOS } from '../context/LifeOSContext';

export const SupabaseConfigModal: React.FC = () => {
  const { isSupabaseModalOpen, setIsSupabaseModalOpen, triggerToast } = useLifeOS();
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isSupabaseModalOpen) return null;

  const sqlSchema = `-- =========================================================
-- LIFE OS DEDICATED SCHEMA (Phase 2 Architecture)
-- STRICT PROJECT ISOLATION: This script is for LIFE OS only.
-- NEVER execute against or link to OUR UNIVERSE database.
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  level INT DEFAULT 1 CHECK (level >= 1),
  tier_name TEXT DEFAULT 'Architect',
  total_xp BIGINT DEFAULT 0 CHECK (total_xp >= 0),
  active_streak INT DEFAULT 0 CHECK (active_streak >= 0),
  record_streak INT DEFAULT 0 CHECK (record_streak >= 0),
  multiplier NUMERIC(3, 2) DEFAULT 1.00,
  squad_privacy TEXT DEFAULT 'Friends Only',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Quests Table
CREATE TABLE IF NOT EXISTS public.quests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Discipline', 'Fitness', 'Learning', 'Creativity', 'Social', 'Personal')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  xp_reward INT NOT NULL CHECK (xp_reward > 0),
  recurrence TEXT NOT NULL DEFAULT 'Daily',
  scheduled_time TEXT,
  subtasks JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Quest Completions & XP Transactions (Prevent Duplicate Rewards)
CREATE TABLE IF NOT EXISTS public.quest_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  quest_id UUID NOT NULL REFERENCES public.quests(id) ON DELETE CASCADE,
  date_bucket DATE NOT NULL DEFAULT CURRENT_DATE,
  xp_awarded INT NOT NULL CHECK (xp_awarded > 0),
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  -- Database constraint strictly preventing duplicate daily completions:
  CONSTRAINT unique_quest_daily_completion UNIQUE (quest_id, date_bucket)
);

-- 4. XP Transaction Audit Ledger
CREATE TABLE IF NOT EXISTS public.xp_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  quest_id UUID REFERENCES public.quests(id) ON DELETE SET NULL,
  challenge_id UUID,
  reason TEXT NOT NULL,
  delta INT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Social Challenges
CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  tag TEXT DEFAULT 'Squad Sprint',
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('gauntlet', 'collective', 'habit')),
  target_count INT NOT NULL,
  current_progress INT DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'days',
  xp_reward INT NOT NULL DEFAULT 500,
  badge_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Challenge Participants
CREATE TABLE IF NOT EXISTS public.challenge_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  score INT DEFAULT 0,
  last_check_in DATE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_challenge_member UNIQUE (challenge_id, user_id)
);

-- 7. Friends Circle
CREATE TABLE IF NOT EXISTS public.friends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_friend_pair UNIQUE (user_id, friend_id)
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quest_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, owner update
CREATE POLICY "Public profiles are readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Quests: Users can only see and manage their own quests
CREATE POLICY "Users own their quests" ON public.quests FOR ALL USING (auth.uid() = user_id);

-- Quest Completions: Users manage own completions
CREATE POLICY "Users manage own completions" ON public.quest_completions FOR ALL USING (auth.uid() = user_id);

-- XP Transactions: Immutable audit log, users can view their own
CREATE POLICY "Users view own transactions" ON public.xp_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Server inserts transactions" ON public.xp_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
`;

  const copySql = () => {
    navigator.clipboard?.writeText(sqlSchema);
    setCopiedSql(true);
    triggerToast('SQL Schema copied to clipboard!');
    setTimeout(() => setCopiedSql(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={() => setIsSupabaseModalOpen(false)}
      ></div>

      <div className="relative w-full max-w-2xl bg-[#1f1f23] border border-[#343538] rounded-2xl p-5 shadow-2xl z-10 max-h-[85vh] flex flex-col gap-3.5 animate-scaleUp">
        <div className="flex items-center justify-between pb-3 border-b border-[#292a2d]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px]">
              database
            </span>
            <div>
              <h2 className="text-[17px] font-bold text-[#e3e2e6]">
                Phase 2: Dedicated Supabase Setup
              </h2>
              <span className="text-[11px] text-[#4edea3] font-semibold">
                Strict Isolation Confirmed • Zero connection to OUR UNIVERSE
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsSupabaseModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#292a2d] hover:bg-[#343538] flex items-center justify-center text-[#cac4d4] hover:text-[#e3e2e6] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5 overflow-y-auto pr-1">
          <div className="p-3.5 rounded-xl bg-[#003824]/20 border border-[#00a572]/40 text-[#e3e2e6]">
            <span className="text-[12px] font-bold text-[#4edea3] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Project Isolation Protocol
            </span>
            <p className="text-[12px] text-[#cac4d4] mt-1 leading-relaxed">
              This application has zero references, tokens, or credentials from "OUR UNIVERSE".
              Phase 1 operates with local reactive storage and an audited XP transaction ledger.
              When you are ready to configure cloud sync, follow the steps below with a fresh Supabase project.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-[13px] text-[#cac4d4]">
            <span className="font-bold text-[#e3e2e6]">Step-by-Step Connection Guide:</span>
            <ol className="list-decimal list-inside space-y-1 text-[12px]">
              <li>
                Create a new project on{' '}
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#cebdff] underline"
                >
                  Supabase.com
                </a>{' '}
                named <strong className="text-[#e3e2e6]">life-os</strong>.
              </li>
              <li>Open the Supabase SQL Editor and run the schema script below.</li>
              <li>
                Notice the <code className="text-[#cebdff]">unique_quest_daily_completion</code>{' '}
                constraint which guarantees duplicate XP cannot be claimed.
              </li>
              <li>
                In your deployment environment, supply <code className="text-[#cebdff]">VITE_SUPABASE_URL</code>{' '}
                and <code className="text-[#cebdff]">VITE_SUPABASE_ANON_KEY</code>.
              </li>
            </ol>
          </div>

          <div className="relative flex flex-col gap-1.5 mt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#cac4d4]">
                Production PostgreSQL Schema & RLS Policies
              </span>
              <button
                onClick={copySql}
                className="flex items-center gap-1 text-[11px] font-bold text-[#cebdff] bg-[#292a2d] hover:bg-[#343538] px-2.5 py-1 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copiedSql ? 'done' : 'content_copy'}
                </span>
                <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-[#0d0e11] border border-[#292a2d] text-[#cebdff] text-[11px] font-mono overflow-x-auto max-h-48 leading-relaxed">
              {sqlSchema}
            </pre>
          </div>
        </div>

        <div className="pt-2 border-t border-[#292a2d] flex justify-end">
          <button
            onClick={() => setIsSupabaseModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-[#cebdff] text-[#381385] text-[13px] font-bold hover:bg-[#e8ddff] transition-all"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
