import { Outlet } from "react-router-dom";

// Avoid re-rendering the global Layout here — App already wraps the routes with it.
const FiscalLayout = () => {
  return <Outlet />;
};

export default FiscalLayout;
