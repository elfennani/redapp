import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import useActiveSession from "@/features/auth/hooks/use-active-session";
import storage from "@/utils/mmkv";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const HomePage = () => {
  const session = useActiveSession();

  if (!session) {
    return <Redirect href={"/(auth)/signin"} />;
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerLeft: () => <IconButton name="menu" />,
          headerRight: () => <IconButton name="search" />,
        }}
      />
      <Text>HomePage</Text>
      <Button onPress={() => storage.delete("active-session")}>
        <Button.Label>Sign out</Button.Label>
      </Button>
    </View>
  );
};

export default HomePage;
