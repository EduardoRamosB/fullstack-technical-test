import React from "react";
import cx from 'clsx';
import { ActionIcon, Button, Group, ScrollArea, Table } from "@mantine/core";
import classes from './AnimalTable.module.css';
import { IconHeart, IconPencil, IconTrash } from "@tabler/icons-react";
import { Animal } from "../../types.ts";

interface IAnimalTableProps {
  user: string | null;
  animals: Animal[];
  handleEdit: (animal: Animal) => void;
  handleDeleteClick: (id: number) => void;
  handleAdoptClick: (animal: Animal) => void;
}

const AnimalTable: React.FC<IAnimalTableProps> = ({ user, animals, handleEdit, handleDeleteClick, handleAdoptClick }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const { role } = user;

  const statusOptions = [
    { value: 'waiting', label: 'Esperando revisiones' },
    { value: 'available', label: 'Listo para Adoptar' },
    { value: 'requested', label: 'Solicitado para adpción' },
    { value: 'pending', label: 'En Proceso de adopcion' },
    { value: 'adopted', label: 'Adoptado' },
    { value: 'aggressive', label: 'Agresivo no adoptable' },
    { value: 'returned', label: 'Regresado de adopcion' }
  ];

  const getStatusLabel = (status: string) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option ? option.label : status;
  };

  const rows = animals.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.age}</Table.Td>
      <Table.Td>{row.breed}</Table.Td>
      <Table.Td>{row.kind}</Table.Td>
      <Table.Td>{getStatusLabel(row.status)}</Table.Td>
      <Table.Td>
        <Group>
          {(role === 'admin' || role === 'volunteer') &&
            <ActionIcon color="blue" onClick={() => handleEdit(row)}>
              <IconPencil size={16} />
            </ActionIcon>}

          {role === 'admin' &&
            <ActionIcon
              color="red"
              onClick={() => {
                if (row.id !== undefined) {
                  handleDeleteClick(row.id);
                } else {
                  console.error("Animal ID is undefined");
                }
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>}

          {role === 'adopter' &&
            <Button
              leftSection={<IconHeart size={14} />}
              variant="filled"
              color="teal"
              onClick={() => handleAdoptClick(row)}
            >
              Solicitar Adopción
            </Button>}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={400} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Edad</Table.Th>
            <Table.Th>Raza</Table.Th>
            <Table.Th>Tipo</Table.Th>
            <Table.Th>Estado</Table.Th>
            <Table.Th>&nbsp;</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default AnimalTable;
