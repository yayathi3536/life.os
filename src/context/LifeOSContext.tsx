import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  Quest,
  Challenge,
  Friend,
  Achievement,
  DayActivity,
  XPTransaction,
  ActiveTab,
  QuestCategory,
  NotificationItem,
  NotificationPreferences,
  NotificationType,
} from '../types';
import {
  initialUser,
  initialQuests,
  initialChallenges,
  initialFriends,
  initialAchievements,
  initialWeeklyActivity,
  initialXpLedger,
  initialNotifications,
  defaultNotificationPreferences,
} from '../data/mockData';

interface LifeOSContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserProfile;
  quests: Quest[];
  challenges: Challenge[];
  friends: Friend[];
  achievements: Achievement[];
  weeklyActivity: DayActivity[];
  xpLedger: XPTransaction[];
  showLevelUpModal: boolean;
  leveledUpTo: number | null;
  closeLevelUpModal: () => void;
  // Notifications state
  notifications: NotificationItem[];
  notificationPreferences: NotificationPreferences;
  isNotificationCenterOpen: boolean;
  setIsNotificationCenterOpen: (open: boolean) => void;
  isNotificationSettingsOpen: boolean;
  setIsNotificationSettingsOpen: (open: boolean) => void;
  unreadNotificationsCount: number;
  addNotification: (
    item: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'> & { timestamp?: string }
  ) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  updateNotificationPreferences: (updates: Partial<NotificationPreferences>) => void;
  sendTestNotification: (type: NotificationType) => void;
  // Modals state
  isCreateQuestOpen: boolean;
  setIsCreateQuestOpen: (open: boolean) => void;
  isEditQuestOpen: boolean;
  setIsEditQuestOpen: (open: boolean) => void;
  editingQuest: Quest | null;
  openEditQuest: (quest: Quest) => void;
  updateQuest: (questId: string, updates: Partial<Quest>) => void;
  isCreateChallengeOpen: boolean;
  setIsCreateChallengeOpen: (open: boolean) => void;
  isAddFriendOpen: boolean;
  setIsAddFriendOpen: (open: boolean) => void;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (open: boolean) => void;
  isXpAuditOpen: boolean;
  setIsXpAuditOpen: (open: boolean) => void;
  isSupabaseModalOpen: boolean;
  setIsSupabaseModalOpen: (open: boolean) => void;
  // Actions
  toggleQuestCompletion: (questId: string) => void;
  createQuest: (quest: Omit<Quest, 'id' | 'createdAt' | 'isCompleted'>) => void;
  deleteQuest: (questId: string) => void;
  checkInChallenge: (challengeId: string) => void;
  joinChallenge: (challengeId: string) => void;
  createChallenge: (challengeData: Partial<Challenge>) => void;
  sendFriendRequest: (handleOrEmail: string) => { success: boolean; message: string };
  acceptFriendRequest: (friendId: string) => void;
  rejectFriendRequest: (friendId: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePreferences: (updates: Partial<UserProfile['preferences']>) => void;
  resetAllData: () => void;
  toastMessage: string | null;
  triggerToast: (msg: string) => void;
}

const LifeOSContext = createContext<LifeOSContextType | undefined>(undefined);

const STORAGE_KEY = 'life_os_state_v2';

