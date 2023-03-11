import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState } from "react";

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

const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(
    window.localStorage.getItem("token") != null
  );

  return (
    <>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
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
