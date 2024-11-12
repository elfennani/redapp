import Button from "@/components/Button";
import ThemedText from "@/components/ThemedText";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const IndexPage = () => {
  const { styles } = useStyles(stylesheet);

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
      <Button>
        <Button.Label>Sign in with Reddit</Button.Label>
      </Button>
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
    opacity: 0.75,
  },
}));

export default IndexPage;
