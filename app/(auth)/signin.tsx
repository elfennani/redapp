import ThemedText from "@/components/ThemedText";
import AuthButton from "@/features/auth/components/auth-button";
import useActiveSession from "@/features/auth/hooks/use-active-session";
import { Redirect } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const IndexPage = () => {
  const { styles } = useStyles(stylesheet);
  const session = useActiveSession();

  if (session) {
    return <Redirect href={"/"} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcome}>
        <ThemedText weight="light" size="huge" style={styles.title}>
          RedApp
        </ThemedText>
        <ThemedText weight="base" style={styles.description}>
          A data-saving app for browsing Reddit
        </ThemedText>
      </View>
      <AuthButton />
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: 16,
    flex: 1,
    gap: 16,
  },
  welcome: {
    justifyContent: "center",
    flex: 1,
    gap: 4,
  },
  title: {
    textAlign: "center",
    color: theme.colors.primary,
  },
  description: {
    textAlign: "center",
    // opacity: 0.75,
    color: theme.colors.textMuted,
  },
}));

export default IndexPage;
