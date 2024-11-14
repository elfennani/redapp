import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import ThemedView from "@/components/ThemedView";
import useActiveSession from "@/features/auth/hooks/use-active-session";
import FeedListing from "@/features/feed/components/feed-listing";
import AppDrawer from "@/features/home/components/app-drawer";
import { Redirect, Stack } from "expo-router";
import { useState } from "react";
import { Drawer } from "react-native-drawer-layout";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const session = useActiveSession();

  if (!session) {
    return <Redirect href={"/(auth)/signin"} />;
  }

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => <AppDrawer />}
      swipeEnabled
      swipeEdgeWidth={60}
      swipeMinDistance={32}
      drawerType="slide"
      drawerStyle={{ backgroundColor: "transparent" }}
    >
      <ThemedView style={{ flex: 1 }}>
        <Stack.Screen options={{ header: () => null }} />
        <Header>
          <Header.LeftIcons>
            <IconButton name="menu" onPress={() => setOpen(true)} />
          </Header.LeftIcons>
          <Header.Title>Home Feed</Header.Title>
          <Header.RightIcons>
            <IconButton name="search" />
          </Header.RightIcons>
        </Header>
        <FeedListing />
      </ThemedView>
    </Drawer>
  );
};

export default HomePage;
