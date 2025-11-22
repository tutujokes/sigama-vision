import { BarChart3, Activity, AlertTriangle, Settings, Users, FileText } from "lucide-react";
import { LuFileText } from "react-icons/lu";
import { FaCow } from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { useLocation } from "react-router-dom";

const gestorNav = [
  { name: "Monitoramento", href: "/gestor/monitoring", icon: Activity },
  { name: "Dashboard Analítico", href: "/gestor/analytics", icon: BarChart3 },
  { name: "Anomalias", href: "/gestor/anomalies", icon: AlertTriangle },
  { name: "Vaqueiro Digital", href: "/gestor/vaqueiro", icon: LuFileText },
  { name: "Configurações", href: "/gestor/settings", icon: Settings },
];

const produtorNav = [
  { name: "Meu Rebanho", href: "/produtor/rebanho", icon: FaCow },
  { name: "GTAs", href: "/produtor/gtas", icon: FileText },
  { name: "Certificados", href: "/produtor/certificados", icon: GrCertificate },
  { name: "Configurações", href: "/produtor/settings", icon: Settings },
];

const fiscalNav = [
  { name: "Monitoramento", href: "/fiscal/monitoring", icon: Activity },
  { name: "Vaqueiro Digital", href: "/fiscal/vaqueiro", icon: LuFileText },
  { name: "Fiscalizações", href: "/fiscal/fiscalizacoes", icon: FileText },
  { name: "Configurações", href: "/fiscal/settings", icon: Settings },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  let navigation = gestorNav;
  let userName = "Gestor Coordenador";
  let userEmail = "gestor@aged.ma.gov.br";

  // prefer demo user from localStorage when available
  try {
    const raw = localStorage.getItem("sigama_user");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.email) {
        userEmail = parsed.email;
        userName = parsed.email.split("@")[0];
      }
      if (parsed && parsed.role) {
        if (parsed.role === "produtor") navigation = produtorNav;
        else if (parsed.role === "fiscal") navigation = fiscalNav;
        else navigation = gestorNav;
      }
    } else {
      if (pathname.startsWith("/produtor")) {
        navigation = produtorNav;
        userName = "Produtor Rural";
        userEmail = "produtor@exemplo.local";
      } else if (pathname.startsWith("/fiscal")) {
        navigation = fiscalNav;
        userName = "Fiscal / Servidor";
        userEmail = "fiscal@aged.ma.gov.br";
      }
    }
  } catch (e) {
    // fallback to pathname-based info
    if (pathname.startsWith("/produtor")) {
      navigation = produtorNav;
      userName = "Produtor Rural";
      userEmail = "produtor@exemplo.local";
    } else if (pathname.startsWith("/fiscal")) {
      navigation = fiscalNav;
      userName = "Fiscal / Servidor";
      userEmail = "fiscal@aged.ma.gov.br";
    }
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10">
                <img src="/logos/sigama_small_logo.png" alt="SIGAMA" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">SIGAMA Vision</h1>
                <p className="text-xs text-muted-foreground">Sistema de Monitoramento</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/"}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              activeClassName="bg-primary/10 text-primary font-medium"
            >
              <span className="w-5 h-5 text-current fill-current stroke-current">
                <item.icon className="w-5 h-5" />
              </span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">{userName.split(" ")[0].charAt(0)}{userName.split(" ")[1]?.charAt(0) ?? ""}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
