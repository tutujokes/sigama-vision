import { Outlet } from "react-router-dom";

// The application already wraps Routes with a global `Layout` in `src/App.tsx`.
// Rendering `Layout` again here caused the sidebar/shell to be mounted twice and
// introduced the extra 256px offset. Render only the child routes via Outlet.

const GestorLayout = () => {
  return <Outlet />;
};

export default GestorLayout;
