import BlankLayout from "../layouts/Blank";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/Signup";

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <BlankLayout />,
  children: [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
  ],
};

export default AuthenticationRoutes;
