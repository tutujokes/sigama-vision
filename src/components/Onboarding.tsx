import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
}

const steps: OnboardingStep[] = [
  {
    title: "Bem-vindo ao SIGAMA Vision",
    description:
      "Sistema inteligente de monitoramento de Guias de Trânsito Animal do Maranhão com IA integrada. Vamos fazer um tour rápido pelas principais funcionalidades.",
  },
  {
    title: "Monitoramento em Tempo Real",
    description:
      "Acompanhe emissões de GTAs em tempo real, visualize mapas de calor por região e receba alertas instantâneos de atividades suspeitas.",
  },
  {
    title: "Dashboard Analítico",
    description:
      "Analise tendências, visualize métricas de desempenho e compare performance entre as 18 Unidades Regionais do Maranhão.",
  },
  {
    title: "Detecção de Anomalias",
    description:
      "Identificação inteligente de cadastros duplicados, movimentações atípicas e possíveis fraudes através de análise de padrões.",
  },
  {
    title: "Vaqueiro Digital - Assistente de IA",
    description:
      "Faça upload de documentos e deixe a IA extrair dados automaticamente, validar inconsistências e gerar score de conformidade instantâneo.",
  },
];

const Onboarding = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("sigama-onboarding-completed");
    if (!hasSeenOnboarding) {
      setOpen(true);
    }
  }, []);

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleComplete = () => {
    localStorage.setItem("sigama-onboarding-completed", "true");
    setOpen(false);
  };

  const handleSkip = () => {
    localStorage.setItem("sigama-onboarding-completed", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logos/sigama_big_logo.png" alt="SIGAMA" className="h-10 hidden sm:block" />
              <DialogTitle className="text-2xl font-bold text-foreground">
                {steps[currentStep].title}
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-base pt-2">
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>

        {/* Ilustração visual */}
        <div className="py-8 px-4">
          <div className="w-full h-48 rounded-lg bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center animate-scale-in">
                <span className="text-3xl font-bold text-primary-foreground">
                  {currentStep + 1}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Passo {currentStep + 1} de {steps.length}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progresso</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          <div className="flex gap-1">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? "bg-primary w-6"
                    : index < currentStep
                    ? "bg-primary/50"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="gap-2 bg-gradient-to-r from-primary to-primary-light"
          >
            {isLastStep ? (
              <>
                <Check className="w-4 h-4" />
                Começar
              </>
            ) : (
              <>
                Próximo
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {/* Skip button */}
        <div className="text-center pt-2">
          <button
            onClick={handleSkip}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Pular tutorial
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Onboarding;
