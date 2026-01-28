'use client';

import { CheckCircle2, Circle, Calendar, Flame, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Task } from '@/lib/types';

interface TimelineProps {
  tasks: Task[];
}

export function Timeline({ tasks }: TimelineProps) {
  // Agrupar tarefas por data (incluindo maus hábitos criados)
  const groupedTasks = tasks
    .filter(t => {
      // Incluir tarefas completadas OU maus hábitos (mesmo não completados)
      return (t.completed && t.completedAt) || t.isHabit;
    })
    .sort((a, b) => {
      // Ordenar por data de conclusão ou criação
      const dateA = a.completedAt ? new Date(a.completedAt).getTime() : new Date(a.createdAt).getTime();
      const dateB = b.completedAt ? new Date(b.completedAt).getTime() : new Date(b.createdAt).getTime();
      return dateB - dateA;
    })
    .reduce((acc, task) => {
      // Usar data de conclusão se existir, senão usar data de criação
      const relevantDate = task.completedAt || task.createdAt;
      
      const date = new Date(relevantDate).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    }, {} as Record<string, Task[]>);

  const dates = Object.keys(groupedTasks);

  if (dates.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-12">
          <div className="text-center">
            <Circle className="w-20 h-20 text-gray-700 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">Sua Jornada Começa Aqui</h3>
            <p className="text-gray-500 mb-2">Ainda não há conquistas registradas</p>
            <p className="text-sm text-gray-600">
              Complete suas primeiras tarefas ou registre maus hábitos para ver seu progresso aparecer aqui
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white mb-2">Linha do Tempo</h2>
        <p className="text-gray-500">Sua jornada de conquistas e evolução</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF88] via-[#00D4FF] to-transparent" />

        {/* Timeline Items */}
        <div className="space-y-8">
          {dates.map((date, dateIndex) => {
            const dateTasks = groupedTasks[date];
            const isToday = date === new Date().toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            });

            return (
              <div key={date} className="relative pl-20">
                {/* Date Badge */}
                <div className="absolute left-0 top-0">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    isToday 
                      ? 'bg-gradient-to-br from-[#00FF88] to-[#00D4FF]' 
                      : 'bg-[#1a1a1a] border-2 border-[#2a2a2a]'
                  }`}>
                    {isToday ? (
                      <Flame className="w-8 h-8 text-black" />
                    ) : (
                      <Calendar className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Date Header */}
                <div className="mb-4">
                  <h3 className={`text-lg font-bold ${isToday ? 'text-[#00FF88]' : 'text-white'}`}>
                    {isToday ? '🔥 Hoje' : date}
                  </h3>
                  <p className="text-sm text-gray-500">{dateTasks.length} item{dateTasks.length > 1 ? 's' : ''}</p>
                </div>

                {/* Tasks */}
                <div className="space-y-3">
                  {dateTasks.map((task, taskIndex) => {
                    const priorityColors = {
                      high: 'border-red-500/30 bg-red-500/5',
                      medium: 'border-yellow-500/30 bg-yellow-500/5',
                      low: 'border-blue-500/30 bg-blue-500/5'
                    };

                    const priorityIcons = {
                      high: '🔥',
                      medium: '⚡',
                      low: '💡'
                    };

                    // Ícone e cor diferente para maus hábitos
                    const icon = task.isHabit && !task.completed 
                      ? <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                      : <CheckCircle2 className="w-6 h-6 text-[#00FF88] flex-shrink-0 mt-1" />;

                    const statusLabel = task.isHabit && !task.completed 
                      ? 'Registrado'
                      : 'Concluído';

                    return (
                      <Card
                        key={task.id}
                        className={`bg-[#1a1a1a] border-2 p-4 hover:scale-[1.02] transition-all ${
                          task.isHabit && !task.completed 
                            ? 'border-orange-500/30 bg-orange-500/5'
                            : priorityColors[task.priority]
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {icon}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">{priorityIcons[task.priority]}</span>
                              <span className="text-xs px-2 py-1 rounded-full bg-[#0B0B0B] border border-[#2a2a2a] text-gray-400">
                                {task.category}
                              </span>
                              {task.isHabit && (
                                <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400">
                                  Mau Hábito
                                </span>
                              )}
                            </div>
                            <p className="text-white font-medium">{task.title}</p>
                            {task.completedAt && (
                              <p className="text-xs text-gray-600 mt-2">
                                {statusLabel} às {new Date(task.completedAt).toLocaleTimeString('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            )}
                            {task.isHabit && !task.completedAt && (
                              <p className="text-xs text-gray-600 mt-2">
                                {statusLabel} às {new Date(task.createdAt).toLocaleTimeString('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* End Badge */}
        <div className="relative pl-20 pt-8">
          <div className="absolute left-0 top-8">
            <div className="w-16 h-16 rounded-2xl bg-[#0B0B0B] border-2 border-[#2a2a2a] flex items-center justify-center">
              <Flame className="w-6 h-6 text-gray-700" />
            </div>
          </div>
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6 text-center">
            <p className="text-gray-500 text-sm">
              🎯 Continue conquistando! Cada tarefa concluída é um passo rumo à sua melhor versão.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
