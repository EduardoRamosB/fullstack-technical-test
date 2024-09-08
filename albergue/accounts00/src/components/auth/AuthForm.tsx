import React from "react";
import { Card, Container, Stack, TextInput, PasswordInput, Button, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
  confirmPassword?: string;
  username?: string;
  role?: string;
}

interface AuthFormProps {
  onSubmit: SubmitHandler<FormValues>;
  fields: {
    username?: boolean;
    confirmPassword?: boolean;
    role?: boolean;
  };
  submitLabel: string;
  isLoading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, fields, submitLabel, isLoading }) => {
  const { control, register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
  const [visible, { toggle }] = useDisclosure(false);
  const password = watch("password");

  return (
    <Container size="xs" style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt="md">
            {fields.role && (
              <Controller
                name="role"
                control={control}
                rules={{ required: "Rol es requerido" }}
                render={({ field }) => (
                  <Select
                    label="Rol"
                    placeholder="Seleccione rol"
                    data={[
                      { value: 'volunteer', label: 'Voluntario' },
                      { value: 'adopter', label: 'Adoptante' }
                    ]}
                    {...field}
                    error={errors.role?.message}
                  />
                )}
              />
            )}

            {fields.username && (
              <TextInput
                label="Username"
                placeholder="Ingrese username"
                {...register("username", { required: "Username es requerido" })}
                error={errors.username?.message}
              />
            )}

            <TextInput
              label="Email"
              placeholder="Ingrese email"
              type="email"
              {...register("email", {
                required: "Email es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email no valido"
                }
              })}
              error={errors.email?.message}
            />

            <PasswordInput
              label="Password"
              description="Al menos 8 caracteres."
              placeholder="Ingrese password"
              visible={visible}
              onVisibilityChange={toggle}
              {...register("password", {
                required: "Password es requerido",
                minLength: {
                  value: 8,
                  message: "Password debe tener al menos 8 caracteres"
                }
              })}
              error={errors.password?.message}
            />

            {fields.confirmPassword && (
              <PasswordInput
                label="Confirmar Password"
                description="Debe ser igual al Password"
                placeholder="Reingrese password"
                visible={visible}
                onVisibilityChange={toggle}
                {...register("confirmPassword", {
                  validate: value => value === password || "Passwords deben ser iguales",
                  minLength: {
                    value: 8,
                    message: "Confirm password debe tener al menos 8 caracteres"
                  }
                })}
                error={errors.confirmPassword?.message}
              />
            )}

            <Button color="violet" fullWidth mt="md" radius="md" type="submit" loading={isLoading}>
              {submitLabel}
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export default AuthForm;
