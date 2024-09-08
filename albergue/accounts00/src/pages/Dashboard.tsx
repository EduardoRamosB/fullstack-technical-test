import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.tsx";
import { useAuth } from "../hooks/useAuth.tsx";
import {Center, Group, Loader, Overlay, Paper, SimpleGrid, Text} from '@mantine/core';
import { IconHeart, IconPaw, IconPawFilled, IconRocket } from "@tabler/icons-react";
import classes from '../components/stats/StatsGrid.module.css';
import { getKpis } from "../api/kpis.api.ts";

const icons = {
  user: IconHeart,
  discount: IconRocket,
  receipt: IconPawFilled,
  coin: IconPaw,
};

const Dashboard: React.FC = () => {
  const { user, jwt } = useAuth();
  const [loadingUser, setLoadingUser] = useState(true);
  const [data, setData] = useState([
    { title: 'Perros', icon: 'receipt', value: '0', desc: '', color: '#66afc4' },
    { title: 'Gatos', icon: 'coin', value: '0', desc: '', color: '#76d0eb' },
    { title: 'En Proceso', icon: 'discount', value: '0', desc: '', color: '#e2c541' },
    { title: 'Adoptados', icon: 'user', value: '0', desc: '', color: '#e2418b' },
  ]);

  useEffect(() => {
    if (user && jwt) {
      setLoadingUser(false);
      const fetchData = async () => {
        try {
          const kpiData = await getKpis(jwt);
          setData([
            { title: 'Perros', icon: 'receipt', value: kpiData.dogs_count, desc: 'En total en el albergue', color: '#66afc4' },
            { title: 'Gatos', icon: 'coin', value: kpiData.cats_count, desc: 'En total en el albergue', color: '#76d0eb' },
            {
              title: 'En Proceso',
              icon: 'discount',
              value: `${kpiData.adoptions_in_progress.dog} / ${kpiData.adoptions_in_progress.cat}`,
              desc: 'Perros / Gatos en proceso de adopción',
              color: '#e2c541'
            },
            {
              title: 'Adoptados',
              icon: 'user',
              value: `${kpiData.adoptions_completed.dog}  / ${kpiData.adoptions_completed.cat} `,
              desc: 'Perros / Gatos adoptados',
              color: '#e2418b'
            },
          ]);
        } catch (error) {
          console.error('Error fetching KPI data:', error);
        }
      };

      fetchData();
    }
  }, [user, jwt]);

  if (loadingUser) {
    return (
      <Overlay
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1000 }}
        opacity={0.6}
        color="#000"
      >
        <Center style={{ height: "100vh" }}>
          <Loader size="xl" color="blue" variant="dots" /> {/* Large Loader */}
        </Center>
      </Overlay>
    );
  }

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} color={stat.color} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          {stat.desc}
        </Text>
      </Paper>
    );
  });

  return (
    <Layout user={user} from="authenticated">
      <h1>Dashboard</h1>
      <div className={classes.root}>
        {user.role === 'admin' ?
          <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>: <h3>Bienvenido {user.email}</h3>}
      </div>
    </Layout>
  );
};

export default Dashboard;
