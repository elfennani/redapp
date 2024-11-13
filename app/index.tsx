import AppHeader from "@/components/AppHeader";
import Button from "@/components/Button";
import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import ThemedView from "@/components/ThemedView";
import useActiveSession from "@/features/auth/hooks/use-active-session";
import storage from "@/utils/mmkv";
import { Redirect, Stack, useNavigation } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
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
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}
      swipeEnabled
      swipeEdgeWidth={60}
      swipeMinDistance={32}
      drawerType="slide"
    >
      <ThemedView>
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
        <Text>HomePage</Text>
        <Button onPress={() => storage.delete("active-session")}>
          <Button.Label>Sign out</Button.Label>
        </Button>
      </ThemedView>
    </Drawer>
  );
};

export default HomePage;
