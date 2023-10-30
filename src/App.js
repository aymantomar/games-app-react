// import "./App.css";

import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Platforms from "./components/Platforms/Platforms";
import Category from "./components/Category/Category";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import GameContextProvider from "./context/gameContext";
import GameDetails from "./components/GameDetails/GameDetails";
import { QueryClientProvider, QueryClient } from "react-query";
import SortBy from "./components/SortBy/SortBy";
import UserContextProvider from "./context/userContext";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";

const queryClient = new QueryClient();

// {
//   "email": "7amoudayman2015@gmail.com",
//   "password": "Biko@2016"
// }

function App() {
  let routers = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          ),
        },
        {
          path: "/platforms/:type",
          element: (
            <ProtectRoute>
              <Platforms />
            </ProtectRoute>
          ),
        },
        {
          path: "/categories/:category",
          element: (
            <ProtectRoute>
              <Category />
            </ProtectRoute>
          ),
        },
        {
          path: "/sortBy/:sort",
          element: (
            <ProtectRoute>
              <SortBy />
            </ProtectRoute>
          ),
        },
        {
          path: "/gameDetails/:id",
          element: (
            <ProtectRoute>
              <GameDetails />
            </ProtectRoute>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/forgetpassword",
          element: <ForgetPassword />,
        },
        {
          path: "/verifyCode",
          element: <VerifyCode />,
        },
        {
          path: "/resetPassword",
          element: <ResetPassword />,
        },
      ],
    },
  ]);
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <GameContextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </GameContextProvider>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
