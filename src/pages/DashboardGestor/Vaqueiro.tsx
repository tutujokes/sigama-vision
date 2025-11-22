import { useState } from "react";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { LuBrain, LuFileText } from "react-icons/lu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  produtor: string;
  cpf: string;
  animais: number;
  especie: string;
  origem: string;
  destino: string;
  valor: string;
  score: number;
  inconsistencias: string[];
}

const Vaqueiro = () => {
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const mockAnalysis = (): AnalysisResult => {
    const scores = [85, 92, 78, 95, 88];
    const score = scores[Math.floor(Math.random() * scores.length)];
    
    const inconsistencias = score < 85 
      ? ["Valor de animal diverge da média regional (-15%)", "Data de emissão fora do padrão"]
      : score < 90
      ? ["Pequena divergência no peso médio dos animais"]
      : [];

    return {
      produtor: "João da Silva Santos",
      cpf: "123.456.789-00",
      animais: 47,
      especie: "Bovinos",
      origem: "Fazenda Santa Rita - Imperatriz/MA",
      destino: "Frigorífico Maranhão - São Luís/MA",
      valor: "R$ 94.000,00",
      score,
      inconsistencias,
    };
  };

  const handleFileUpload = () => {
    setAnalyzing(true);
    
    setTimeout(() => {
      const mockResult = mockAnalysis();
      setResult(mockResult);
      setAnalyzing(false);
      
      toast({
        title: "Análise Concluída",
        description: `Documento processado com score de ${mockResult.score}%`,
      });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-[#E8EDEB] flex items-center justify-center">
          <LuBrain className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vaqueiro Digital</h1>
          <p className="text-muted-foreground">Assistente de IA para análise de documentos agropecuários</p>
        </div>
      </div>

      {/* Upload Area */}
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Upload className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Faça upload do documento para análise
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            O Vaqueiro Digital irá extrair automaticamente os dados, validar inconsistências e comparar com padrões históricos.
          </p>
          <Button
            onClick={handleFileUpload}
            disabled={analyzing}
            className="bg-gradient-to-r from-primary to-primary-light"
          >
            {analyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                Analisando documento...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Selecionar Documento
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Analysis Result */}
      {result && (
        <div className="space-y-4 animate-in fade-in duration-500">
          {/* Score Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Score de Conformidade</h3>
                <p className="text-muted-foreground text-sm">Baseado em análise de padrões históricos</p>
              </div>
              <div className="text-center">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${
                    result.score >= 90
                      ? "bg-success/20 text-success"
                      : result.score >= 80
                      ? "bg-warning/20 text-warning"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {result.score}%
                </div>
                <Badge
                  variant="outline"
                  className={`mt-2 ${
                    result.score >= 90
                      ? "bg-success/10 text-success border-success/20"
                      : result.score >= 80
                      ? "bg-warning/10 text-warning border-warning/20"
                      : "bg-destructive/10 text-destructive border-destructive/20"
                  }`}
                >
                  {result.score >= 90 ? "Aprovado" : result.score >= 80 ? "Atenção" : "Revisão Necessária"}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Dados Extraídos */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <LuFileText className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Dados Extraídos</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Produtor</p>
                  <p className="text-sm font-medium text-foreground">{result.produtor}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">CPF</p>
                  <p className="text-sm font-medium text-foreground">{result.cpf}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Quantidade de Animais</p>
                  <p className="text-sm font-medium text-foreground">{result.animais}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Espécie</p>
                  <p className="text-sm font-medium text-foreground">{result.especie}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Origem</p>
                  <p className="text-sm font-medium text-foreground">{result.origem}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Destino</p>
                  <p className="text-sm font-medium text-foreground">{result.destino}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Valor Total</p>
                  <p className="text-sm font-medium text-foreground">{result.valor}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Validação */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              {result.inconsistencias.length === 0 ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <h3 className="text-lg font-semibold text-foreground">Validação Completa</h3>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <h3 className="text-lg font-semibold text-foreground">Inconsistências Detectadas</h3>
                </>
              )}
            </div>
            {result.inconsistencias.length === 0 ? (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                <p className="text-sm text-foreground">
                  Todos os dados estão consistentes com os padrões históricos. Documento aprovado para processamento.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {result.inconsistencias.map((inconsistencia, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/20"
                  >
                    <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{inconsistencia}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Ações */}
          <div className="flex gap-3">
            <Button className="flex-1" variant="outline">
              Exportar Relatório
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-primary to-primary-light">
              Aprovar e Processar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vaqueiro;
