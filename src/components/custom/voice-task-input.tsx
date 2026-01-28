'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Task } from '@/lib/types';

interface VoiceTaskInputProps {
  onClose: () => void;
  onAddTask: (title: string, priority: Task['priority']) => void;
  editingTask?: Task | null;
  isHabit?: boolean;
}

export function VoiceTaskInput({ onClose, onAddTask, editingTask, isHabit = false }: VoiceTaskInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Se estiver editando, preencher com o texto da tarefa
    if (editingTask) {
      setTranscript(editingTask.title);
    }
  }, [editingTask]);

  useEffect(() => {
    // Verificar se o navegador suporta Web Speech API
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'pt-BR';

      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      alert('Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleAddTask = (priority: Task['priority']) => {
    if (transcript.trim()) {
      onAddTask(transcript.trim(), priority);
      onClose();
    }
  };

  // Determinar cor do botão de microfone baseado no tipo
  const getMicButtonColor = () => {
    if (isListening) {
      return 'bg-gradient-to-br from-red-500 to-pink-500 animate-pulse shadow-2xl shadow-red-500/50';
    }
    if (isHabit) {
      return 'bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] hover:scale-110 shadow-2xl shadow-[#FF6B00]/50';
    }
    return 'bg-gradient-to-br from-[#00FF88] to-[#00D4FF] hover:scale-110 shadow-2xl shadow-[#00FF88]/50';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-8 max-w-lg w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white mb-2">
            {editingTask 
              ? (isHabit ? 'Editar Mau Hábito' : 'Editar Objetivo')
              : (isHabit ? 'Adicionar Mau Hábito' : 'Adicionar Objetivo')
            }
          </h2>
          <p className="text-sm text-gray-500">Use sua voz ou digite manualmente</p>
        </div>

        {/* Microphone Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={toggleListening}
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${getMicButtonColor()}`}
          >
            {isListening ? (
              <MicOff className="w-16 h-16 text-white" />
            ) : (
              <Mic className="w-16 h-16 text-black" />
            )}
          </button>
        </div>

        {/* Status */}
        <div className="text-center mb-6">
          <p className={`text-sm font-medium ${isListening ? 'text-red-400' : 'text-gray-500'}`}>
            {isListening ? '🎤 Ouvindo...' : 'Clique no microfone para começar'}
          </p>
        </div>

        {/* Manual Input */}
        <div className="mb-6">
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder={isHabit ? 'Ou digite o mau hábito aqui...' : 'Ou digite seu objetivo aqui...'}
            className="w-full bg-[#0B0B0B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#00FF88] focus:outline-none"
          />
        </div>

        {/* Priority Buttons */}
        {transcript && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 text-center mb-3">
              {isHabit ? 'Escolha a prioridade em parar:' : 'Escolha a prioridade:'}
            </p>
            <Button
              onClick={() => handleAddTask('high')}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
            >
              🔥 {isHabit ? 'Prioridade em Parar Alta' : 'Alta Prioridade'}
            </Button>
            <Button
              onClick={() => handleAddTask('medium')}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:opacity-90"
            >
              ⚡ {isHabit ? 'Prioridade em Parar Média' : 'Média Prioridade'}
            </Button>
            <Button
              onClick={() => handleAddTask('low')}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90"
            >
              💡 {isHabit ? 'Prioridade em Parar Baixa' : 'Baixa Prioridade'}
            </Button>
          </div>
        )}

        {/* Browser Support Warning */}
        {typeof window !== 'undefined' && !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p className="text-xs text-yellow-500 text-center">
              ⚠️ Reconhecimento de voz não disponível neste navegador. Use Chrome ou Edge para melhor experiência.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