export const LifeOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  // Load from local storage or fallback to mock
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
      return saved ? JSON.parse(saved) : initialUser;
    } catch {
      return initialUser;
    }
  });

  const [quests, setQuests] = useState<Quest[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_quests`);
      return saved ? JSON.parse(saved) : initialQuests;
    } catch {
      return initialQuests;
    }
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_challenges`);
      return saved ? JSON.parse(saved) : initialChallenges;
    } catch {
      return initialChallenges;
    }
  });

  const [friends, setFriends] = useState<Friend[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_friends`);
      return saved ? JSON.parse(saved) : initialFriends;
    } catch {
      return initialFriends;
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_achievements`);
      return saved ? JSON.parse(saved) : initialAchievements;
    } catch {
      return initialAchievements;
    }
  });

  const [weeklyActivity, setWeeklyActivity] = useState<DayActivity[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_weeklyActivity`);
      return saved ? JSON.parse(saved) : initialWeeklyActivity;
    } catch {
      return initialWeeklyActivity;
    }
  });

  const [xpLedger, setXpLedger] = useState<XPTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_xpLedger`);
      return saved ? JSON.parse(saved) : initialXpLedger;
    } catch {
      return initialXpLedger;
    }
  });

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_notifications`);
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const [notificationPreferences, setNotificationPreferences] =
    useState<NotificationPreferences>(() => {
      try {
        const saved = localStorage.getItem(`${STORAGE_KEY}_notif_prefs`);
        return saved ? JSON.parse(saved) : defaultNotificationPreferences;
      } catch {
        return defaultNotificationPreferences;
      }
    });

  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);

  // Modal Visibility
  const [isCreateQuestOpen, setIsCreateQuestOpen] = useState(false);
  const [isEditQuestOpen, setIsEditQuestOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false);
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isXpAuditOpen, setIsXpAuditOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  // Level Up Celebrations
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [leveledUpTo, setLeveledUpTo] = useState<number | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  // Synthetic Minimalist Web Audio chime
  const playNotificationSound = () => {
    if (!notificationPreferences.soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      // Pleasant upward two-tone ping: 587.33Hz (D5) -> 880Hz (A5)
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio autoplay policy handled safely
    }
  };

  // Persist state updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(user));
      localStorage.setItem(`${STORAGE_KEY}_quests`, JSON.stringify(quests));
      localStorage.setItem(`${STORAGE_KEY}_challenges`, JSON.stringify(challenges));
      localStorage.setItem(`${STORAGE_KEY}_friends`, JSON.stringify(friends));
      localStorage.setItem(`${STORAGE_KEY}_achievements`, JSON.stringify(achievements));
      localStorage.setItem(`${STORAGE_KEY}_weeklyActivity`, JSON.stringify(weeklyActivity));
      localStorage.setItem(`${STORAGE_KEY}_xpLedger`, JSON.stringify(xpLedger));
      localStorage.setItem(`${STORAGE_KEY}_notifications`, JSON.stringify(notifications));
      localStorage.setItem(`${STORAGE_KEY}_notif_prefs`, JSON.stringify(notificationPreferences));
    } catch (e) {
      console.warn('Failed to save to local storage', e);
    }
  }, [
    user,
    quests,
    challenges,
    friends,
    achievements,
    weeklyActivity,
    xpLedger,
    notifications,
    notificationPreferences,
  ]);

  const fireCelebration = () => {
    confetti({
      particleCount: 55,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#cebdff', '#a78bfa', '#4edea3', '#dbc839'],
    });
  };

  // Dispatch a notification honoring user settings
  const addNotification = (
    item: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'> & { timestamp?: string }
  ) => {
    // Check if category is enabled in settings
    if (item.type === 'quest_completion' && !notificationPreferences.questCompletions) return;
    if (item.type === 'streak_milestone' && !notificationPreferences.streakReminders) return;
    if (item.type === 'challenge_invite' && !notificationPreferences.challengeInvites) return;
    if (item.type === 'leaderboard_update' && !notificationPreferences.leaderboardAlerts) return;

    const newNotif: NotificationItem = {
      ...item,
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp:
        item.timestamp ||
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // Play chime
    playNotificationSound();

    // Show floating banner if enabled
    if (notificationPreferences.inAppBanner) {
      triggerToast(`${item.title}: ${item.message}`);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    triggerToast('All notifications marked as read');
  };

  const clearNotifications = () => {
    setNotifications([]);
    triggerToast('Notification history cleared');
  };

  const updateNotificationPreferences = (updates: Partial<NotificationPreferences>) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      ...updates,
    }));
    triggerToast('Notification preferences saved');
  };

  const sendTestNotification = (type: NotificationType) => {
    switch (type) {
      case 'quest_completion':
        addNotification({
          type: 'quest_completion',
          title: 'Quest Completed',
          message: 'Zone 2 Cardio • 45 min run verified (+100 XP)',
          xpDelta: 100,
          icon: 'task_alt',
          iconColor: '#cebdff',
          actionLink: { tab: 'quests', label: 'View Quests' },
        });
        break;
      case 'streak_milestone':
        addNotification({
          type: 'streak_milestone',
          title: 'Streak Milestone 🔥',
          message: '14-Day Streak maintained! Keep your chain unbroken tomorrow.',
          icon: 'local_fire_department',
          iconColor: '#4edea3',
          actionLink: { tab: 'overview', label: 'View Streak' },
        });
        break;
      case 'challenge_invite':
        addNotification({
          type: 'challenge_invite',
          title: 'Squad Invitation',
          message: 'Alex Morgan invited you to "Zero Sugar November" (+800 XP pool).',
          icon: 'swords',
          iconColor: '#cebdff',
          actionLink: { tab: 'challenges', label: 'View Challenge' },
        });
        break;
      case 'leaderboard_update':
        addNotification({
          type: 'leaderboard_update',
          title: 'Leaderboard Pace Shift',
          message: 'Sarah Chen logged 150 XP. You are holding Rank #2 by 250 XP pace.',
          icon: 'leaderboard',
          iconColor: '#dbc839',
          actionLink: { tab: 'leaderboard', label: 'View Standings' },
        });
        break;
      default:
        addNotification({
          type: 'system',
          title: 'System Cadence Check',
          message: 'Morning briefing protocol active. 3 of 5 milestones ready.',
          icon: 'bolt',
          iconColor: '#cebdff',
        });
    }
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Toggle Quest Completion with precise transactional XP logic
  const toggleQuestCompletion = (questId: string) => {
    const targetQuest = quests.find((q) => q.id === questId);
    if (!targetQuest) return;

    const willBeCompleted = !targetQuest.isCompleted;
    const nowTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update Quests array
    setQuests((prev) =>
      prev.map((q) =>
        q.id === questId
          ? {
              ...q,
              isCompleted: willBeCompleted,
              completedAt: willBeCompleted ? nowTimeStr : undefined,
            }
          : q
      )
    );

    const xpDelta = willBeCompleted ? targetQuest.xpReward : -targetQuest.xpReward;

    // Create XP Transaction in audit ledger
    const newTx: XPTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: user.id,
      questId: targetQuest.id,
      reason: willBeCompleted
        ? `Completed "${targetQuest.title}"`
        : `Reverted "${targetQuest.title}"`,
      amount: xpDelta,
      timestamp: new Date().toISOString(),
      category: targetQuest.category,
    };
    setXpLedger((prev) => [newTx, ...prev]);

    // Recalculate User Profile Stats
    setUser((prev) => {
      let newTotalXp = Math.max(0, prev.totalXp + xpDelta);
      let newCurrentTierXp = prev.currentTierXp + xpDelta;
      let newLevel = prev.level;
      let newNextTierXp = prev.nextTierXp;
      let newTierName = prev.tierName;

      // Check level up threshold using while loop for multiple thresholds
      while (newCurrentTierXp >= newNextTierXp) {
        newLevel += 1;
        newCurrentTierXp -= newNextTierXp;
        newNextTierXp = Math.round(newNextTierXp * 1.15); // scaled tier requirement
        if (newLevel >= 15 && prev.tierName === 'Architect') {
          newTierName = 'Master Architect';
        }
        setLeveledUpTo(newLevel);
        setShowLevelUpModal(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#cebdff', '#a78bfa', '#4edea3', '#dbc839'],
        });

        // Add level up notification
        addNotification({
          type: 'system',
          title: `Tier Ascension: Level ${newLevel}!`,
          message: `Congratulations! You unlocked ${newTierName} class status.`,
          icon: 'military_tech',
          iconColor: '#dbc839',
          actionLink: { tab: 'profile', label: 'View Profile' },
        });
      }
      while (newCurrentTierXp < 0 && newLevel > 1) {
        newLevel -= 1;
        newNextTierXp = Math.round(newNextTierXp / 1.15);
        newCurrentTierXp += newNextTierXp;
      }

      // Update skill attributes according to category
      const skillKey = getCategorySkillKey(targetQuest.category);
      const currentSkill = prev.skills[skillKey];
      let newProgress = currentSkill.progressPercent + (willBeCompleted ? 2 : -2);
      let newSkillLevel = currentSkill.level;
      if (newProgress >= 100) {
        newSkillLevel += 1;
        newProgress = 10;
      } else if (newProgress < 0) {
        newProgress = 0;
      }

      return {
        ...prev,
        level: newLevel,
        tierName: newTierName,
        totalXp: newTotalXp,
        currentTierXp: newCurrentTierXp,
        nextTierXp: newNextTierXp,
        skills: {
          ...prev.skills,
          [skillKey]: {
            ...currentSkill,
            level: newSkillLevel,
            progressPercent: newProgress,
          },
        },
      };
    });

    // Update Weekly Activity chart for Today (Wednesday)
    setWeeklyActivity((prev) =>
      prev.map((day) =>
        day.isToday ? { ...day, xp: Math.max(0, day.xp + xpDelta) } : day
      )
    );

    if (willBeCompleted) {
      fireCelebration();
      // Dispatch Quest Completion Notification
      addNotification({
        type: 'quest_completion',
        title: 'Quest Completed',
        message: `+${targetQuest.xpReward} XP: "${targetQuest.title}" logged successfully`,
        xpDelta: targetQuest.xpReward,
        icon: 'task_alt',
        iconColor: '#cebdff',
        actionLink: { tab: 'quests', label: 'View Quests' },
      });

      // Dispatch Streak Maintenance Notification if completed 4th quest today
      const nowCompletedCount = quests.filter((q) => q.isCompleted).length + 1;
      if (nowCompletedCount >= 4) {
        addNotification({
          type: 'streak_milestone',
          title: `${user.activeStreak}-Day Streak Maintained! 🔥`,
          message: `Active streak safely maintained. Daily baseline target reached.`,
          icon: 'local_fire_department',
          iconColor: '#4edea3',
          actionLink: { tab: 'overview', label: 'View Overview' },
        });
      }
    } else {
      triggerToast(`Quest marked incomplete (${xpDelta} XP)`);
    }
  };

  const getCategorySkillKey = (
    cat: QuestCategory
  ): keyof UserProfile['skills'] => {
    switch (cat) {
      case 'Discipline':
        return 'discipline';
      case 'Fitness':
        return 'fitness';
      case 'Learning':
        return 'knowledge';
      case 'Creativity':
        return 'creativity';
      case 'Social':
        return 'social';
      case 'Personal':
      default:
        return 'personalGrowth';
    }
  };

  const createQuest = (newQuestData: Omit<Quest, 'id' | 'createdAt' | 'isCompleted'>) => {
    const newQuest: Quest = {
      ...newQuestData,
      id: `q_${Date.now()}`,
      createdAt: new Date().toISOString(),
      isCompleted: false,
    };
    setQuests((prev) => [newQuest, ...prev]);
    setIsCreateQuestOpen(false);
    triggerToast(`Created "${newQuest.title}" (+${newQuest.xpReward} XP pool)`);
  };

  const deleteQuest = (questId: string) => {
    const target = quests.find((q) => q.id === questId);
    if (!target) return;
    setQuests((prev) => prev.filter((q) => q.id !== questId));
    triggerToast(`Deleted quest`);
  };

  const openEditQuest = (quest: Quest) => {
    setEditingQuest(quest);
    setIsEditQuestOpen(true);
  };

  const updateQuest = (questId: string, updates: Partial<Quest>) => {
    const current = quests.find((q) => q.id === questId);
    if (!current) return;

    // If quest was already completed and XP reward changed, adjust user XP appropriately
    if (current.isCompleted && updates.xpReward && updates.xpReward !== current.xpReward) {
      const diff = updates.xpReward - current.xpReward;
      setUser((u) => ({
        ...u,
        totalXp: Math.max(0, u.totalXp + diff),
        currentTierXp: Math.max(0, u.currentTierXp + diff),
      }));
      const adjTx: XPTransaction = {
        id: `tx_adj_${Date.now()}`,
        userId: user.id,
        questId,
        reason: `Adjusted XP for "${updates.title || current.title}"`,
        amount: diff,
        timestamp: new Date().toISOString(),
        category: updates.category || current.category,
      };
      setXpLedger((l) => [adjTx, ...l]);
    }

    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, ...updates } : q))
    );
    setIsEditQuestOpen(false);
    setEditingQuest(null);
    triggerToast(`Updated "${updates.title || current.title}"`);
  };

  const checkInChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.id === challengeId) {
          if (ch.userCheckedInToday) {
            triggerToast('Already checked in for today');
            return ch;
          }
          const bonusXp = 50;

          // Award bonus XP
          const newTx: XPTransaction = {
            id: `tx_ch_${Date.now()}`,
            userId: user.id,
            challengeId: ch.id,
            reason: `Daily Check-In: ${ch.title}`,
            amount: bonusXp,
            timestamp: new Date().toISOString(),
            category: 'Discipline',
          };
          setXpLedger((l) => [newTx, ...l]);

          setUser((u) => ({
            ...u,
            totalXp: u.totalXp + bonusXp,
            currentTierXp: u.currentTierXp + bonusXp,
          }));

          setWeeklyActivity((w) =>
            w.map((d) => (d.isToday ? { ...d, xp: d.xp + bonusXp } : d))
          );

          triggerToast(`Checked in! +${bonusXp} XP secured`);
          fireCelebration();

          // Dispatch Challenge Notification
          addNotification({
            type: 'challenge_invite',
            title: 'Challenge Check-In Logged',
            message: `+${bonusXp} XP secured for "${ch.title}". Squad sync updated!`,
            xpDelta: bonusXp,
            icon: 'swords',
            iconColor: '#4edea3',
            actionLink: { tab: 'challenges', label: 'View Gauntlet' },
          });

          return {
            ...ch,
            currentProgress: Math.min(ch.totalTarget, ch.currentProgress + 1),
            userCheckedInToday: true,
            userLoggedValue: '28 hrs logged (Tied for #1 with Alex M.)',
            participants: ch.participants.map((p) =>
              p.isCurrentUser ? { ...p, currentScore: p.currentScore + 2 } : p
            ),
          };
        }
        return ch;
      })
    );
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.id === challengeId) {
          const userParticipant = {
            id: 'f_you',
            name: user.name,
            initials: 'YOU',
            color: '#cebdff',
            currentScore: 0,
            unit: ch.unit,
            isCurrentUser: true,
          };
          triggerToast(`Joined "${ch.title}"! Challenge active`);
          fireCelebration();

          addNotification({
            type: 'challenge_invite',
            title: 'Challenge Joined',
            message: `You are now active in "${ch.title}". First check-in opens tomorrow.`,
            icon: 'swords',
            iconColor: '#cebdff',
            actionLink: { tab: 'challenges', label: 'View Challenge' },
          });

          return {
            ...ch,
            userHasJoined: true,
            participants: [...ch.participants, userParticipant],
          };
        }
        return ch;
      })
    );
  };

  const createChallenge = (data: Partial<Challenge>) => {
    const newChallenge: Challenge = {
      id: `ch_${Date.now()}`,
      title: data.title || 'New Squad Challenge',
      tag: data.tag || 'Squad Sprint',
      description: data.description || 'Achieve consistent execution together with your squad.',
      type: data.type || 'gauntlet',
      totalTarget: data.totalTarget || 30,
      currentProgress: 1,
      unit: data.unit || 'days',
      daysTotal: data.daysTotal || 30,
      daysElapsed: 1,
      xpReward: data.xpReward || 500,
      badgeName: data.badgeName || 'Squad Champion',
      participants: [
        {
          id: 'f_you',
          name: user.name,
          initials: 'YOU',
          color: '#cebdff',
          currentScore: 1,
          unit: data.unit || 'days',
          isCurrentUser: true,
        },
      ],
      userHasJoined: true,
      userCheckedInToday: true,
      userRank: 1,
      userLoggedValue: 'Day 1 logged',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    };

    setChallenges((prev) => [newChallenge, ...prev]);
    setIsCreateChallengeOpen(false);
    triggerToast(`Challenge created! Invite code generated.`);
    fireCelebration();

    addNotification({
      type: 'challenge_invite',
      title: 'Squad Challenge Created',
      message: `"${newChallenge.title}" launched. Squad sync code is active.`,
      icon: 'swords',
      iconColor: '#4edea3',
      actionLink: { tab: 'challenges', label: 'View Challenges' },
    });
  };

  const sendFriendRequest = (handleOrEmail: string): { success: boolean; message: string } => {
    if (!handleOrEmail.trim()) {
      return { success: false, message: 'Please enter a valid handle or email.' };
    }
    const cleanHandle = handleOrEmail.startsWith('@') ? handleOrEmail : `@${handleOrEmail}`;

    const existing = friends.find((f) => f.handle.toLowerCase() === cleanHandle.toLowerCase());
    if (existing) {
      return { success: false, message: `${existing.name} is already in your circle!` };
    }

    const newFriend: Friend = {
      id: `f_${Date.now()}`,
      name: cleanHandle.replace('@', '').toUpperCase(),
      handle: cleanHandle,
      initials: cleanHandle.substring(1, 3).toUpperCase(),
      level: 12,
      totalXp: 11200,
      weeklyXp: 1450,
      recentActivity: 'Invitation sent • Pending acceptance',
      timeAgo: 'Just now',
      streak: 5,
      status: 'pending_outgoing',
      questsCompletedThisWeek: 8,
    };

    setFriends((prev) => [newFriend, ...prev]);
    triggerToast(`Invite sent to ${cleanHandle}!`);

    addNotification({
      type: 'challenge_invite',
      title: 'Squad Invite Dispatched',
      message: `Invitation link sent to ${cleanHandle}. +100 XP upon squad acceptance.`,
      icon: 'forward_to_inbox',
      iconColor: '#cebdff',
    });

    return { success: true, message: `Invite sent to ${cleanHandle}` };
  };

  const acceptFriendRequest = (friendId: string) => {
    const friendObj = friends.find((f) => f.id === friendId);
    setFriends((prev) =>
      prev.map((f) =>
        f.id === friendId
          ? { ...f, status: 'friend', recentActivity: 'Accepted invite • Synced to squad' }
          : f
      )
    );
    // Award friend sync bonus XP
    const bonusXp = 100;
    const newTx: XPTransaction = {
      id: `tx_fr_${Date.now()}`,
      userId: user.id,
      reason: 'Squad Sync Bonus: Added New Member',
      amount: bonusXp,
      timestamp: new Date().toISOString(),
      category: 'Social',
    };
    setXpLedger((l) => [newTx, ...l]);
    setUser((u) => ({
      ...u,
      totalXp: u.totalXp + bonusXp,
      currentTierXp: u.currentTierXp + bonusXp,
    }));

    triggerToast(`Friend request accepted! +${bonusXp} XP`);
    fireCelebration();

    // Trigger Notification & Leaderboard Update alert
    addNotification({
      type: 'leaderboard_update',
      title: 'Squad Member Synced',
      message: `${friendObj?.name || 'New friend'} synced into your cohort. +100 XP squad bonus credited!`,
      xpDelta: bonusXp,
      icon: 'group_add',
      iconColor: '#4edea3',
      actionLink: { tab: 'leaderboard', label: 'View Standings' },
    });
  };

  const rejectFriendRequest = (friendId: string) => {
    setFriends((prev) => prev.filter((f) => f.id !== friendId));
    triggerToast(`Request declined`);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    setIsEditProfileOpen(false);
    triggerToast('Profile updated');
  };

  const updatePreferences = (updates: Partial<UserProfile['preferences']>) => {
    setUser((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...updates,
      },
    }));
    triggerToast('Preferences saved');
  };

  const resetAllData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_user`);
    localStorage.removeItem(`${STORAGE_KEY}_quests`);
    localStorage.removeItem(`${STORAGE_KEY}_challenges`);
    localStorage.removeItem(`${STORAGE_KEY}_friends`);
    localStorage.removeItem(`${STORAGE_KEY}_achievements`);
    localStorage.removeItem(`${STORAGE_KEY}_weeklyActivity`);
    localStorage.removeItem(`${STORAGE_KEY}_xpLedger`);
    localStorage.removeItem(`${STORAGE_KEY}_notifications`);
    localStorage.removeItem(`${STORAGE_KEY}_notif_prefs`);

    setUser(initialUser);
    setQuests(initialQuests);
    setChallenges(initialChallenges);
    setFriends(initialFriends);
    setAchievements(initialAchievements);
    setWeeklyActivity(initialWeeklyActivity);
    setXpLedger(initialXpLedger);
    setNotifications(initialNotifications);
    setNotificationPreferences(defaultNotificationPreferences);
    triggerToast('Reset to default initial state');
  };

  const closeLevelUpModal = () => {
    setShowLevelUpModal(false);
    setLeveledUpTo(null);
  };

  return (
    <LifeOSContext.Provider
      value={{
        activeTab,
        setActiveTab,
        user,
        quests,
        challenges,
        friends,
        achievements,
        weeklyActivity,
        xpLedger,
        showLevelUpModal,
        leveledUpTo,
        closeLevelUpModal,
        notifications,
        notificationPreferences,
        isNotificationCenterOpen,
        setIsNotificationCenterOpen,
        isNotificationSettingsOpen,
        setIsNotificationSettingsOpen,
        unreadNotificationsCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        updateNotificationPreferences,
        sendTestNotification,
        isCreateQuestOpen,
        setIsCreateQuestOpen,
        isEditQuestOpen,
        setIsEditQuestOpen,
        editingQuest,
        openEditQuest,
        updateQuest,
        isCreateChallengeOpen,
        setIsCreateChallengeOpen,
        isAddFriendOpen,
        setIsAddFriendOpen,
        isEditProfileOpen,
        setIsEditProfileOpen,
        isXpAuditOpen,
        setIsXpAuditOpen,
        isSupabaseModalOpen,
        setIsSupabaseModalOpen,
        toggleQuestCompletion,
        createQuest,
        deleteQuest,
        checkInChallenge,
        joinChallenge,
        createChallenge,
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        updateProfile,
        updatePreferences,
        resetAllData,
        toastMessage,
        triggerToast,
      }}
    >
      {children}
    </LifeOSContext.Provider>
  );
};

export const useLifeOS = (): LifeOSContextType => {
  const context = useContext(LifeOSContext);
  if (!context) {
    throw new Error('useLifeOS must be used within a LifeOSProvider');
  }
  return context;
};
