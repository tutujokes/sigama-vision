import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Check, AlertTriangle, FileText, Calendar, Eye, RefreshCw } from "lucide-react";

type Cert = {
  id: string;
  name: string;
  property: string;
  validUntil?: string; // ISO or human
  status: "valid" | "expiring" | "expired" | "warning";
};

const MOCK_CERTS: Cert[] = [
  { id: "brucelose", name: "Brucelose", property: "Fazenda Santa Clara", validUntil: "15/03/2025", status: "valid" },
  { id: "tuberculose", name: "Tuberculose", property: "Sítio Boa Vista", validUntil: "20/02/2025", status: "valid" },
  { id: "aftosa", name: "Febre Aftosa", property: "Rancho Verde", status: "expiring" },
];

function MiniSparkline({ data = [3, 5, 2, 6, 4] }: { data?: number[] }) {
  const max = Math.max(...data);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d / max) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="h-6 w-20" preserveAspectRatio="none" aria-hidden>
      <polyline
        fill="none"
        stroke="#16a34a"
        strokeWidth={2}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CertificadosProdutor() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Certificados e Documentos</h1>
          <p className="text-sm text-muted-foreground">Gerencie certificados sanitários e documentos da propriedade</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" /> Importar documentos
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" /> Atualizar
          </Button>
        </div>
      </div>

      {/* KPI + status cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {MOCK_CERTS.map((c) => (
          <Card key={c.id} className="overflow-visible">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-muted/30 p-2">
                    {c.status === "valid" && <Check className="h-5 w-5 text-emerald-600" />}
                    {c.status === "expiring" && <AlertTriangle className="h-5 w-5 text-amber-600" />}
                    {c.status === "expired" && <AlertTriangle className="h-5 w-5 text-destructive" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">{c.property}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={c.status === "valid" ? "default" : c.status === "expiring" ? "secondary" : "destructive"}>
                    {c.status === "valid" ? "Válido" : c.status === "expiring" ? "Vence em breve" : "Atenção"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {c.validUntil ? (
                    <>
                      <div>Válido até:</div>
                      <div className="font-medium text-foreground">{c.validUntil}</div>
                    </>
                  ) : (
                    <div className="font-medium text-foreground">Vence em: 5 dias</div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <MiniSparkline data={[2, 3, 3, 4, 5]} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-2 h-4 w-4" /> Ver Certificado
                  </Button>
                  {c.status !== "valid" && (
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" /> Renovar
                    </Button>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{c.property}</div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Documents + History */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Documentos da Propriedade</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> CAR (Cadastro Ambiental Rural)</li>
              <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> Registro da Propriedade</li>
              <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> Licenças Sanitárias</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button size="sm">Gerenciar documentos</Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Histórico de Exames</CardTitle>
                <p className="text-sm text-muted-foreground">Filtros e registros das inspeções realizadas</p>
              </div>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Propriedade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as propriedades</SelectItem>
                    <SelectItem value="santa">Fazenda Santa Clara</SelectItem>
                    <SelectItem value="boa">Sítio Boa Vista</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="brucelose">Brucelose</SelectItem>
                    <SelectItem value="tuberculose">Tuberculose</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Buscar..." className="w-56" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">15/10/2024</div>
                  <div className="text-xs text-muted-foreground">Brucelose — 42 animais</div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm">Ver</Button>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">20/09/2024</div>
                  <div className="text-xs text-muted-foreground">Tuberculose — 27 animais</div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm">Ver</Button>
                </div>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <div className="w-full flex items-center justify-end">
              <Button size="sm">Solicitar Nova Inspeção</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
