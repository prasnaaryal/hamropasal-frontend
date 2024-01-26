import PrivateRoute from "./PrivateRoutes";
import LoginPage from "../pages/Auth/Login";
import ChatInterface from "../pages/User/ChatInterface";
import Upload from "../pages/Admin/Upload";
import MainLayout from "../layouts/Main";
import Setting from "../pages/Settings";

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/ai",
  element: <MainLayout />,
  children: [
    {
      element: <PrivateRoute />,
      children: [
        {
          path: "test",
          element: <LoginPage />,
        },
        {
          path: "chat",
          element: <ChatInterface />,
        },
        {
          path: "upload",
          element: <Upload />,
        },
        {
          path: "settings",
          element: <Setting />,
        },
      ],
    },
  ],
};

export default MainRoutes;
