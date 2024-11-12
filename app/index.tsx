import Button from "@/components/Button";
import useActiveSession from "@/features/auth/hooks/use-active-session";
import storage from "@/utils/mmkv";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

const HomePage = () => {
  const session = useActiveSession();

  if (!session) {
    return <Redirect href={"/(auth)/signin"} />;
  }

  return (
    <View>
      <Text>HomePage</Text>
      <Button onPress={() => storage.delete("active-session")}>
        <Button.Label>Sign out</Button.Label>
      </Button>
    </View>
  );
};

export default HomePage;
