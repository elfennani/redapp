import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, ViewProps } from "react-native";

type Props = ViewProps & { circular?: boolean };

const Skeleton = ({ circular: circlar, ...props }: Props) => {
  const theme = useTheme();
  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: theme.colors.border,
          borderRadius: circlar ? 999 : 6,
        },
        props.style,
      ]}
    />
  );
};

export default Skeleton;
