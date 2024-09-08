import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout.tsx";
import { useAuth } from "../hooks/useAuth.tsx";
import { getVolunteers, createVolunteer, updateVolunteer, deleteVolunteer } from "../api/users.api.ts";
import { User } from "../types.ts";
import {Button, Modal, Group, Overlay, Center, Loader} from "@mantine/core";
import UsersForm from "../components/forms/UsersForm.tsx";
import UsersTable from "../components/tables/UsersTable.tsx";
import { IconPlus } from "@tabler/icons-react";
import {useLocation} from "react-router-dom";
import {getAdoptions} from "../api/adoptions.api.ts";

const Users: React.FC = () => {
  const { user, jwt } = useAuth();
  const [volunteers, setVolunteers] = useState<User[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState<User | null>(null);
  const location = useLocation()
  const role = location.pathname.split("/").pop();
  const st = role === 'volunteer' ? 'Voluntario' : 'Adoptante'
  const [form, setForm] = useState<User>({
    username: '',
    email: '',
    role,
    first_name: '',
    last_name: '',
  });
  const [confirmDeleteModalOpened, setConfirmDeleteModalOpened] = useState(false);
  const [volunteerToDelete, setVolunteerToDelete] = useState<number | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (user) {
      setLoadingUser(false);
      const fetchVolunteers = async () => {
        if (jwt) {
          console.log('role:', role);
          const fetchedVolunteers = await getVolunteers(jwt, role!);
          setVolunteers(fetchedVolunteers);
        }
      };

      fetchVolunteers();
    }
  }, [user, jwt, role]);

  if (loadingUser) {
    return (
      <Overlay
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1000 }}
        opacity={0.6} // Darken the background
        color="#000" // Background color
      >
        <Center style={{ height: "100vh" }}>
          <Loader size="xl" color="blue" variant="dots" /> {/* Large Loader */}
        </Center>
      </Overlay>
    );
  }

  /*useEffect(() => {
    const fetchVolunteers = async () => {
      if (jwt) {
        console.log('role:', role)
        const fetchedVolunteers = await getVolunteers(jwt, role!);
        setVolunteers(fetchedVolunteers);
      }
    };

    fetchVolunteers();
  }, [jwt, role]);*/

  const handleSubmit = async () => {
    if (!user?.id) {
      console.error("User ID is not available.");
      return;
    }

    const volunteerData: User = {
      ...form,
      id: editingVolunteer ? editingVolunteer.id : undefined,
    };

    console.log('volunteerData:', volunteerData)

    if (editingVolunteer) {
      if (editingVolunteer.id) {
        await updateVolunteer(editingVolunteer.id, volunteerData, jwt!, role!);
      }
    } else {
      await createVolunteer(volunteerData, jwt!, role!);
    }

    const fetchedVolunteers = await getVolunteers(jwt!, role!);
    setVolunteers(fetchedVolunteers);
    setModalOpened(false);
    setForm({
      username: '',
      email: '',
      role,
      first_name: '',
      last_name: '',
    });
    setEditingVolunteer(null);
  };

  const handleEdit = (volunteer: User) => {
    setEditingVolunteer(volunteer);
    setForm({
      username: volunteer.username,
      email: volunteer.email,
      role: volunteer.role,
      first_name: volunteer.first_name || '',
      last_name: volunteer.last_name || '',
    });
    setModalOpened(true);
  };

  const handleDeleteClick = (id: number) => {
    setVolunteerToDelete(id);
    setConfirmDeleteModalOpened(true);
  };

  const handleCloseModal = () => {
    setEditingVolunteer(null);
    setForm({
      username: '',
      email: '',
      role,
      first_name: '',
      last_name: '',
    })
    setModalOpened(false)
  }

  return (
    <Layout user={user} from="authenticated">
      <Group mb="md">
        <h1>{role === 'volunteer' ? 'Voluntarios' : 'Adopantes'}</h1>
        {user.role === 'admin' &&
          <Button leftSection={<IconPlus />} onClick={() => setModalOpened(true)}>
            Agregar
          </Button>}
      </Group>

      <UsersTable
        user={user}
        users={volunteers}
        handleEdit={handleEdit}
        handleDeleteClick={handleDeleteClick}
      />

      <Modal
        opened={modalOpened}
        onClose={handleCloseModal}
        title={editingVolunteer ?
          `Editar ${st}` :
          `Agregar ${st}`}
      >
        <UsersForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          editingVolunteer={editingVolunteer}
        />
      </Modal>

      <Modal
        opened={confirmDeleteModalOpened}
        onClose={() => setConfirmDeleteModalOpened(false)}
        title="Confirmar Eliminación"
      >
        <p>{`¿Estás seguro de que deseas eliminar este ${st}?`}</p>
        <Group align="center" mt="md">
          <Button onClick={() => setConfirmDeleteModalOpened(false)}>Cancelar</Button>
          <Button
            color="red"
            onClick={async () => {
              if (volunteerToDelete !== null) {
                await deleteVolunteer(volunteerToDelete, jwt!, role!);
                const fetchedVolunteers = await getVolunteers(jwt!, role!);
                setVolunteers(fetchedVolunteers);
              }
              setConfirmDeleteModalOpened(false);
              setVolunteerToDelete(null);
            }}
          >
            Eliminar
          </Button>
        </Group>
      </Modal>
    </Layout>
  );
};

export default Users;
