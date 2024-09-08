import {ActionIcon, Avatar, Group, ScrollArea, Table, Text} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {User} from "../../types.ts";
import {IconPencil, IconTrash} from "@tabler/icons-react";

interface IVolunteerTableProps {
  user: User;
  users: User[];
  handleEdit: (user: User) => void;
  handleDeleteClick: (id: number) => void;
}

const UsersTable: React.FC<IVolunteerTableProps> = ({ user, users, handleEdit, handleDeleteClick }) => {
  const [userRole, setUserRole] = useState(user.role)
  useEffect(() => {
    //console.log('USER ROLE:', user.role)
  }, []);
  //console.log('user T:', user.role)
  const rows = users.map((user) => {
    return (
      <Table.Tr key={user.id} >
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={''} radius={26} />
            <Text size="sm" fw={500}>
              {user.username}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{user.email}</Table.Td>
        <Table.Td>{user.first_name}</Table.Td>
        <Table.Td>{user.last_name}</Table.Td>
        {userRole === 'admin' &&
          (<Table.Td>
            <Group>
              <ActionIcon color="blue" onClick={() => handleEdit(user)}>
                <IconPencil size={16} />
              </ActionIcon>
              <ActionIcon
                color="red"
                onClick={() => {
                  if (user.id !== undefined) {
                    handleDeleteClick(user.id);
                  } else {
                    console.error("User ID es indefinido");
                  }
                }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Table.Td>)}
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Apellido</Table.Th>
            {userRole === 'admin' && <Table.Th>&nbsp;</Table.Th>}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  )
}

export default UsersTable