import React from "react";
import { TextInput, Select, Button } from "@mantine/core";
import { Animal } from "../../types";

interface AnimalFormProps {
  form: {
    name: string;
    age: string;
    breed: string;
    kind: string;
    status: string;
    reason: string;
  };
  setForm: React.Dispatch<React.SetStateAction<{
    name: string;
    age: string;
    breed: string;
    kind: string;
    status: string;
    reason: string;
  }>>;
  onSubmit: () => void;
  editingAnimal?: Animal | null;
}

const AnimalForm: React.FC<AnimalFormProps> = ({ form, setForm, onSubmit, editingAnimal }) => {
  return (
    <>
      <Select
        label="Tipo"
        data={[
          { value: 'dog', label: 'Perro' },
          { value: 'cat', label: 'Gato' }
        ]}
        value={form.kind}
        onChange={(value) => setForm({ ...form, kind: value! })}
        required
      />
      <TextInput
        label="Nombre"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <TextInput
        label="Edad"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
        required
      />
      <TextInput
        label="Raza"
        value={form.breed}
        onChange={(e) => setForm({ ...form, breed: e.target.value })}
        required
      />
      <Select
        label="Estado"
        data={[
          { value: 'waiting', label: 'En espera' },
          { value: 'available', label: 'Disponible' },
          { value: 'pending', label: 'Pendiente' },
          { value: 'adopted', label: 'Adoptado' },
          { value: 'euthanized', label: 'Eutanasiado' },
          { value: 'aggressive', label: 'Agresivo' },
          { value: 'returned', label: 'Regresado' }
        ]}
        value={form.status}
        onChange={(value) => setForm({ ...form, status: value! })}
        required
      />
      <TextInput
        label="Razón"
        value={form.reason}
        onChange={(e) => setForm({ ...form, reason: e.target.value })}
      />
      <Button fullWidth mt="md" onClick={onSubmit}>
        {editingAnimal ? 'Actualizar' : 'Agregar'}
      </Button>
    </>
  );
};

export default AnimalForm;
