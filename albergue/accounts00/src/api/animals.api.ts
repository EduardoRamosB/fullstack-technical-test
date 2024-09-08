import axios from 'axios';
import { Animal } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAnimals = async (role: string): Promise<Animal[]> => {
  const response = await api.get(`shelter/animals/?role=${role}`);
  return response.data;
};

export const createAnimal = async (animal: Animal, jwt: string): Promise<Animal> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  };

  const animalWithUser = {
    ...animal
  };
  console.log('animalWithUser:', animalWithUser)

  const response = await api.post('shelter/animals/', animalWithUser, config);
  return response.data;
};

export const updateAnimal = async (id: number, animal: Animal, jwt: string, role: string): Promise<Animal> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  };
  console.log('animal:', animal)
  const response = await api.put(`shelter/animals/${id}/?role=${role}`, animal, config);
  return response.data;
};

export const deleteAnimal = async (id: number, jwt: string,  role: string): Promise<void> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  };
  await api.delete(`shelter/animals/${id}/?role=${role}`, config);
};
