import { Outlet } from "react-router-dom";

// App-level `Layout` already wraps the router in `src/App.tsx`. Avoid mounting it
// again here to prevent duplicate shell elements (sidebar, offsets).
const ProdutorLayout = () => {
  return <Outlet />;
};

export default ProdutorLayout;
