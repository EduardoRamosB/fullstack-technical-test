import React, { useState } from 'react';
import { Table, Notification } from '@mantine/core';
import AdoptionRow from './AdoptionTable/AdoptionRow';
import { User } from '../../types.ts';

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

interface AdoptionTableProps {
  user: User;
  adoptions: Adoption[];
  handleEdit: (adoption: Adoption) => void;
  jwt: string | null;
}

const AdoptionTable: React.FC<AdoptionTableProps> = ({ user, adoptions, handleEdit, jwt }) => {
  const [editingAdoptionId, setEditingAdoptionId] = useState<number | null>(null);
  const [editedStatus, setEditedStatus] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string, color: string } | null>(null);

  return (
    <>
      {notification && (
        <Notification color={notification.color} onClose={() => setNotification(null)}>
          {notification.message}
        </Notification>
      )}
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Animal</Table.Th>
              <Table.Th>Adoptante</Table.Th>
              {(user.role === 'admin' || user.role === 'volunteer') && <Table.Th>Estado</Table.Th>}
              <Table.Th>Progreso</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {adoptions.map((adoption) => (
              <AdoptionRow
                key={adoption.id}
                user={user}
                adoption={adoption}
                editingAdoptionId={editingAdoptionId}
                editedStatus={editedStatus}
                handleEdit={handleEdit}
                setEditingAdoptionId={setEditingAdoptionId}
                setEditedStatus={setEditedStatus}
              />
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export default AdoptionTable;
