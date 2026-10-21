export type QuestCategory = 'Discipline' | 'Fitness' | 'Learning' | 'Creativity' | 'Social' | 'Personal';

export type QuestDifficulty = 'Easy' | 'Medium' | 'Hard';

export type QuestRecurrence = 'Daily' | 'Mon/Wed/Fri' | 'Once';

export interface Subtask {
  id: string;
  title: string;
  isDone: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description?: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  xpReward: number;
  recurrence: QuestRecurrence;
  scheduledTime?: string;
  subtasks?: Subtask[];
  isCompleted: boolean;
  completedAt?: string;
  dateScheduled?: string; // YYYY-MM-DD
  createdAt: string;
}

export interface XPTransaction {
  id: string;
  userId: string;
  questId?: string;
  challengeId?: string;
  reason: string;
  amount: number;
  timestamp: string;
  category?: QuestCategory;
}

export interface SkillAttribute {
  name: string;
  level: number;
  progressPercent: number; // 0 - 100
  color: string;
}

export interface UserPreferences {
  reminderTime: string;
  cadence: string;
  squadPrivacy: 'Friends Only' | 'Public' | 'Private';
  healthSync: 'Apple Health' | 'Google Fit' | 'Disabled';
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  level: number;
  tierName: string;
  totalXp: number;
  currentTierXp: number;
  nextTierXp: number;
  multiplier: number;
  activeStreak: number;
  recordStreak: number;
  joinedDate: string;
  skills: {
    discipline: SkillAttribute;
    knowledge: SkillAttribute;
    personalGrowth: SkillAttribute;
    fitness: SkillAttribute;
    social: SkillAttribute;
    creativity: SkillAttribute;
  };
  preferences: UserPreferences;
}

export interface ChallengeParticipant {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string;
  color?: string;
  currentScore: number;
  unit: string;
  isCurrentUser?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  tag: string;
  description: string;
  type: 'gauntlet' | 'collective' | 'habit';
  totalTarget: number;
  currentProgress: number;
  unit: string;
  daysTotal: number;
  daysElapsed: number;
  xpReward: number;
  badgeName: string;
  participants: ChallengeParticipant[];
  userHasJoined: boolean;
  userCheckedInToday: boolean;
  userRank?: number;
  userLoggedValue?: string;
  startDate: string;
  endDate: string;
}

export interface Friend {
  id: string;
  name: string;
  handle: string;
  initials: string;
  avatarUrl?: string;
  level: number;
  totalXp: number;
  weeklyXp: number;
  recentActivity: string;
  timeAgo: string;
  streak: number;
  gauntletRank?: number;
  status: 'friend' | 'pending_incoming' | 'pending_outgoing';
  tag?: string;
  questsCompletedThisWeek: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'consistency' | 'discipline' | 'fitness' | 'learning' | 'growth';
  categoryLabel: string;
  xpReward: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number;
  target: number;
  unit?: string;
  icon: string;
  lockedReason?: string;
  requiresLevel?: number;
}

export interface DayActivity {
  day: string;
  shortDay: 'M' | 'T' | 'W' | 'T' | 'F' | 'S' | 'S';
  xp: number;
  isToday?: boolean;
  dateStr: string;
}

export type ActiveTab = 'overview' | 'quests' | 'challenges' | 'leaderboard' | 'profile' | 'achievements';

export type NotificationType =
  | 'quest_completion'
  | 'streak_milestone'
  | 'challenge_invite'
  | 'leaderboard_update'
  | 'system';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  xpDelta?: number;
  icon: string;
  iconColor: string;
  actionLink?: {
    tab: ActiveTab;
    label?: string;
  };
}

export interface NotificationPreferences {
  questCompletions: boolean;
  streakReminders: boolean;
  challengeInvites: boolean;
  leaderboardAlerts: boolean;
  soundEnabled: boolean;
  inAppBanner: boolean;
}
