import ThemedActivityIndicator from "@/components/ThemedActivityIndicator";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import useValidation from "@/features/auth/hooks/use-validation";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Params = {
  code?: string;
};

const AuthPage = () => {
  const { code } = useLocalSearchParams<Params>();
  const { styles } = useStyles(stylesheet);

  const { mutate } = useValidation();

  useEffect(() => {
    mutate(code);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedActivityIndicator />
      <ThemedText weight="bold" style={styles.info}>
        Authenticating...
      </ThemedText>
    </ThemedView>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  info: {
    color: theme.colors.primary,
  },
}));

export default AuthPage;
