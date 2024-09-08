import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import AuthForm from "../components/auth/AuthForm";
import { User } from "../types";
import { signUp } from "../api/users.api";
import { handleApiError } from "../utils/errorHandler";
import { useAuth } from "../hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import { Center } from "@mantine/core";

const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const user: User = {
      username: data.username,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      role: data.role
    };

    setIsLoading(true);

    try {
      const res = await signUp(user);
      if (res.status === 201) {
        const { id, tokens } = res.data;
        login({ id, tokens });
        navigate("/users/dashboard");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout user={null} from="public">
      <Center>
        <h1>Sign up</h1>
      </Center>
      <AuthForm
        onSubmit={onSubmit}
        fields={{ username: true, confirmPassword: true, role: true }}
        submitLabel="Sign Up"
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default SignUp;
