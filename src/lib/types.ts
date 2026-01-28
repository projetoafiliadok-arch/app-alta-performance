// Types para o app V2.0 - Seu Melhor Eu

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'saude' | 'trabalho' | 'estudo' | 'pessoal';
  createdAt: Date;
  completedAt?: Date;
  streak?: number;
  type?: 'day' | 'week' | 'month' | 'year'; // Tipo de meta
  targetDate?: Date; // Data específica para metas do dia
  weekStart?: Date; // Início da semana para metas semanais
  weekEnd?: Date; // Fim da semana para metas semanais
  monthStart?: Date; // Início do mês para metas mensais
  monthEnd?: Date; // Fim do mês para metas mensais
  yearStart?: Date; // Início do ano para metas anuais
  yearEnd?: Date; // Fim do ano para metas anuais
  isHabit?: boolean; // Se é um hábito (mau hábito a controlar)
  victoryReflection?: string; // Reflexão sobre o que quase impediu a conclusão
}

export interface DailyStats {
  date: string;
  tasksCompleted: number;
  tasksTotal: number;
  disciplineScore: number;
  coachFeedback?: string;
}

export interface UserProgress {
  currentStreak: number;
  longestStreak: number;
  totalTasksCompleted: number;
  disciplineLevel: number; // 0-100
  weeklyStats: DailyStats[];
}

export interface CoachMessage {
  id: string;
  role: 'user' | 'coach';
  content: string;
  timestamp: Date;
  type?: 'motivation' | 'feedback' | 'challenge';
}
