import React from "react";
import { Menu, Group, Center, Burger, Container, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './Header.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LogOut } from "../../api/users.api.ts";
import { User } from "../../types.ts";

interface LinkItem {
  id: string;
  link: string;
  label: string;
}

interface PublicLink {
  color: string;
  id: string;
  label: string;
  link: string;
  links?: LinkItem[];
}

const publicLinks: PublicLink[] = [
  {
    id: '#1',
    label: 'Sign Up',
    link: '/users/sign_up',
    color: 'violet'
  },
  {
    id: '#2',
    label: 'Login',
    link: '/users/sign_in',
    color: 'blue'
  },
];

const getLinks = (userFullName: string, role: string) => [
  {
    id: '#1',
    label: `Bienvenido ${userFullName} (${role})`,
    links: [
      { id: '#l1', link: '/faq', label: 'Profile' },
      { id: '#l2', link: '/forums', label: 'Logout' },
    ],
  },
];

interface IHeaderProps {
  from: string;
  onBurgerClick: () => void;
  user: User
}

export const Header: React.FC<IHeaderProps> = ({ from, onBurgerClick, user }) => {
  const [opened] = useDisclosure(false);
  const { jwt, refresh_token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!jwt || !refresh_token) {
      console.log('No valid JWT or refresh token');
      return;
    }

    try {
      const res = await LogOut(jwt, refresh_token);
      console.log('res:', res?.status);
      logout();

      navigate('/users/sign_in', { replace: true });
    } catch (e) {
      console.log(e);
    } finally {
      logout();
    }
  };

  const selectedLinks = from === 'authenticated' ? getLinks(user.full_name, user!.role!) : publicLinks;
  const items = selectedLinks.map((link) => {
    // Handle authenticated links with sub-links
    if ('links' in link && link.links) {
      const menuItems = link.links.map((item: LinkItem) => (
        <Menu.Item key={item.id} onClick={item.label === 'Logout' ? handleLogout : undefined}>
          {item.label === 'Logout' ? (
            item.label
          ) : (
            <Link to={item.link} style={{ textDecoration: 'none' }}>
              {item.label}
            </Link>
          )}
        </Menu.Item>
      ));

      return (
        <Menu key={link.id} transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a href="#" className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    // Handle public links by checking if 'link' exists
    if ('link' in link) {
      return (
        <Link key={link.id} to={link.link} style={{ textDecoration: 'none' }}>
          <Button variant="filled" color={link.color || 'default'}>{link.label}</Button>
        </Link>
      );
    }

    return null;
  });

  return (
    <header className={classes.header}>
      <Container size="lg">
        <div className={classes.inner}>
          <Group className={classes.leftItems}>
            {from === 'public' &&
              <Link to='/' className={classes.link}>
                Home
              </Link>}
          </Group>
          <Group className={classes.rightItems}>
            {items}
            {from === 'authenticated' &&
              <Burger
                opened={opened}
                onClick={onBurgerClick}
                size="sm"
                className={classes.burger}
              />}
          </Group>
        </div>
      </Container>
    </header>
  );
};
