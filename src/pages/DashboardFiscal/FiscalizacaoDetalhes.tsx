import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, FileText, Mail, Award, ArrowLeft } from "lucide-react";

export default function FiscalizacaoDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Mocked data for the details view
  const data = {
    id: id ?? "2345",
    status: "conforme",
    datetime: "18/11/2024 09:30",
    fiscal: "João Santos (CRMV 1234)",
    propriedade: {
      nome: "Fazenda Santa Clara",
      proprietario: "Arthur Henrique",
      cpf: "123.456.789-00",
      endereco: "Bacabal, MA",
    },
    rebanho: { bovinos: 142, caprinos: 28, suinos: 0 },
    checklist: [
      "Vacinação antiaftosa em dia",
      "Brucelose - certificado válido até 15/03/25",
      "Tuberculose - certificado válido",
      "Instalações sanitárias adequadas",
      "Registro de animais atualizado",
      "GTAs dos últimos 6 meses em ordem",
    ],
    observacoes:
      "Propriedade em excelente estado sanitário. Produtor colaborativo e todos os documentos em ordem. Recomendado para certificação premium.",
    fotos: ["/images/imperatriz_mapa.png", "/images/imperatriz_mapa.png", "/images/imperatriz_mapa.png"],
    documentos: ["Certificado de Brucelose.pdf", "Registro de Vacinação.pdf"],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
          <h1 className="text-2xl font-bold">Fiscalização #{data.id}</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="whitespace-normal">
              <FileText className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Exportar Relatório PDF</span>
            </Button>
            <Button size="sm" className="whitespace-normal">
              <Mail className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Enviar por Email</span>
            </Button>
            <Button className="bg-gradient-to-r from-primary to-primary-light whitespace-normal" size="sm">
              <Award className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Emitir Certificado</span>
            </Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-4">
                {data.status === "conforme" ? (
                  <Badge className="inline-flex items-center gap-2" variant="outline">
                    <CheckCircle className="w-4 h-4 text-success" /> Conforme
                  </Badge>
                ) : (
                  <Badge className="inline-flex items-center gap-2" variant="destructive">
                    <AlertTriangle className="w-4 h-4" /> {data.status}
                  </Badge>
                )}

                <div className="text-sm text-muted-foreground">Data: {data.datetime}</div>
                <div className="text-sm text-muted-foreground">Fiscal: <span className="font-medium">{data.fiscal}</span></div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Propriedade</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Nome</p>
                    <div className="font-medium">{data.propriedade.nome}</div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Proprietário</p>
                    <div className="font-medium">{data.propriedade.proprietario}</div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">CPF</p>
                    <div className="font-medium">{data.propriedade.cpf}</div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Endereço</p>
                    <div className="font-medium">{data.propriedade.endereco}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Rebanho Inspecionado</h3>
                <ul className="mt-2 list-disc list-inside">
                  <li>{data.rebanho.bovinos} bovinos</li>
                  <li>{data.rebanho.caprinos} caprinos</li>
                  <li>Total: {data.rebanho.bovinos + data.rebanho.caprinos + data.rebanho.suinos} animais</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Checklist de Conformidade</h3>
                <ul className="mt-2 space-y-2">
                  {data.checklist.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" /> <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Observações</h3>
                <p className="text-sm text-muted-foreground mt-2">{data.observacoes}</p>
              </div>
            </div>

            <aside className="w-full md:w-80 space-y-4">
              <div>
                <h4 className="text-sm font-medium">Evidências Fotográficas</h4>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {data.fotos.map((f, i) => (
                    <img key={i} src={f} alt={`Foto ${i + 1}`} className="w-full h-20 object-cover rounded" />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium">Documentos Anexados</h4>
                <ul className="mt-2 space-y-2">
                  {data.documentos.map((d, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="text-sm">{d}</span>
                      <Button variant="outline" size="sm"><FileText className="w-4 h-4 mr-2" /> Abrir</Button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
