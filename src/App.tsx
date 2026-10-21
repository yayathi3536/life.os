import React from 'react';
import { LifeOSProvider, useLifeOS } from './context/LifeOSContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OverviewView } from './components/OverviewView';
import { QuestsView } from './components/QuestsView';
import { ChallengesView } from './components/ChallengesView';
import { LeaderboardView } from './components/LeaderboardView';
import { ProfileView } from './components/ProfileView';
import { AchievementsView } from './components/AchievementsView';
import { CreateQuestModal } from './components/CreateQuestModal';
import { EditQuestModal } from './components/EditQuestModal';
import { CreateChallengeModal } from './components/CreateChallengeModal';
import { AddFriendModal } from './components/AddFriendModal';
import { EditProfileModal } from './components/EditProfileModal';
import { XpAuditModal } from './components/XpAuditModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { LevelUpModal } from './components/LevelUpModal';
import { NotificationCenter } from './components/NotificationCenter';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';

const MainContent: React.FC = () => {
  const { activeTab, toastMessage } = useLifeOS();

  return (
    <div className="bg-[#121316] font-sans text-[#e3e2e6] flex flex-col min-h-screen selection:bg-[#cebdff] selection:text-[#381385]">
      {/* Top Fixed Header */}
      <Header />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-[#121316] px-4 max-w-2xl mx-auto">
        <div className="w-full mt-2">
          {activeTab === 'overview' && <OverviewView />}
          {activeTab === 'quests' && <QuestsView />}
          {activeTab === 'challenges' && <ChallengesView />}
          {activeTab === 'leaderboard' && <LeaderboardView />}
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'achievements' && <AchievementsView />}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Modals & Dialogs */}
      <CreateQuestModal />
      <EditQuestModal />
      <CreateChallengeModal />
      <AddFriendModal />
      <EditProfileModal />
      <XpAuditModal />
      <SupabaseConfigModal />
      <LevelUpModal />
      <NotificationCenter />
      <NotificationSettingsModal />

      {/* Floating Micro-Feedback Toast */}
      {toastMessage && (
        <div className="fixed top-20 inset-x-4 z-50 flex justify-center pointer-events-none animate-bounceIn">
          <div className="px-4 py-2.5 rounded-full bg-[#38393c] border border-[#494552] text-[#e3e2e6] shadow-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
              check_circle
            </span>
            <span className="text-[12px] font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <LifeOSProvider>
      <MainContent />
    </LifeOSProvider>
  );
}
