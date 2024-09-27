import { Switch as NativeSwitch } from "react-native-paper";

type Props = React.ComponentProps<typeof NativeSwitch>;

export default function Switch({ ...props }: Props) {
  return <NativeSwitch {...props} />;
}
