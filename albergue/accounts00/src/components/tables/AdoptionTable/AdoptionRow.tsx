// src/components/AdoptionTable/AdoptionRow.tsx
import React from 'react';
import { Table, Anchor, ActionIcon, Group, Select, Progress, Text } from '@mantine/core';
import { IconPencil, IconCheck, IconX } from '@tabler/icons-react';
import { User } from '../../../types.ts';

interface Adoption {
  id: number;
  animal: {
    name: string;
  };
  adopter: {
    full_name: string;
  };
  status: string;
}

interface AdoptionRowProps {
  user: User;
  adoption: Adoption;
  editingAdoptionId: number | null;
  editedStatus: string;
  handleEdit: (adoption: Adoption) => void;
  setEditingAdoptionId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditedStatus: React.Dispatch<React.SetStateAction<string>>;
}

const statusOptions = [
  { value: 'requested', label: 'Solicitado' },
  { value: 'in_progress', label: 'En Proceso' },
  { value: 'completed', label: 'Adoptado' },
  { value: 'cancelled', label: 'Cancelado' }
];

const getStatusLabel = (status: string) => {
  const option = statusOptions.find((opt) => opt.value === status);
  return option ? option.label : status;
};

const getProgressSections = (status: string) => {
  const sections = [
    {
      value: status === 'requested' ? 33 : (status === 'in_progress' ? 33 : (status === 'completed' ? 33 : 0)),
      color: status === 'completed' ? 'green' : 'cyan',
      label: 'Solicitado'
    },
    {
      value: status === 'in_progress' || status === 'completed' ? 33 : 0,
      color: status === 'completed' ? 'green' : 'cyan',
      label: 'En Proceso'
    },
    {
      value: status === 'completed' ? 34 : 0,
      color: 'green',
      label: 'Adoptado'
    }
  ];

  return sections;
};

const AdoptionRow: React.FC<AdoptionRowProps> = ({
                                                   user,
                                                   adoption,
                                                   editingAdoptionId,
                                                   editedStatus,
                                                   handleEdit,
                                                   setEditingAdoptionId,
                                                   setEditedStatus
                                                 }) => {
  const handleSaveStatus = () => {
    if (editingAdoptionId !== null) {
      handleEdit({
        id: editingAdoptionId,
        animal: { name: '' },
        adopter: { full_name: '' },
        status: editedStatus
      });
      setEditingAdoptionId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingAdoptionId(null);
  };

  const progressSections = getProgressSections(adoption.status);

  return (
    <Table.Tr key={adoption.id}>
      <Table.Td>
        <Anchor component="button" fz="sm">
          {adoption.animal.name}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" fz="sm">
          {adoption.adopter.full_name}
        </Anchor>
      </Table.Td>
      {(user.role === 'admin' || user.role === 'volunteer') &&
        <Table.Td>
          {editingAdoptionId === adoption.id ? (
            <Group gap="xs">
              <Select
                value={editedStatus}
                onChange={setEditedStatus}
                data={statusOptions}
                placeholder="Selecciona un estado"
              />
              <ActionIcon color="teal" onClick={handleSaveStatus}>
                <IconCheck size={16} />
              </ActionIcon>
              <ActionIcon color="red" onClick={handleCancelEdit}>
                <IconX size={16} />
              </ActionIcon>
            </Group>
          ) : (
            <Group gap="xs">
              <Text>{getStatusLabel(adoption.status)}</Text>
              <ActionIcon onClick={() => {
                setEditingAdoptionId(adoption.id);
                setEditedStatus(adoption.status);
              }}>
                <IconPencil size={16} />
              </ActionIcon>
            </Group>
          )}
        </Table.Td>}
      <Table.Td>
        <Progress.Root size="xl">
          {progressSections.map((section, index) => (
            <Progress.Section
              key={index}
              value={section.value}
              color={section.color}
            >
              <Progress.Label>{section.label}</Progress.Label>
            </Progress.Section>
          ))}
        </Progress.Root>
      </Table.Td>
    </Table.Tr>
  );
};

export default AdoptionRow;
