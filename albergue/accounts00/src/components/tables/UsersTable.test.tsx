import { render, screen, fireEvent } from '@test-utils';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import UsersTable from './UsersTable.tsx';
import { User } from '../../types.ts';

const mockUsers: User[] = [
  { id: 1, username: 'john_doe', email: 'john@example.com', first_name: 'John', last_name: 'Doe', role: 'user' },
  { id: 2, username: 'jane_doe', email: 'jane@example.com', first_name: 'Jane', last_name: 'Doe', role: 'admin' }
];

describe('UsersTable component', () => {
  it('renders UsersTable with user data', () => {
    render(
      <UsersTable
        user={{ id: 3, username: 'admin', email: 'admin@example.com', first_name: 'Admin', last_name: 'User', role: 'admin' }}
        users={mockUsers}
        handleEdit={vi.fn()}
        handleDeleteClick={vi.fn()}
      />
    );

    // Verifica que los nombres de los usuarios estén en el documento
    expect(screen.getByText('john_doe')).toBeInTheDocument();
    expect(screen.getByText('jane_doe')).toBeInTheDocument();

    // Verifica que los correos electrónicos estén en el documento
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();

    // Verifica que los botones de editar y eliminar están presentes para el rol admin
    expect(screen.getAllByRole('button')).toHaveLength(4); // 2 buttons per user, 2 users
  });

  it('does not render edit and delete buttons for non-admin users', () => {
    render(
      <UsersTable
        user={{ id: 1, username: 'john_doe', email: 'john@example.com', first_name: 'John', last_name: 'Doe', role: 'user' }}
        users={mockUsers}
        handleEdit={vi.fn()}
        handleDeleteClick={vi.fn()}
      />
    );

    // Verifica que los botones de editar y eliminar no están presentes para usuarios no admins
    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
  });
});
