// third party
import { Navigate, Outlet } from "react-router-dom";

// ==============================|| PRIVATE ROUTING ||============================== //

const PrivateRoute = () => {
  // const userId = localStorage.getItem("user_id");
  const userId = true;

  return userId ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
