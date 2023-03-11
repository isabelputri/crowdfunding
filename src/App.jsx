import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import AllProjectPage from "./pages/AllProjectPage";
import SignUpPage from "./pages/SignUpPage";

// Components
import Nav from "./components/Nav/Nav";

// CSS

import "./App.css";

const HeaderLayout = () => (
  <div>
    <Nav />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/project", element: <AllProjectPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
