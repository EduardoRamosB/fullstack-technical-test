import React from "react";
import {Container, Drawer, Grid, Paper, Overlay, Loader, Center} from "@mantine/core";
import Sidebar from "../navigation/Sidebar.tsx";
import {Header} from "../navigation/Header.tsx";
import {useDisclosure} from "@mantine/hooks";
import {User} from "../../types.ts";

interface ILayoutProps {
  user: User | null;
  from: string;
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ user, from, children }) => {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);

  // Display loader overlay while user data is being fetched
  if (!user && from === 'authenticated') {
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

  return (
    <>
      <Container size="lg">
        <Grid>
          {from === 'authenticated' &&
            <Grid.Col span={{ base: 12, xs: 4 }} visibleFrom="md">
              <Sidebar user={user} />
            </Grid.Col>}

          <Grid.Col span={{ base: 12, xs: from === 'authenticated' ? 8 : 12 }}>
            <Grid>
              <Grid.Col span={12}>
                <Header
                  from={from}
                  onBurgerClick={openDrawer}
                  user={user}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Paper>
                  {children}
                </Paper>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title="Sidebar"
        padding="md"
        size="md"
      >
        <Sidebar user={user}/>
      </Drawer>
    </>
  );
};

export default Layout;
