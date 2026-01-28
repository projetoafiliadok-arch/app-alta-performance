'use client';

import React, { useState } from 'react';
import { Dashboard } from '@/components/custom/dashboard';
import { Task, UserProgress } from '@/lib/types';

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    currentStreak: 0,
    longestStreak: 0,
    totalTasksCompleted: 0,
    disciplineLevel: 0,
    weeklyStats: []
  });

  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleEditTask = (taskId: string) => {
    // Implementar edição
  };

  const handleResetMarkers = () => {
    // Resetar progresso e tarefas
    setTasks([]);
    setUserProgress({
      currentStreak: 0,
      longestStreak: 0,
      totalTasksCompleted: 0,
      disciplineLevel: 0,
      weeklyStats: []
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-4xl mx-auto">
        <Dashboard
          tasks={tasks}
          userProgress={userProgress}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onResetMarkers={handleResetMarkers}
        />
      </div>
    </div>
  );
}