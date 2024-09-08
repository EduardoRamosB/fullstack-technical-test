import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout.tsx";
import { useAuth } from "../hooks/useAuth.tsx";
import { getAnimals, createAnimal, updateAnimal, deleteAnimal } from "../api/animals.api.ts";
import { createAdoption } from "../api/adoptions.api.ts";
import { Animal } from "../types.ts";
import {Button, Modal, Group, Center, Loader, Overlay} from "@mantine/core";
import AnimalForm from "../components/forms/AnimalForm.tsx";
import AnimalTable from "../components/tables/AnimalTable.tsx";
import { IconPlus } from "@tabler/icons-react";

const Animals: React.FC = () => {
  const { user, jwt } = useAuth();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [form, setForm] = useState({
    name: '',
    age: '',
    breed: '',
    kind: '',
    status: '',
    reason: ''
  });
  const [confirmDeleteModalOpened, setConfirmDeleteModalOpened] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState<number | null>(null);
  const [confirmAdoptModalOpened, setConfirmAdoptModalOpened] = useState(false);
  const [animalToAdopt, setAnimalToAdopt] = useState<Animal | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (user) {
      setLoadingUser(false); // El usuario ha cargado
      const fetchAnimals = async () => {
        if (user?.role) {
          const fetchedAnimals = await getAnimals(user.role);
          setAnimals(fetchedAnimals);
        }
      };
      fetchAnimals();
    }
  }, [user])

  if (loadingUser) {
    return <Overlay
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1000 }}
      opacity={0.6} // Darken the background
      color="#000" // Background color
    >
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" color="blue" variant="dots" /> {/* Large Loader */}
      </Center>
    </Overlay>
  }

  const handleSubmit = async () => {
    if (!user?.id) {
      console.error("User ID is not available.");
      return;
    }

    const animalData: Animal = {
      ...form,
      age: Number(form.age),
      created_by_id: !editingAnimal ? user.id : undefined,
      updated_by_id: user.id
    };

    if (editingAnimal) {
      if (editingAnimal.id) {
        await updateAnimal(editingAnimal.id, animalData, jwt!, user.role);
      }
    } else {
      await createAnimal(animalData, jwt!);
    }

    const fetchedAnimals = await getAnimals(user.role);
    setAnimals(fetchedAnimals);
    setModalOpened(false);
    setForm({ name: '', age: '', breed: '', kind: '', status: '', reason: '' });
    setEditingAnimal(null);
  };

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setForm({
      name: animal.name,
      age: animal.age.toString(),
      breed: animal.breed,
      kind: animal.kind,
      status: animal.status,
      reason: animal.reason || ''
    });
    setModalOpened(true);
  };

  const handleDeleteClick = (id: number) => {
    setAnimalToDelete(id);
    setConfirmDeleteModalOpened(true);
  };

  const handleAdoptClick = (animal: Animal) => {
    setAnimalToAdopt(animal);
    setConfirmAdoptModalOpened(true);
  };

  const handleConfirmAdopt = async () => {
    if (user?.id && animalToAdopt) {
      const adoption = {
        animal: animalToAdopt.id,  // Solo el ID del animal
        adopter: user.id,          // Solo el ID del adoptante
        volunteer: null,
        status: "requested",
        created_by_id: user.id,
        updated_by_id: user.id
      };

      console.log('adoption:', adoption);

      await createAdoption(adoption, jwt!);
      setConfirmAdoptModalOpened(false);
      const fetchedAnimals = await getAnimals(user.role);
      setAnimals(fetchedAnimals);
    }
  };

  return (
    <Layout user={user} from="authenticated">
      <Group mb="md">
        <h1>Animales</h1>
        {user.role === 'admin' &&
          <Button leftSection={<IconPlus />} onClick={() => setModalOpened(true)}>
            Agregar
          </Button>}
      </Group>

      <AnimalTable
        user={user}
        animals={animals}
        handleEdit={handleEdit}
        handleDeleteClick={handleDeleteClick}
        handleAdoptClick={handleAdoptClick}
      />

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editingAnimal ? 'Editar Animal' : 'Agregar Animal'}
      >
        <AnimalForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          editingAnimal={editingAnimal}
        />
      </Modal>

      <Modal
        opened={confirmDeleteModalOpened}
        onClose={() => setConfirmDeleteModalOpened(false)}
        title="Confirmar Eliminación"
      >
        <p>¿Estás seguro de que deseas eliminar este animal?</p>
        <Group align="center" mt="md">
          <Button onClick={() => setConfirmDeleteModalOpened(false)}>Cancelar</Button>
          <Button
            color="red"
            onClick={async () => {
              if (animalToDelete !== null) {
                await deleteAnimal(animalToDelete, jwt!, user.role);
                const fetchedAnimals = await getAnimals(user.role);
                setAnimals(fetchedAnimals);
              }
              setConfirmDeleteModalOpened(false);
              setAnimalToDelete(null);
            }}
          >
            Eliminar
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={confirmAdoptModalOpened}
        onClose={() => setConfirmAdoptModalOpened(false)}
        title="Confirmar Solicitud de Adopción"
      >
        <p>¿Estás seguro de solicitar la adopción para {animalToAdopt?.name}?</p>
        <Group align="center" mt="md">
          <Button onClick={() => setConfirmAdoptModalOpened(false)}>Cancelar</Button>
          <Button
            color="teal"
            onClick={handleConfirmAdopt}
          >
            Confirmar
          </Button>
        </Group>
      </Modal>
    </Layout>
  );
};

export default Animals;
