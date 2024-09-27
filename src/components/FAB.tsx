import { FAB as NativeFAB, FABProps, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

type Props = Partial<FABProps> & {
  icon?: string;
};

export default function FAB({ icon = "plus", ...props }: Props) {
  const { colors } = useTheme();

  return (
    <NativeFAB
      icon={icon}
      style={[styles.fab, { backgroundColor: colors.primary }]}
      color={colors.onPrimary}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 50,
  },
});
