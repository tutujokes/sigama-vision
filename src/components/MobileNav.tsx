import { Activity, BarChart3, AlertTriangle, Settings } from "lucide-react";
import { LuFileText } from "react-icons/lu";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const gestorNav = [
  { name: "Monitor", href: "/gestor/monitoring", icon: Activity },
  { name: "Analytics", href: "/gestor/analytics", icon: BarChart3 },
  { name: "Alertas", href: "/gestor/anomalies", icon: AlertTriangle },
  { name: "Vaqueiro", href: "/gestor/vaqueiro", icon: LuFileText },
  { name: "Config", href: "/gestor/settings", icon: Settings },
];

const produtorNav = [
  { name: "Rebanho", href: "/produtor/rebanho", icon: Activity },
  { name: "GTAs", href: "/produtor/gtas", icon: BarChart3 },
  { name: "Certificados", href: "/produtor/certificados", icon: AlertTriangle },
  { name: "Config", href: "/produtor/settings", icon: Settings },
];

const fiscalNav = [
  { name: "Monitor", href: "/fiscal/monitoring", icon: Activity },
  { name: "Vaqueiro", href: "/fiscal/vaqueiro", icon: LuFileText },
  { name: "Fiscaliz.", href: "/fiscal/fiscalizacoes", icon: AlertTriangle },
  { name: "Config", href: "/fiscal/settings", icon: Settings },
];

const MobileNav = () => {
  const { pathname } = useLocation();

  let navigation = gestorNav;

  try {
    const raw = localStorage.getItem("sigama_user");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.role) {
        if (parsed.role === "produtor") navigation = produtorNav;
        else if (parsed.role === "fiscal") navigation = fiscalNav;
        else navigation = gestorNav;
      }
    } else {
      if (pathname.startsWith("/produtor")) navigation = produtorNav;
      else if (pathname.startsWith("/fiscal")) navigation = fiscalNav;
      else navigation = gestorNav;
    }
  } catch (e) {
    if (pathname.startsWith("/produtor")) navigation = produtorNav;
    else if (pathname.startsWith("/fiscal")) navigation = fiscalNav;
    else navigation = gestorNav;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around px-2 py-3">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all",
              "text-muted-foreground"
            )}
            activeClassName="text-primary"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
