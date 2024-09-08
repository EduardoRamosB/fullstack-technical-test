import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout.tsx";
import { useAuth } from "../hooks/useAuth.tsx";
import { getAdoptions, updateAdoptionStatus, deleteAdoption } from "../api/adoptions.api.ts";
import { Adoption } from "../types.ts";
import { Button, Modal, Group, Center, Loader, Overlay, Select, Text } from "@mantine/core";
import AdoptionTable from "../components/tables/AdoptionTable.tsx";
import { IconPlus } from "@tabler/icons-react";

const Adoptions: React.FC = () => {
  const { user, jwt } = useAuth();
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingAdoption, setEditingAdoption] = useState<Adoption | null>(null);
  const [editedStatus, setEditedStatus] = useState<string>('');
  const [confirmDeleteModalOpened, setConfirmDeleteModalOpened] = useState(false);
  const [adoptionToDelete, setAdoptionToDelete] = useState<number | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (user) {
      setLoadingUser(false);
      const fetchAdoptions = async () => {
        const fetchedAdoptions = await getAdoptions(user.id, user.role);
        setAdoptions(fetchedAdoptions);
      };
      fetchAdoptions();
    }
  }, [user]);

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

  const handleSaveStatus = async () => {
    if (editingAdoption && editedStatus) {
      try {
        await updateAdoptionStatus(editingAdoption.id!, editedStatus, jwt!);
        setModalOpened(false);
        const fetchedAdoptions = await getAdoptions(user.id, user.role);
        setAdoptions(fetchedAdoptions);
      } catch (error) {
        console.error("Error al actualizar el estado:", error);
      }
    }
  };

  const handleEdit = async (adoption: Adoption) => {
    console.log('adoption:', adoption)
    if (adoption) {
      console.log('status:', adoption.status);
      await updateAdoptionStatus(adoption.id!, adoption.status, user!.id!, jwt!);
      const fetchedAdoptions = await getAdoptions(user.id, user.role);
      setAdoptions(fetchedAdoptions);
    }
  };

  const handleDeleteClick = (id: number) => {
    setAdoptionToDelete(id);
    setConfirmDeleteModalOpened(true);
  };

  return (
    <Layout user={user} from="authenticated">
      <Group mb="md">
        <h1>Adopciones</h1>
      </Group>

      <AdoptionTable
        user={user}
        adoptions={adoptions}
        handleEdit={handleEdit}
        jwt={jwt!}
      />

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editingAdoption ? 'Editar Adopción' : 'Agregar Adopción'}
      >
        {editingAdoption && (
          <Group direction="column">
            <Select
              value={editedStatus}
              onChange={setEditedStatus}
              data={[
                { value: 'requested', label: 'Solicitado' },
                { value: 'in_progress', label: 'En Progreso' },
                { value: 'completed', label: 'Adoptado' },
                { value: 'cancelled', label: 'Cancelado' }
              ]}
            />
            <Button onClick={handleSaveStatus}>Guardar</Button>
          </Group>
        )}
      </Modal>

      <Modal
        opened={confirmDeleteModalOpened}
        onClose={() => setConfirmDeleteModalOpened(false)}
        title="Confirmar eliminación"
      >
        <Text>¿Estás seguro de que deseas eliminar esta adopción?</Text>
        <Group position="right" mt="md">
          <Button
            onClick={async () => {
              if (adoptionToDelete) {
                await deleteAdoption(adoptionToDelete, jwt!);
                setAdoptionToDelete(null);
                setConfirmDeleteModalOpened(false);
                const fetchedAdoptions = await getAdoptions(user.id, user.role);
                setAdoptions(fetchedAdoptions);
              }
            }}
          >
            Eliminar
          </Button>
          <Button variant="outline" onClick={() => setConfirmDeleteModalOpened(false)}>
            Cancelar
          </Button>
        </Group>
      </Modal>
    </Layout>
  );
};

export default Adoptions;
