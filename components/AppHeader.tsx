import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import Header from "./Header";

type Props = NativeStackHeaderProps;

const AppHeader = ({ route, options, back }: Props) => {
  return (
    <Header>
      <Header.LeftIcons back={!!back}>
        {options.headerLeft?.({})}
      </Header.LeftIcons>
      <Header.Title>{options.title ?? route.name}</Header.Title>
      <Header.RightIcons>{options.headerRight?.({})}</Header.RightIcons>
    </Header>
  );
};

export default AppHeader;
