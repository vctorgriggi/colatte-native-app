import {
  ActivityIndicator as PaperActivityIndicator,
  useTheme,
} from "react-native-paper";
import React from "react";

type Props = React.ComponentProps<typeof PaperActivityIndicator>;

export default function ActivityIndicator({ ...props }: Props) {
  const { colors } = useTheme();

  return (
    <PaperActivityIndicator
      animating={true}
      color={colors.primary}
      {...props}
    />
  );
}
