import React, { useState } from "react";
import { Button, Group, TextInput, PasswordInput, Stack, Notification } from "@mantine/core";
import { User } from "../../types.ts";

interface VolunteerFormProps {
  form: User;
  setForm: (form: User) => void;
  onSubmit: () => void;
  editingVolunteer: User | null;
}

const UsersForm: React.FC<VolunteerFormProps> = ({ form, setForm, onSubmit, editingVolunteer }) => {
  const [notification, setNotification] = useState<{ message: string; color: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const updatedForm: User = {
        ...prevForm,
        [name]: value,
      };
      return updatedForm;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit();
      setNotification({
        message: editingVolunteer ? "Voluntario actualizado" : "Voluntario creado",
        color: "teal",
      });
    } catch (error) {
      console.log(error);
      setNotification({
        message: "Hubo un problema al guardar el voluntario.",
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        {!editingVolunteer && <>
          <TextInput
            name="username"
            label="Username"
            value={form.username || ''}
            onChange={handleChange}
            placeholder="Ingrese username"
            required
          />

          <TextInput
            name="email"
            label="Email"
            type="email"
            value={form.email || ''}
            onChange={handleChange}
            placeholder="Ingrese email"
            required
          />
        </>}

        <TextInput
          name="first_name"
          label="Nombre"
          type="text"
          value={form.first_name || ''}
          onChange={handleChange}
          placeholder="Ingrese nombre"
        />

        <TextInput
          name="last_name"
          label="Apellido"
          type="text"
          value={form.last_name || ''}
          onChange={handleChange}
          placeholder="Ingrese apellido"
        />

        <PasswordInput
          name="password"
          label="Password"
          value={form.password || ''}
          onChange={handleChange}
          placeholder="Password"
          required={editingVolunteer === null}
        />

        <PasswordInput
          name="password_confirmation"
          label="Confirmar Password"
          value={form.password_confirmation || ''}
          onChange={handleChange}
          placeholder="Confirmar Password"
          required={editingVolunteer === null}
        />

        <Group align="right">
          <Button type="submit" color="teal">
            {editingVolunteer ? "Actualizar Voluntario" : "Crear Voluntario"}
          </Button>
        </Group>
      </Stack>

      {notification && (
        <Notification color={notification.color} onClose={() => setNotification(null)}>
          {notification.message}
        </Notification>
      )}
    </form>
  );
};

export default UsersForm;
