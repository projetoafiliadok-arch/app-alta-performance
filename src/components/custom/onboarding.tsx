'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingProps {
  onComplete: (answers: OnboardingAnswers) => void;
}

export interface OnboardingAnswers {
  // BLOCO 1 - Tipo de procrastinação
  procrastinationType: string;
  selfDescription: string;
  
  // BLOCO 2 - Energia e realidade
  concentrationTime: string;
  failureResponse: string;
  
  // BLOCO 3 - Dor real
  mainPains: string[];
  futureConsequence: string;
  
  // BLOCO 4 - Compromisso
  dailyCommitment: string;
  focusArea: string;
  
  // BLOCO 5 - Consentimento
  coachTone: string;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({
    mainPains: []
  });

  const totalSteps = 9;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers as OnboardingAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!answers.procrastinationType;
      case 2:
        return !!answers.selfDescription;
      case 3:
        return !!answers.concentrationTime;
      case 4:
        return !!answers.failureResponse;
      case 5:
        return answers.mainPains && answers.mainPains.length > 0;
      case 6:
        return !!answers.futureConsequence;
      case 7:
        return !!answers.dailyCommitment;
      case 8:
        return !!answers.focusArea;
      case 9:
        return !!answers.coachTone;
      default:
        return false;
    }
  };

  const handlePainToggle = (pain: string) => {
    const currentPains = answers.mainPains || [];
    if (currentPains.includes(pain)) {
      setAnswers({
        ...answers,
        mainPains: currentPains.filter(p => p !== pain)
      });
    } else if (currentPains.length < 2) {
      setAnswers({
        ...answers,
        mainPains: [...currentPains, pain]
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Quando você não faz o que planejou, o que geralmente acontece?</h2>
              <p className="text-gray-400 text-sm">Escolha uma opção</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'analytical', label: 'Fico preso pensando demais antes de começar' },
                { value: 'impulsive', label: 'Começo animado e abandono no meio' },
                { value: 'distracted', label: 'Me distraio com algo fácil (celular, vídeos, jogos)' },
                { value: 'avoidant', label: 'Evito porque acho que não vou fazer bem' },
                { value: 'forgetful', label: 'Simplesmente esqueço ou empurro' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setAnswers({ ...answers, procrastinationType: option.value })}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    answers.procrastinationType === option.value
                      ? 'bg-[#00FF88]/10 border-[#00FF88] text-white'
                      : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Qual frase mais te descreve?</h2>
              <p className="text-gray-400 text-sm">Seja honesto consigo mesmo</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'know-dont-do', label: '"Eu sei o que fazer, só não faço"' },
                { value: 'start-dont-finish', label: '"Começo muitas coisas, termino poucas"' },
                { value: 'wait-perfect', label: '"Espero o momento perfeito"' },
                { value: 'error-discourage', label: '"Quando erro, desanimo"' },
                { value: 'no-routine', label: '"Não tenho rotina nenhuma"' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setAnswers({ ...answers, selfDescription: option.value })}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    answers.selfDescription === option.value
                      ? 'bg-[#00FF88]/10 border-[#00FF88] text-white'
                      : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Em um dia comum, quanto tempo REAL você consegue se concentrar?</h2>
              <p className="text-gray-400 text-sm">Seja realista, não otimista</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: '15-30', label: '15–30 minutos' },
                { value: '30-60', label: '30–60 minutos' },
                { value: '1-2h', label: '1–2 horas' },
                { value: '2h+', label: 'Mais de 2 horas' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setAnswers({ ...answers, concentrationTime: option.value })}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    answers.concentrationTime === option.value
                      ? 'bg-[#00FF88]/10 border-[#00FF88] text-white'
                      : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Quando você falha, o que faz em seguida?</h2>
              <p className="text-gray-400 text-sm">Isso define como o Coach vai te tratar</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'self-blame', label: 'Me culpo e travo' },
                { value: 'ignore', label: 'Ignoro e sigo como se nada tivesse acontecido' },
                { value: 'overcompensate', label: 'Tento compensar exagerando' },
                { value: 'give-up', label: 'Desisto da meta' },
                { value: 'adjust', label: 'Ajusto e continuo' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setAnswers({ ...answers, failureResponse: option.value })}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    answers.failureResponse === option.value
                      ? 'bg-[#00FF88]/10 border-[#00FF88] text-white'
                      : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">O que mais te incomoda hoje por causa da procrastinação?</h2>
              <p className="text-gray-400 text-sm">Pode marcar até 2 opções</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'anxiety', label: 'Ansiedade / culpa constante' },
                { value: 'behind', label: 'Sensação de estar atrasado na vida' },
                { value: 'discipline', label: 'Falta de disciplina' },
                { value: 'opportunities', label: 'Perda de oportunidades' },
                { value: 'self-esteem', label: 'Autoestima baixa' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => handlePainToggle(option.value)}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    answers.mainPains?.includes(option.value)
                      ? 'bg-[#00FF88]/10 border-[#00FF88] text-white'
                      : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {answers.mainPains && answers.mainPains.length > 0 && (
              <p className="text-sm text-gray-500 text-center">
                {answers.mainPains.length}/2 selecionadas
              </p>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Se você continuar exatamente como está por mais 1 ano, o que acontece?</h2>
              <p className="text-gray-400 text-sm">Seja brutalmente honesto</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'nothing', label: 'Nada muda' },
                { value: 'frustrated', label: 'Fico frustrado, mas sobrevivo' },
                { value: 'lose-important', label: 'Perco algo importante' },
                { value: 'regret', label: 'Vou me arrepender muito' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setAnswers({ ...answers, futureConsequence: option.value })}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    answers.futureConsequence === option.value
                      ? 'bg-[#FF6B00]/10 border-[#FF6B00] text-white'
                      : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Qual dessas você está disposto a fazer TODOS os dias?</h2>
              <p className="text-gray-400 text-sm">Sem choro. O app vai cobrar isso de você.</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: '10min', label: '10 minutos' },
                { value: '25min', label: '25 minutos' },
                { value: '45min', label: '45 minutos' },
                { value: '1h', label: '1 hora' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setAnswers({ ...answers, dailyCommitment: option.value })}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    answers.dailyCommitment === option.value
                      ? 'bg-[#00FF88]/10 border-[#00FF88] text-white'
                      : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">O que você mais quer melhorar primeiro?</h2>
              <p className="text-gray-400 text-sm">Apenas 1 área de foco</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'study', label: 'Estudo' },
                { value: 'work', label: 'Trabalho / carreira' },
                { value: 'health', label: 'Corpo / saúde' },
                { value: 'habits', label: 'Controle de vícios' },
                { value: 'organization', label: 'Organização pessoal' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setAnswers({ ...answers, focusArea: option.value })}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    answers.focusArea === option.value
                      ? 'bg-[#00FF88]/10 border-[#00FF88] text-white'
                      : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Como você quer que o Coach te trate quando você falhar?</h2>
              <p className="text-gray-400 text-sm">Isso define o tom das mensagens</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'direct-hard', label: 'Direto e duro' },
                { value: 'firm-fair', label: 'Firme, mas justo' },
                { value: 'calm-rational', label: 'Calmo e racional' },
                { value: 'gentle-reminder', label: 'Só me lembre, sem pressão' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setAnswers({ ...answers, coachTone: option.value })}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    answers.coachTone === option.value
                      ? 'bg-[#00FF88]/10 border-[#00FF88] text-white'
                      : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-6">
              <p className="text-yellow-500 text-sm font-medium">
                ⚠️ Aviso: O Coach vai te cobrar com base nas suas respostas. Seja honesto.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center p-4">
      <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-8 max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Pergunta {currentStep} de {totalSteps}</span>
            <span className="text-sm text-[#00FF88] font-bold">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00FF88] to-[#00D4FF] transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentStep > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 bg-[#2a2a2a] border-[#3a3a3a] text-white hover:bg-[#3a3a3a]"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 ${
              canProceed()
                ? 'bg-[#00FF88] text-black hover:bg-[#00FF88]/90'
                : 'bg-[#2a2a2a] text-gray-600 cursor-not-allowed'
            }`}
          >
            {currentStep === totalSteps ? 'Começar' : 'Próxima'}
            {currentStep < totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}
