import React from 'react';
import { Button, Select, TextInput, Stack } from '@mantine/core';
import { Adoption } from '../../types';

interface Props {
  form: Partial<Adoption>;
  setForm: (form: Partial<Adoption>) => void;
  onSubmit: () => void;
  editingAdoption: Adoption | null;
}

const AdoptionForm: React.FC<Props> = ({ form, setForm, onSubmit, editingAdoption }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}>
      <Stack align="md">
        <Select
          label="Animal"
          value={form.animal?.toString() || ''}
          onChange={(value) => setForm({ ...form, animal: Number(value) })}
          data={[{ value: '1', label: 'Animal 1' }, { value: '2', label: 'Animal 2' }]} // Estos valores deben venir del backend
          placeholder="Selecciona un animal"
          required
        />

        <Select
          label="Voluntario"
          value={form.volunteer?.toString() || ''}
          onChange={(value) => setForm({ ...form, volunteer: Number(value) })}
          data={[{ value: '1', label: 'Voluntario 1' }, { value: '2', label: 'Voluntario 2' }]} // Estos valores deben venir del backend
          placeholder="Selecciona un voluntario"
          required
        />

        <Select
          label="Adoptante"
          value={form.adopter?.toString() || ''}
          onChange={(value) => setForm({ ...form, adopter: Number(value) })}
          data={[{ value: '1', label: 'Adoptante 1' }, { value: '2', label: 'Adoptante 2' }]} // Estos valores deben venir del backend
          placeholder="Selecciona un adoptante"
          required
        />

        <TextInput
          label="Estado"
          value={form.status || ''}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          placeholder="Estado de la adopción"
          required
        />

        <Button type="submit">{editingAdoption ? 'Actualizar' : 'Crear'} Adopción</Button>
      </Stack>
    </form>
  );
};

export default AdoptionForm;
