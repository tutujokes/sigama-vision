import { Settings as SettingsIcon, User, Bell, Shield, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // <-- usar Switch, igual gestor
import { Label } from "@/components/ui/label";

const SettingsProdutor = () => {
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

  // abstracted/static data for UI
  const profile = {
    name: "Arthur Henrique Lopes Feitosa",
    cpf: "123.456.789-00",
    email: "arthur@fazenda.com",
    phone: "(98) 98765-4321",
  };

  const properties = [
    { name: "Fazenda Santa Clara", animals: 142 },
    { name: "Sítio Boa Vista", animals: 78 },
    { name: "Rancho Verde", animals: 27 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
        <p className="text-muted-foreground">Gerencie seu perfil e preferências</p>
      </div>

      {/* Perfil */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Perfil</h3>
        </div>

        <div className="space-y-2 text-sm">
          <div>
            <Label className="text-sm text-muted-foreground">Nome</Label>
            <div className="flex items-center gap-3">
              <p className="text-foreground font-medium">{profile.name}</p>
              <span className="text-sm text-muted-foreground">{profile.email}</span>
            </div>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">CPF</Label>
            <p className="text-foreground font-medium">{profile.cpf}</p>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Telefone</Label>
            <p className="text-foreground font-medium">{profile.phone}</p>
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

      {/* Propriedades vinculadas (mantido igual) */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Propriedades Vinculadas</h3>
        </div>
        <ul className="space-y-2 text-sm">
          {properties.map((p) => (
            <li key={p.name} className="flex items-center justify-between">
              <span>
                {p.name}{" "}
                <span className="text-muted-foreground">({p.animals} animais)</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="pt-4">
          <Button variant="outline">+ Adicionar Propriedade</Button>
        </div>
      </Card>

      {/* Notificações – mesma estrutura do Gestor */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Notificações</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label
                htmlFor="vaccination"
                className="text-foreground font-medium"
              >
                Alertas de vacinação
              </Label>
              <p className="text-sm text-muted-foreground">
                Lembretes das próximas vacinas obrigatórias
              </p>
            </div>
            <Switch id="vaccination" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="gta" className="text-foreground font-medium">
                Aprovação de GTAs
              </Label>
              <p className="text-sm text-muted-foreground">
                Notificações sobre aprovação e status das GTAs
              </p>
            </div>
            <Switch id="gta" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label
                htmlFor="certificates"
                className="text-foreground font-medium"
              >
                Vencimento de certificados
              </Label>
              <p className="text-sm text-muted-foreground">
                Avisos próximos ao vencimento de documentos
              </p>
            </div>
            <Switch id="certificates" defaultChecked />
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
                Resumo das atividades da semana
              </p>
            </div>
            <Switch id="weekly-reports" />
          </div>
        </div>
      </Card>

      {/* Segurança – mesma estrutura do Gestor */}
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
                Camada adicional de segurança na sua conta
              </p>
            </div>
            <Switch id="2fa" />
          </div>

          <Button variant="outline">Alterar Senha</Button>
        </div>
      </Card>

      {/* Dados e Exportação – mantém a ideia, mas segue padrão de título/ícone se quiser alinhar ainda mais */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Dados e Exportação
          </h3>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Exporte seus dados para salvar registros e realizar análises.
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline">Exportar Meus Dados</Button>
            <Button variant="outline">Histórico de Atividades</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsProdutor;
