import React, {useState, useEffect} from "react";
import { Group, Code } from '@mantine/core';
import {
  IconFingerprint,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout, IconCalendarHeart, IconUsersGroup, IconHome, IconUserHeart
} from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {User} from "../../types.ts";

// Define the type for icons
type IconComponent = React.FC<{ className?: string; stroke?: number; }>;

interface NavItem {
  link: string;
  label: string;
  icon: IconComponent;
  roles: string[];
}

const data: NavItem[] = [
  { link: '/users/dashboard', label: 'Dashboard', icon: IconHome as IconComponent, roles: ['admin', 'volunteer', 'adopter'] },
  { link: '/users/animals', label: 'Animales', icon: IconFingerprint as IconComponent, roles: ['admin', 'volunteer', 'adopter'] },
  { link: '/users/adoptions', label: 'Adopciones', icon: IconCalendarHeart as IconComponent, roles: ['admin', 'volunteer', 'adopter'] },
  { link: '/users/adopter', label: 'Adoptadores', icon: IconUserHeart as IconComponent, roles: ['admin', 'volunteer'] },
  { link: '/users/volunteer', label: 'Voluntarios', icon: IconUsersGroup as IconComponent, roles: ['admin'] },
];

interface ISidebar {
  user: User | null
}

const Sidebar: React.FC<ISidebar> = ({ user }) => {
  const [active, setActive] = useState('Dashboard');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentLink = data.find(item => item.link === location.pathname);
    if (currentLink) {
      setActive(currentLink.label);
    }
  }, [location.pathname]);

  const handleClickLink = (item: NavItem) => {
    setActive(item.label);
    navigate(item.link);
  }

  const filteredLinks = data.filter((item) => user && item.roles.includes(user.role as string));

  const links = filteredLinks.map((item) => (
    <Link
      key={item.label}
      to={item.link}
      className={classes.link}
      data-active={item.label === active || undefined}
      onClick={() => handleClickLink(item)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>TAILS WORLD</Code>
        </Group>
        {links}
      </div>
    </nav>
  )
}

export default Sidebar;
