import React from "react";
import { View, ViewProps } from "react-native";
import { useStyles } from "react-native-unistyles";

type Props = ViewProps & { circular?: boolean };

const Skeleton = ({ circular: circlar, ...props }: Props) => {
  const { theme } = useStyles();
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
