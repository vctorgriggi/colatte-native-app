import { useTheme, Card as PaperCard, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import React from "react";

type Props = {
  source?: string;
  title?: string;
  caption?: string;
  description?: string;
  actions?: React.ReactNode;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Card({
  source,
  title,
  caption,
  description,
  actions,
}: Props) {
  const { colors } = useTheme();

  return (
    <PaperCard style={[styles.card, { backgroundColor: colors.surface }]}>
      {source && (
        <PaperCard.Cover
          source={{ uri: `${apiUrl}/${source}` }}
          style={styles.cover}
        />
      )}
      <PaperCard.Content style={styles.content}>
        <Text variant="titleLarge">{title}</Text>
        {caption && (
          <Text
            variant="bodyMedium"
            style={[styles.caption, { color: colors.outline }]}
          >
            {caption}
          </Text>
        )}
        {description && <Text variant="bodyMedium">{description}</Text>}
      </PaperCard.Content>
      <PaperCard.Actions style={styles.actions}>{actions}</PaperCard.Actions>
    </PaperCard>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    shadowColor: "transparent",
  },
  cover: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  content: {
    padding: 16,
  },
  caption: {
    marginBottom: 12,
  },
  actions: {
    gap: 8,
  },
});
