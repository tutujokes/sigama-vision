import React, { useMemo, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Download, Search, MoreHorizontal, FileText, DownloadCloud, XCircle, MapPin, CheckCircle } from "lucide-react";
import { FiAlertTriangle } from "react-icons/fi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";

const MiniSparkline = ({ points = [3,5,4,6,5,7,6], color = '#10B981' }: { points?: number[]; color?: string }) => {
  const max = Math.max(...points);
  const w = 60;
  const h = 18;
  const gap = w / (points.length - 1);
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * gap} ${h - (p / max) * h}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="inline-block align-middle">
      <path d={path} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

type Gta = {
  id: string;
  number: string;
  date: string;
  origin: string;
  destination: string;
  animals: number;
  speciesSummary?: string;
  status: 'Aprovada' | 'Pendente' | 'Rejeitada' | 'Em Processamento';
};

const GtasPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [propertyFilter, setPropertyFilter] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  // modal state / form
  const [modalOpen, setModalOpen] = useState(false);
  const [origin, setOrigin] = useState<string>('Fazenda Santa Clara');
  const [destinationSearch, setDestinationSearch] = useState<string>('');
  const [transportToFridge, setTransportToFridge] = useState(false);
  const [species, setSpecies] = useState<string | undefined>('Bovinos');
  const [quantity, setQuantity] = useState<number>(1);
  const [purposeAbate, setPurposeAbate] = useState(false);
  const [purposeCria, setPurposeCria] = useState(false);
  const [purposeRepro, setPurposeRepro] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const pageSize = 6;

  const gtas = useMemo<Gta[]>(() => [
    { id: '1', number: '#2345', date: '18/11/2025', origin: 'Fazenda Santa Clara', destination: 'Frigorífico São João', animals: 8, speciesSummary: '8 bovinos', status: 'Aprovada' },
    { id: '2', number: '#2344', date: '17/11/2025', origin: 'Sítio Verde', destination: 'Fazenda Santa Clara', animals: 3, speciesSummary: '3 caprinos', status: 'Pendente' },
    { id: '3', number: '#2343', date: '16/11/2025', origin: 'Fazenda A', destination: 'Fazenda B', animals: 15, speciesSummary: '15 bovinos', status: 'Em Processamento' },
    { id: '4', number: '#2342', date: '15/11/2025', origin: 'Fazenda C', destination: 'Abate Ltda', animals: 12, speciesSummary: '12 suínos', status: 'Rejeitada' },
    { id: '5', number: '#2341', date: '14/11/2025', origin: 'Sítio X', destination: 'Sítio Y', animals: 5, speciesSummary: '5 bovinos', status: 'Aprovada' },
    { id: '6', number: '#2340', date: '13/11/2025', origin: 'Fazenda Z', destination: 'Fazenda Santa Clara', animals: 2, speciesSummary: '2 caprinos', status: 'Pendente' },
    { id: '7', number: '#2339', date: '12/11/2025', origin: 'Rancho Alfa', destination: 'Frigorífico Beta', animals: 20, speciesSummary: '20 bovinos', status: 'Aprovada' },
  ], []);

  const filtered = useMemo(() => {
    return gtas.filter(g => {
      if (statusFilter && statusFilter !== 'all' && g.status !== statusFilter) return false;
      if (dateFilter && dateFilter !== 'all' && !g.date.includes(dateFilter)) return false; // simple
      if (propertyFilter && propertyFilter !== 'all' && !(g.origin.toLowerCase().includes((propertyFilter || '').toLowerCase()) || g.destination.toLowerCase().includes((propertyFilter || '').toLowerCase()))) return false;
      if (search && !`${g.number} ${g.origin} ${g.destination} ${g.speciesSummary}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [gtas, statusFilter, dateFilter, propertyFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  // KPI totals for small cards
  const totalThisMonth = gtas.length;
  const pending = gtas.filter(g => g.status === 'Pendente').length;
  const approved = gtas.filter(g => g.status === 'Aprovada').length;
  const rejected = gtas.filter(g => g.status === 'Rejeitada').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minhas GTAs</h1>
          <p className="text-sm text-muted-foreground">Emitir, acompanhar e gerenciar suas GTAs</p>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="inline-flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Emitir Nova GTA
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Emitir Nova GTA</DialogTitle>
                <DialogDescription>Preencha os dados abaixo para gerar a e‑GTA.</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label>1. Origem</Label>
                  <Select onValueChange={(v) => setOrigin(v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder={origin} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fazenda Santa Clara">Fazenda Santa Clara</SelectItem>
                      <SelectItem value="Sítio Verde">Sítio Verde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>2. Destino</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Buscar propriedade..." value={destinationSearch} onChange={(e) => setDestinationSearch(e.target.value)} />
                    <div className="flex items-center gap-2">
                      <Checkbox checked={transportToFridge} onCheckedChange={(v) => setTransportToFridge(Boolean(v))} />
                      <span className="text-sm text-muted-foreground">Transporte para Frigorífico</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>3. Animais</Label>
                  <div className="flex gap-2 items-center">
                    <div className="w-40">
                      <Select onValueChange={(v) => setSpecies(v)}>
                        <SelectTrigger className="w-full"><SelectValue placeholder={species} /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bovinos">Bovinos</SelectItem>
                          <SelectItem value="Caprinos">Caprinos</SelectItem>
                          <SelectItem value="Suínos">Suínos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-32">
                      <Input type="number" min={1} value={String(quantity)} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))} />
                    </div>
                    <div className="ml-4 text-sm text-muted-foreground">Resumo: <strong>{quantity} {species?.toLowerCase()}</strong></div>
                  </div>
                </div>

                <div>
                  <Label>4. Finalidade</Label>
                  <div className="flex gap-4 items-center">
                    <label className="flex items-center gap-2"><Checkbox checked={purposeAbate} onCheckedChange={(v) => setPurposeAbate(Boolean(v))} /> Abate</label>
                    <label className="flex items-center gap-2"><Checkbox checked={purposeCria} onCheckedChange={(v) => setPurposeCria(Boolean(v))} /> Cria/Engorda</label>
                    <label className="flex items-center gap-2"><Checkbox checked={purposeRepro} onCheckedChange={(v) => setPurposeRepro(Boolean(v))} /> Reprodução</label>
                  </div>
                </div>

                <div>
                  <Label>5. Documentos Sanitários</Label>
                  <div className="flex items-center gap-2">
                    {/* hidden native input triggered by button to avoid long filename overflow */}
                    <input
                      id="gta-files"
                      type="file"
                      multiple
                      className="hidden"
                      ref={useRef<HTMLInputElement | null>(null) as any}
                      onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    />
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded border px-3 py-1 text-sm"
                      onClick={() => {
                        const el = document.getElementById('gta-files') as HTMLInputElement | null;
                        el?.click();
                      }}
                    >
                      Procurar...
                    </button>
                    <div className="text-sm text-muted-foreground truncate max-w-[50%]">{files.length > 0 ? files.map(f => f.name).join(', ') : `${files.length} arquivo(s) anexados`}</div>
                  </div>
                </div>

                <div className="rounded-md border p-3 bg-muted/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Taxa estimada</div>
                      <div className="text-xl font-semibold">R$ {(4 + 3.5 * quantity).toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">(R$ 4,00 base + R$ 3,50 × {quantity} animais)</div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <div className="flex items-center justify-between w-full">
                  <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
                  <div className="flex gap-2">
                    <Button variant="default" onClick={() => { console.log('Gerar e-GTA', { origin, destinationSearch, transportToFridge, species, quantity, purposeAbate, purposeCria, purposeRepro, files }); setModalOpen(false); }}>
                      Gerar e‑GTA
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-50 p-2">
              <IoCheckmarkDoneSharp className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalThisMonth}</div>
              <div className="text-sm text-muted-foreground">Total (mês)</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className="text-xs">mês</Badge>
            <MiniSparkline />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-50 p-2">
              <FiAlertTriangle className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <div className="text-2xl font-bold">{pending}</div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="text-xs">em análise</Badge>
            <MiniSparkline points={[2,3,3,1,2,4]} color="#F59E0B" />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-50 p-2">
              <IoMdCheckmark className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <div className="text-2xl font-bold">{approved}</div>
              <div className="text-sm text-muted-foreground">Aprovadas</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="text-xs">concluídas</Badge>
            <MiniSparkline points={[4,5,7,6,8,7]} color="#10B981" />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-rose-50 p-2">
              <FaXmark className="w-4 h-4 text-rose-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{rejected}</div>
              <div className="text-sm text-muted-foreground">Rejeitadas</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="text-xs">ação</Badge>
            <MiniSparkline points={[1,1,2,1,0]} color="#EF4444" />
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
          <div className="w-full md:w-48">
            <label className="text-sm text-muted-foreground block mb-1">Status</label>
            <Select onValueChange={(v) => { setStatusFilter(v === 'all' ? undefined : v); setPage(1); }}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Todos" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Aprovada">Aprovada</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Rejeitada">Rejeitada</SelectItem>
                <SelectItem value="Em Processamento">Em Processamento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-48">
            <label className="text-sm text-muted-foreground block mb-1">Data</label>
            <Select onValueChange={(v) => { setDateFilter(v === 'all' ? undefined : v); setPage(1); }}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Últimos 30 dias" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Últimos 30 dias</SelectItem>
                <SelectItem value="11/2025">Novembro 2025</SelectItem>
                <SelectItem value="10/2025">Outubro 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-48">
            <label className="text-sm text-muted-foreground block mb-1">Propriedade</label>
            <Select onValueChange={(v) => { setPropertyFilter(v === 'all' ? undefined : v); setPage(1); }}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Todas" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Fazenda Santa Clara">Fazenda Santa Clara</SelectItem>
                <SelectItem value="Sítio Verde">Sítio Verde</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm text-muted-foreground block mb-1">Buscar</label>
            <div className="flex gap-2">
              <Input placeholder="Número, origem, destino..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
              <Button variant="outline" size="sm"><Search className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Origem → Destino</TableHead>
                <TableHead>Animais</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageItems.map(g => (
                <TableRow key={g.id}>
                  <TableCell className="font-medium">{g.number}</TableCell>
                  <TableCell>{g.date}</TableCell>
                  <TableCell>{g.origin} → {g.destination}</TableCell>
                  <TableCell>{g.animals} • <span className="text-muted-foreground text-sm">{g.speciesSummary}</span></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {g.status === 'Aprovada' && (
                        <Badge className="bg-emerald-50 text-emerald-700 flex items-center gap-2"><IoMdCheckmark className="w-4 h-4" />Aprovada</Badge>
                      )}
                              {g.status === 'Pendente' && (
                                <Badge className="bg-amber-50 text-amber-700 flex items-center gap-2"><FiAlertTriangle className="w-4 h-4" />Pendente</Badge>
                              )}
                      {g.status === 'Rejeitada' && (
                        <Badge className="bg-rose-50 text-rose-700 flex items-center gap-2"><FaXmark className="w-4 h-4" />Rejeitada</Badge>
                      )}
                      {g.status === 'Em Processamento' && <Badge className="bg-sky-50 text-sky-700">Processando</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex h-full items-center justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                          <DropdownMenuItem><FileText className="w-4 h-4 mr-2 inline-block" />Download PDF</DropdownMenuItem>
                          <DropdownMenuItem>Rastrear Status</DropdownMenuItem>
                          <DropdownMenuItem>Cancelar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4">
            <Pagination className="w-full">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink isActive={i + 1 === page} onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => setPage((p) => Math.min(totalPages, p + 1))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GtasPage;
