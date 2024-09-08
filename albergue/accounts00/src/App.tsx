import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from "@mantine/core";
import Home from "./pages/Home";
import Login from "./pages/LoginPage.tsx";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./hooks/useAuth.tsx";
import ProtectedRoutes from "./components/navigation/ProtectedRoutes";
import Animals from "./pages/Animals.tsx";
import Adoptions from "./pages/Adoptions.tsx";
import Users from "./pages/Users.tsx";

const App: React.FC = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="users/sign_up" element={<SignUp />} />
            <Route path="users/sign_in" element={<Login />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/users/dashboard" element={<Dashboard />} />
              <Route path="/users/animals" element={<Animals />} />
              <Route path="/users/adoptions" element={<Adoptions />} />
              <Route path="/users/adoptions" element={<Adoptions />} />
              <Route path="/users/volunteer" element={<Users />} />
              <Route path="/users/adopter" element={<Users />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  );
};

export default App;
