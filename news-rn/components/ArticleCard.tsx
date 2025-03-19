import { View, Text, Image, Button, Pressable } from "react-native";
import React from "react";
import ThemedText from "./ThemedText";
import { Article } from "@/lib/types";
import { filterCategory } from "@/lib/utils";
import * as Linking from "expo-linking";

const ArticleCard = ({ data }: { data: Article }) => {
  const { body, categories, image, source, title, url } = data;
  const cate = filterCategory({ categories });
  return (
    <Pressable onPress={() => Linking.openURL(url)} className="py-4">
      <Image
        source={{
          uri: image,
        }}
        className="bg-hover aspect-square w-full rounded-xl"
      />
      <View className="mt-2">
        <ThemedText className="text-gray-500">{source.title}</ThemedText>
      </View>

      <Text className="mt-2 text-lg" style={{ fontFamily: "Domine-600" }}>
        {title}
      </Text>

      <ThemedText className="line-clamp-4 text-gray-500">{body}</ThemedText>

      <View className="mt-2 flex-row">
        <ThemedText className="text-primary">{cate}</ThemedText>
      </View>
    </Pressable>
  );
};

export default ArticleCard;
