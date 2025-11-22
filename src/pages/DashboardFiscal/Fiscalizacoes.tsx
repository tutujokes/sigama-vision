import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  PlusCircle,
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
  AlertTriangle,
  Download,
  Camera,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

function SmallSpark({ data = [3, 5, 2, 6, 4], stroke = "#16a34a" }: { data?: number[]; stroke?: string }) {
  const max = Math.max(...data);
  const points = data
    .map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / max) * 100}`)
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="h-5 w-20" preserveAspectRatio="none" aria-hidden>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Fiscalizacoes() {
  const kpis = [
    { id: "total", label: "Total (mês)", value: 45, spark: [3, 4, 5, 6, 7] },
    { id: "pend", label: "Pend.", value: 8, spark: [1, 2, 3, 2, 1] },
    { id: "confor", label: "Confor", value: 37, spark: [6, 6, 7, 8, 7] },
    { id: "autos", label: "Autos Lavra", value: 3, spark: [0, 0, 1, 1, 0] },
  ];

  const scheduled = [
    {
      id: "s1",
      date: "22/11",
      time: "09:00",
      place: "Fazenda Boa Esperança",
      city: "Bacabal, MA",
      type: "Inspeção Sanitária",
    },
    {
      id: "s2",
      date: "23/11",
      time: "14:00",
      place: "Sítio São José",
      city: "Chapadinha, MA",
      type: "Verificação de Denúncia",
    },
  ];

  const history = [
    {
      id: "h1",
      date: "18/11/2024",
      place: "Fazenda Santa Clara",
      status: "conforme",
      details: "142 animais • Vacinação em dia",
    },
    {
      id: "h2",
      date: "17/11/2024",
      place: "Sítio Boa Vista",
      status: "pendencias",
      details: "78 animais • 3 sem vacinação",
      note: "Prazo para correção: 30 dias",
    },
    {
      id: "h3",
      date: "15/11/2024",
      place: "Rancho Verde",
      status: "auto",
      details: "27 animais • Transporte sem GTA",
      fine: "R$ 5.400,00",
    },
  ];

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    tipo: "",
    nome: "",
    cpfcnpj: "",
    endereco: "",
    animais: "",
    especies: { bovinos: true, caprinos: false, suinos: false },
    checklist: { vacinacao: true, certificados: true, instalacoes: false, registro: true, transporte: false },
    observacoes: "",
    resultado: "conforme",
  });

  const toggleEspecie = (k: "bovinos" | "caprinos" | "suinos") => {
    setForm((s) => ({ ...s, especies: { ...s.especies, [k]: !s.especies[k] } }));
  };

  const toggleChecklist = (k: keyof typeof form.checklist) => {
    setForm((s) => ({ ...s, checklist: { ...s.checklist, [k]: !s.checklist[k] } }));
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fiscalizações</h1>
          <p className="text-sm text-muted-foreground">Registrar e gerenciar fiscalizações em campo</p>
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusCircle className="w-4 h-4 mr-2" />
                Nova Fiscalização
              </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[85vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Registrar Fiscalização</DialogTitle>
                <DialogDescription>Preencha os dados para agendar/registrar uma nova fiscalização em campo.</DialogDescription>
              </DialogHeader>

              <form className="grid gap-4">
                {/* 1. Tipo de Fiscalização */}
                <div>
                  <p className="text-sm font-medium mb-2">1. Tipo de Fiscalização</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" name="tipo" checked={form.tipo === "inspecao"} onChange={() => setForm(f => ({...f, tipo: "inspecao"}))} />
                      Inspeção Sanitária Rotineira
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" name="tipo" checked={form.tipo === "denuncia"} onChange={() => setForm(f => ({...f, tipo: "denuncia"}))} />
                      Verificação de Denúncia
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" name="tipo" checked={form.tipo === "transporte"} onChange={() => setForm(f => ({...f, tipo: "transporte"}))} />
                      Fiscalização de Transporte
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" name="tipo" checked={form.tipo === "vistoria"} onChange={() => setForm(f => ({...f, tipo: "vistoria"}))} />
                      Vistoria de Certificação
                    </label>
                  </div>
                </div>

                {/* 2. Localização */}
                <div>
                  <p className="text-sm font-medium mb-2">2. Localização</p>
                  <div className="space-y-2">
                    <Input placeholder="Buscar propriedade..." />
                    <div className="text-center text-sm text-muted-foreground">ou</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Input placeholder="Nome" value={form.nome} onChange={(e) => setForm(f => ({...f, nome: e.target.value}))} />
                      <Input placeholder="CPF/CNPJ" value={form.cpfcnpj} onChange={(e) => setForm(f => ({...f, cpfcnpj: e.target.value}))} />
                      <Input className="sm:col-span-2" placeholder="Endereço" value={form.endereco} onChange={(e) => setForm(f => ({...f, endereco: e.target.value}))} />
                      <Button variant="outline" className="sm:col-span-2">
                        <MapPin className="w-4 h-4 mr-2" /> Usar Localização Atual
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 3. Informações da Propriedade */}
                <div>
                  <p className="text-sm font-medium mb-2">3. Informações da Propriedade</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Input placeholder="Total de animais" value={form.animais} onChange={(e) => setForm(f => ({...f, animais: e.target.value}))} />
                    <div className="sm:col-span-2 flex items-center gap-4">
                      <label className="inline-flex items-center gap-2"><Checkbox checked={form.especies.bovinos} onCheckedChange={() => toggleEspecie("bovinos")} /> Bovinos</label>
                      <label className="inline-flex items-center gap-2"><Checkbox checked={form.especies.caprinos} onCheckedChange={() => toggleEspecie("caprinos")} /> Caprinos</label>
                      <label className="inline-flex items-center gap-2"><Checkbox checked={form.especies.suinos} onCheckedChange={() => toggleEspecie("suinos")} /> Suínos</label>
                    </div>
                  </div>
                </div>

                {/* 4. Checklist */}
                <div>
                  <p className="text-sm font-medium mb-2">4. Checklist de Verificação</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className="inline-flex items-center gap-2"><Checkbox checked={form.checklist.vacinacao} onCheckedChange={() => toggleChecklist("vacinacao" )} /> Vacinação em dia</label>
                    <label className="inline-flex items-center gap-2"><Checkbox checked={form.checklist.certificados} onCheckedChange={() => toggleChecklist("certificados") } /> Certificados válidos</label>
                    <label className="inline-flex items-center gap-2"><Checkbox checked={form.checklist.instalacoes} onCheckedChange={() => toggleChecklist("instalacoes") } /> Instalações adequadas</label>
                    <label className="inline-flex items-center gap-2"><Checkbox checked={form.checklist.registro} onCheckedChange={() => toggleChecklist("registro") } /> Registro de animais atualizado</label>
                    <label className="inline-flex items-center gap-2"><Checkbox checked={form.checklist.transporte} onCheckedChange={() => toggleChecklist("transporte") } /> Documentos de transporte</label>
                  </div>
                </div>

                {/* 5. Observações */}
                <div>
                  <p className="text-sm font-medium mb-2">5. Observações</p>
                  <Textarea placeholder="Área de texto para notas..." value={form.observacoes} onChange={(e) => setForm(f => ({...f, observacoes: e.target.value}))} />
                </div>

                {/* 6. Evidências */}
                <div>
                  <p className="text-sm font-medium mb-2">6. Evidências</p>
                  <div className="flex items-center gap-2">
                    <input type="file" accept="image/*" className="hidden" id="photo-upload" />
                    <label htmlFor="photo-upload">
                      <Button size="sm">
                        <Camera className="w-4 h-4 mr-2" /> Adicionar Fotos
                      </Button>
                    </label>
                    <input type="file" className="hidden" id="file-upload" />
                    <label htmlFor="file-upload">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" /> Anexar Documentos
                      </Button>
                    </label>
                  </div>
                </div>

                {/* 7. Resultado */}
                <div>
                  <p className="text-sm font-medium mb-2">7. Resultado</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <label className="inline-flex items-center gap-2"><input type="radio" name="resultado" checked={form.resultado === "conforme"} onChange={() => setForm(f => ({...f, resultado: "conforme"}))} /> Conforme</label>
                    <label className="inline-flex items-center gap-2"><input type="radio" name="resultado" checked={form.resultado === "nao"} onChange={() => setForm(f => ({...f, resultado: "nao"}))} /> Não Conforme (pendências)</label>
                    <label className="inline-flex items-center gap-2"><input type="radio" name="resultado" checked={form.resultado === "auto"} onChange={() => setForm(f => ({...f, resultado: "auto"}))} /> Auto de Infração</label>
                  </div>
                </div>

                <DialogFooter>
                  <div className="flex items-center gap-2 w-full">
                    <DialogClose asChild>
                      <Button variant="ghost" className="flex-1">Cancelar</Button>
                    </DialogClose>
                    <Button variant="outline" className="flex-1">Salvar Rascunho</Button>
                    <Button className="flex-1 bg-gradient-to-r from-primary to-primary-light">Finalizar</Button>
                  </div>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Status KPIs */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{k.label}</p>
                <p className="text-2xl font-semibold">{k.value}</p>
              </div>
              <div className="flex flex-col items-end">
                <SmallSpark data={k.spark} />
                <Badge className="mt-2">Mês</Badge>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* Scheduled */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Fiscalizações Agendadas (próximas 7 dias)</h2>
        </div>

        <div className="space-y-2">
          {scheduled.map((s) => (
            <Card key={s.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 font-medium">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{s.date} - {s.time}</span>
                  </div>
                  <div className="font-semibold">{s.place}</div>
                  <div className="text-xs text-muted-foreground">{s.city}</div>
                  <div className="text-sm text-muted-foreground">Tipo: {s.type}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Iniciar Fiscalização
                  </Button>
                  <Link to={`/fiscal/fiscalizacoes/${s.id}`}>
                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* History */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Histórico de Fiscalizações</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="text-xs text-muted-foreground">Filtros:</label>
            <select className="px-2 py-1 border rounded min-w-0">
              <option>Data</option>
            </select>
            <select className="px-2 py-1 border rounded min-w-0">
              <option>Status</option>
            </select>
            <select className="px-2 py-1 border rounded min-w-0">
              <option>Cidade</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          {history.map((h) => (
            <Card key={h.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{h.date} - {h.place}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {h.status === "conforme" && (
                      <span className="inline-flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" /> Conforme
                      </span>
                    )}
                    {h.status === "pendencias" && (
                      <span className="inline-flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning" /> Pendências
                      </span>
                    )}
                    {h.status === "auto" && (
                      <span className="inline-flex items-center gap-2">
                        <Clock className="w-4 h-4 text-destructive" /> Auto de Infração Lavrado
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">{h.details}</div>
                  {h.note && <div className="text-xs text-muted-foreground mt-1">{h.note}</div>}
                  {h.fine && <div className="text-xs text-muted-foreground mt-1">Multa: {h.fine}</div>}
                </div>

                <div className="w-full md:w-auto flex justify-start md:justify-end items-center md:items-end gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link to={`/fiscal/fiscalizacoes/${h.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center whitespace-normal">
                        <FileText className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Ver Relatório</span>
                      </Button>
                    </Link>
                    <Button size="sm" className="flex items-center whitespace-normal">
                      <Download className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Exportar PDF</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <Button variant="ghost" size="sm">&lt;</Button>
            <div className="px-3 py-1 border rounded">1</div>
            <div className="px-3 py-1 border rounded">2</div>
            <div className="px-3 py-1 border rounded">3</div>
            <Button variant="ghost" size="sm">&gt;</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
