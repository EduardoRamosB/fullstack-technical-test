import { render, screen } from '@test-utils';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import AnimalTable from "./AnimalTable.tsx";

const mockAnimals = [
  { id: 1, name: 'Patita', age: 2, breed: 'Bulldog', kind: 'Dog', status: 'available' },
  { id: 2, name: 'Chispita', age: 3, breed: 'Siamese', kind: 'Cat', status: 'waiting' }
];

describe('AnimalTable component', () => {
  it('renders AnimalTable with animal data', () => {
    render(
      <AnimalTable
        user={{ role: 'admin' }}
        animals={mockAnimals}
        handleEdit={vi.fn()}
        handleDeleteClick={vi.fn()}
        handleAdoptClick={vi.fn()}
      />
    );

    // Verificamos que el nombre del primer animal esté en el documento
    expect(screen.getByText('Patita')).toBeInTheDocument();

    // Verificamos que el nombre del segundo animal esté en el documento
    expect(screen.getByText('Chispita')).toBeInTheDocument();
  });
});
