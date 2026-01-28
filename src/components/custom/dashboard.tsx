import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Trash2, Edit3, TrendingUp, Target, Calendar, Award, RotateCcw, RefreshCw } from 'lucide-react';
import { Task, UserProgress } from '@/lib/types';

interface DashboardProps {
  tasks: Task[];
  userProgress: UserProgress;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string) => void;
  onResetMarkers: () => void;
}

export function Dashboard({
  tasks,
  userProgress,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onResetMarkers
}: DashboardProps) {
  // Separar tarefas por tipo
  const dailyTasks = tasks.filter(task => task.type === 'day');
  const weeklyTasks = tasks.filter(task => task.type === 'week');
  const monthlyTasks = tasks.filter(task => task.type === 'month');
  const yearlyTasks = tasks.filter(task => task.type === 'year');

  const renderTaskSection = (title: string, tasks: Task[], icon: React.ReactNode) => {
    const completedTasks = tasks.filter(task => task.completed);
    const pendingTasks = tasks.filter(task => !task.completed);

    if (tasks.length === 0) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          {icon}
          {title} ({tasks.length})
        </h3>
        
        {/* Tarefas Pendentes */}
        {pendingTasks.length > 0 && (
          <div className="space-y-3">
            {pendingTasks.map(task => (
              <Card key={task.id} className="bg-[#1a1a1a] border-[#2a2a2a] p-4 hover:border-[#00FF88]/30 transition-colors">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => onToggleTask(task.id)}
                    variant="ghost"
                    size="sm"
                    className="w-6 h-6 p-0 rounded-full border-2 border-gray-600 hover:border-[#00FF88] hover:bg-[#00FF88]/10"
                  >
                    <Circle className="w-4 h-4 text-gray-600" />
                  </Button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                      </span>
                      {task.isHabit && <span className="text-xs text-purple-400">Hábito</span>}
                    </div>
                    <p className="text-white font-medium">{task.title}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => onEditTask(task.id)}
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => onDeleteTask(task.id)}
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Tarefas Completadas */}
        {completedTasks.length > 0 && (
          <div className="space-y-3">
            {completedTasks.map(task => (
              <Card key={task.id} className="bg-[#1a1a1a] border-[#2a2a2a] p-4 opacity-75">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => onToggleTask(task.id)}
                    variant="ghost"
                    size="sm"
                    className="w-6 h-6 p-0 rounded-full border-2 border-[#00FF88] bg-[#00FF88]/10"
                  >
                    <CheckCircle className="w-4 h-4 text-[#00FF88]" />
                  </Button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                      </span>
                      {task.isHabit && <span className="text-xs text-purple-400">Hábito</span>}
                    </div>
                    <p className="text-white font-medium line-through">{task.title}</p>
                    {task.completedAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Concluído em {new Date(task.completedAt).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                    {task.victoryReflection && (
                      <p className="text-xs text-[#00FF88] mt-1 italic">
                        "{task.victoryReflection}"
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => onEditTask(task.id)}
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => onDeleteTask(task.id)}
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Nível de Disciplina */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6 hover:border-red-500/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-4xl font-black text-red-500">{100 - userProgress.disciplineLevel}%</span>
          </div>
          <h3 className="text-sm font-bold text-white">Você deixou de cumprir {100 - userProgress.disciplineLevel}% do que prometeu</h3>
          <p className="text-xs text-gray-600 mt-1">Custo da procrastinação</p>
        </Card>

        {/* Sequência Atual */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6 hover:border-[#00FF88]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#00FF88]/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-[#00FF88]" />
            </div>
            <span className="text-4xl font-black text-[#00FF88]">{userProgress.currentStreak}</span>
          </div>
          <h3 className="text-sm font-bold text-white">Sequência Atual</h3>
          <p className="text-xs text-gray-600 mt-1">Dias consecutivos</p>
        </Card>

        {/* Melhor Sequência */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6 hover:border-[#00D4FF]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#00D4FF]" />
            </div>
            <span className="text-4xl font-black text-[#00D4FF]">{userProgress.longestStreak}</span>
          </div>
          <h3 className="text-sm font-bold text-white">Melhor Sequência</h3>
          <p className="text-xs text-gray-600 mt-1">Recorde pessoal</p>
        </Card>
      </div>

      {/* Botão Reiniciar Quiz */}
      <div className="flex justify-center">
        <Button
          onClick={onResetMarkers}
          variant="outline"
          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reiniciar Quiz
        </Button>
      </div>

      {/* Seções de metas */}
      <div className="space-y-8">
        {renderTaskSection("Metas Diárias", dailyTasks, <Calendar className="w-5 h-5 text-blue-400" />)}
        {renderTaskSection("Metas Semanais", weeklyTasks, <Calendar className="w-5 h-5 text-green-400" />)}
        {renderTaskSection("Metas Mensais", monthlyTasks, <Calendar className="w-5 h-5 text-yellow-400" />)}
        {renderTaskSection("Metas Anuais", yearlyTasks, <Calendar className="w-5 h-5 text-purple-400" />)}
      </div>

      {/* Mensagem quando não há tarefas */}
      {tasks.length === 0 && (
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-8 text-center">
          <div className="w-16 h-16 bg-[#00FF88]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-[#00FF88]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Nenhuma meta ainda</h3>
          <p className="text-gray-400">Clique no botão + para criar sua primeira meta!</p>
        </Card>
      )}
    </div>
  );
}