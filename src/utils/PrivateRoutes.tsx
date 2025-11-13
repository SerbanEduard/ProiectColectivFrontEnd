import { Navigate, Outlet } from "react-router-dom";
import { getStoredToken, isTokenValid } from "./TokenHandlers";

const PrivateRoutes = ({defaultRoute}: {defaultRoute: string}) => {
  const token = getStoredToken();

  return isTokenValid(token) ? <Outlet /> : <Navigate to={defaultRoute} replace />;
};

export default PrivateRoutes;