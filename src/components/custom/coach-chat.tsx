'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Timer, AlertCircle, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { CoachMessage, UserProgress, Task } from '@/lib/types';

interface CoachChatProps {
  userProgress: UserProgress;
  tasks: Task[];
}

export function CoachChat({ userProgress, tasks }: CoachChatProps) {
  const [messages, setMessages] = useState<CoachMessage[]>([
    {
      id: '1',
      role: 'coach',
      content: '🔥 Olá! Sou seu Coach V2.0. Estou aqui para transformar você na sua melhor versão. Pronto para dominar hoje?',
      timestamp: new Date(),
      type: 'motivation'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60); // 25 minutos
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showRecalibration, setShowRecalibration] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Timer logic
  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            addCoachMessage('⏰ Tempo esgotado! Excelente foco. Pronto para o próximo desafio?', 'motivation');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTimerRunning, timerSeconds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addCoachMessage = (content: string, type: CoachMessage['type'] = 'feedback') => {
    const coachMessage: CoachMessage = {
      id: Date.now().toString(),
      role: 'coach',
      content,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, coachMessage]);
  };

  const handleFocusMode = () => {
    setShowTimer(true);
    setTimerSeconds(25 * 60);
    setIsTimerRunning(true);
    addCoachMessage('🎯 Modo Foco ativado! 25 minutos de concentração total. Vamos lá!', 'challenge');
  };

  const handleFailure = () => {
    setShowRecalibration(true);
    const pendingTasks = tasks.filter(t => !t.completed).length;
    addCoachMessage(
      `Ei, falhar faz parte do processo! Você tem ${pendingTasks} tarefas pendentes. Vamos recalibrar a rota? Qual foi o obstáculo hoje?`,
      'feedback'
    );
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: CoachMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Se está em modo recalibragem, dar feedback específico
    if (showRecalibration) {
      setShowRecalibration(false);
      setTimeout(() => {
        addCoachMessage(
          `Entendi. ${currentInput} é um desafio real. Mas lembre-se: disciplina não é sobre nunca falhar, é sobre sempre voltar. Vamos começar pequeno: escolha UMA tarefa para fazer agora. Qual será?`,
          'challenge'
        );
        setIsLoading(false);
      }, 1500);
      return;
    }

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          userStats: {
            streak: userProgress.currentStreak,
            disciplineLevel: userProgress.disciplineLevel,
            tasksCompleted: userProgress.totalTasksCompleted
          }
        })
      });

      const data = await response.json();
      addCoachMessage(data.message, 'feedback');
    } catch (error) {
      addCoachMessage(
        'Ops, tive um problema técnico. Mas não deixe isso te parar! Continue focado nas suas metas.',
        'feedback'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col h-[calc(100vh-12rem)] bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00FF88] to-[#00D4FF] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-bold text-black text-lg">Coach V2.0</h3>
              <p className="text-xs text-black/70">Seu mentor de alta performance</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleFocusMode}
              className="bg-black/20 hover:bg-black/30 text-black border-none"
              size="sm"
            >
              <Timer className="w-4 h-4 mr-2" />
              Preciso de Foco
            </Button>
            <Button
              onClick={handleFailure}
              className="bg-red-500/20 hover:bg-red-500/30 text-black border-none"
              size="sm"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Falhei
            </Button>
          </div>
        </div>

        {/* Timer Display */}
        {showTimer && (
          <Card className="m-4 bg-[#0B0B0B] border-[#00FF88] p-6">
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-400 mb-4">Modo Foco Ativo</h4>
              <div className="text-6xl font-black text-[#00FF88] mb-6 font-mono">
                {formatTime(timerSeconds)}
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="bg-[#00FF88] text-black hover:bg-[#00FF88]/90"
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Continuar
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setTimerSeconds(25 * 60);
                    setIsTimerRunning(false);
                  }}
                  variant="outline"
                  className="border-[#2a2a2a] text-gray-400 hover:text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Resetar
                </Button>
                <Button
                  onClick={() => setShowTimer(false)}
                  variant="ghost"
                  className="text-gray-500 hover:text-white"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#00FF88] to-[#00D4FF] text-black'
                    : 'bg-[#0B0B0B] text-gray-100 border border-[#2a2a2a]'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p className="text-xs opacity-50 mt-2">
                  {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#0B0B0B] rounded-2xl px-6 py-4 border border-[#2a2a2a]">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 bg-[#0B0B0B] border-t border-[#2a2a2a]">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={showRecalibration ? "Conte o que aconteceu..." : "Pergunte ao seu coach..."}
              className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-600 focus:border-[#00FF88]"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-[#00FF88] to-[#00D4FF] text-black hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
