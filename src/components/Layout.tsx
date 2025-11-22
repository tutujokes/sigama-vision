import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const hideShell = pathname === "/landing" || pathname.startsWith("/register");

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {!hideShell && (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen pb-20 md:pb-0",
          !hideShell ? "md:pl-64" : "",
          "transition-all duration-300"
        )}
      >
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {!hideShell && (
        <div className="md:hidden">
          <MobileNav />
        </div>
      )}
    </div>
  );
};

export default Layout;
