import { Settings as SettingsIcon, User, Bell, Shield, Database, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SettingsFiscal = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      /* ignore */
    }
    navigate("/landing");
  };

  // dados estáticos/abstraídos de exemplo
  const profile = {
    name: "João Silva",
    matricula: "SG-12345",
    email: "joaosilva@fiscal.com",
    phone: "(98) 99876-5432",
    regional: "UR São Luís",
    unidade: "Posto Fiscal BR-135",
    role: "Fiscal Estadual",
  };

  const areasAtuacao = [
    "Fiscalização de trânsito animal",
    "Fiscalização de trânsito vegetal",
    "Vistoria de propriedades",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie seu perfil, preferências e parâmetros de fiscalização
        </p>
      </div>

      {/* Perfil do Fiscal */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Perfil do Fiscal</h3>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <Label className="text-sm text-muted-foreground">Nome</Label>
            <div className="flex items-center gap-3">
              <p className="text-foreground font-medium">{profile.name}</p>
              <span className="text-sm text-muted-foreground">
                {profile.email}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Matrícula</Label>
              <p className="text-foreground font-medium">{profile.matricula}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Telefone</Label>
              <p className="text-foreground font-medium">{profile.phone}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Regional</Label>
              <p className="text-foreground font-medium">{profile.regional}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Unidade</Label>
              <p className="text-foreground font-medium">{profile.unidade}</p>
            </div>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Função</Label>
            <p className="text-foreground font-medium">{profile.role}</p>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">
              Áreas de atuação
            </Label>
            <p className="text-foreground text-sm">
              {areasAtuacao.join(" • ")}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button variant="outline">Editar Perfil</Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-destructive"
            >
              Sair
            </Button>
          </div>
        </div>
      </Card>

      {/* Notificações – mesmo layout do gestor/produtor, focado em fiscalização */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Notificações</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label
                htmlFor="fiscal-visits"
                className="text-foreground font-medium"
              >
                Agendamentos de fiscalizações
              </Label>
              <p className="text-sm text-muted-foreground">
                Lembretes de vistorias programadas e prazos de atendimento
              </p>
            </div>
            <Switch id="fiscal-visits" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label
                htmlFor="irregularities"
                className="text-foreground font-medium"
              >
                Irregularidades e pendências
              </Label>
              <p className="text-sm text-muted-foreground">
                Alertas sobre não conformidades em propriedades e GTAs
              </p>
            </div>
            <Switch id="irregularities" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="gta-review" className="text-foreground font-medium">
                Análise de GTAs
              </Label>
              <p className="text-sm text-muted-foreground">
                Notificações sobre GTAs que exigem conferência ou validação
              </p>
            </div>
            <Switch id="gta-review" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label
                htmlFor="weekly-reports"
                className="text-foreground font-medium"
              >
                Relatórios semanais
              </Label>
              <p className="text-sm text-muted-foreground">
                Resumo das fiscalizações realizadas e em aberto
              </p>
            </div>
            <Switch id="weekly-reports" />
          </div>
        </div>
      </Card>

      {/* Segurança – alinhado ao padrão do sistema */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Segurança</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="2fa" className="text-foreground font-medium">
                Autenticação de Dois Fatores
              </Label>
              <p className="text-sm text-muted-foreground">
                Proteja seu acesso aos módulos de fiscalização
              </p>
            </div>
            <Switch id="2fa" />
          </div>

          <Button variant="outline">Alterar Senha</Button>
        </div>
      </Card>

      {/* Dados e Exportação – focado em relatórios de fiscalização */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Dados e Exportação
          </h3>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Exporte relatórios e registros de fiscalização para apoio à gestão e auditoria.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="whitespace-normal">
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Exportar Fiscalizações do Mês</span>
            </Button>
            <Button variant="outline" className="whitespace-normal">
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Exportar GTAs Inspecionadas</span>
            </Button>
            <Button variant="outline" className="whitespace-normal">
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Histórico de Ações Fiscalizatórias</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Informações do Sistema (opcional, se quiser igual ao gestor) */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Informações do Sistema
          </h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Versão</span>
            <span className="text-foreground font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Última Atualização</span>
            <span className="text-foreground font-medium">15 Jan 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Perfil de Acesso</span>
            <span className="text-foreground font-medium">
              Fiscalização – Visão Regional
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsFiscal;
