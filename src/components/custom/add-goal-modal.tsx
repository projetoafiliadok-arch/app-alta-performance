'use client';

import { useState } from 'react';
import { Calendar, Target, Flame, TrendingUp, Award, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';

interface AddGoalModalProps {
  onClose: () => void;
  onSelectType: (type: 'day' | 'week' | 'month' | 'year', date?: Date) => void;
}

export function AddGoalModal({ onClose, onSelectType }: AddGoalModalProps) {
  const [step, setStep] = useState<'choose' | 'calendar'>('choose');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleDayClick = () => {
    setStep('calendar');
  };

  const handleWeekClick = () => {
    onSelectType('week');
  };

  const handleMonthClick = () => {
    onSelectType('month');
  };

  const handleYearClick = () => {
    onSelectType('year');
  };

  const handleDateConfirm = () => {
    if (selectedDate) {
      onSelectType('day', selectedDate);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-8 max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 'choose' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-white mb-2">Escolha o Tipo de Meta</h2>
              <p className="text-gray-400">Selecione o período da sua meta</p>
            </div>

            <div className="space-y-4">
              {/* Meta do Dia */}
              <button
                onClick={handleDayClick}
                className="w-full border-2 border-[#00FF88]/30 bg-[#00FF88]/5 rounded-2xl p-6 hover:border-[#00FF88] hover:bg-[#00FF88]/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#00FF88]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-7 h-7 text-[#00FF88]" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">Meta do Dia</h3>
                    <p className="text-sm text-gray-400">Escolha uma data específica</p>
                  </div>
                  <Calendar className="w-5 h-5 text-[#00FF88] opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>

              {/* Meta da Semana */}
              <button
                onClick={handleWeekClick}
                className="w-full border-2 border-[#FF6B00]/30 bg-[#FF6B00]/5 rounded-2xl p-6 hover:border-[#FF6B00] hover:bg-[#FF6B00]/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Flame className="w-7 h-7 text-[#FF6B00]" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">Meta da Semana</h3>
                    <p className="text-sm text-gray-400">Para toda a semana atual</p>
                  </div>
                </div>
              </button>

              {/* Meta Mensal */}
              <button
                onClick={handleMonthClick}
                className="w-full border-2 border-[#00D4FF]/30 bg-[#00D4FF]/5 rounded-2xl p-6 hover:border-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#00D4FF]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-7 h-7 text-[#00D4FF]" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">Meta Mensal</h3>
                    <p className="text-sm text-gray-400">Para o mês inteiro (máx. 3)</p>
                  </div>
                </div>
              </button>

              {/* Meta Anual */}
              <button
                onClick={handleYearClick}
                className="w-full border-2 border-[#FFD700]/30 bg-[#FFD700]/5 rounded-2xl p-6 hover:border-[#FFD700] hover:bg-[#FFD700]/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#FFD700]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Award className="w-7 h-7 text-[#FFD700]" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">Meta Anual</h3>
                    <p className="text-sm text-gray-400">Para o ano inteiro (apenas 1)</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 'calendar' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-white mb-2">Selecione a Data</h2>
              <p className="text-gray-400">Escolha o dia para sua meta</p>
            </div>

            <div className="flex justify-center">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-xl border-2 border-[#2a2a2a] bg-[#0B0B0B]"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep('choose')}
                variant="outline"
                className="flex-1 border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
              >
                Voltar
              </Button>
              <Button
                onClick={handleDateConfirm}
                disabled={!selectedDate}
                className="flex-1 bg-[#00FF88] text-black hover:bg-[#00FF88]/90 font-bold"
              >
                Confirmar
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
