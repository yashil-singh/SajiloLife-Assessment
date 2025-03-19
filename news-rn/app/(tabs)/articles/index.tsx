import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { fetchArticles } from "@/services/api";
import useFetch from "@/hooks/useFetch";
import useLocation from "@/hooks/useLocationContext";
import ArticleCard from "@/components/ArticleCard";
import ThemedText from "@/components/ThemedText";
import { THEME } from "@/lib/constants";

const Articles = () => {
  const { location } = useLocation();

  const { data, loading, error, fetchData } = useFetch(() =>
    fetchArticles(location!),
  );

  return (
    <View className="h-full bg-white p-4">
      <ThemedText className="mb-4 text-xl" weight="700">
        Articles
      </ThemedText>
      {loading ? (
        <ActivityIndicator color={THEME.colors.primary} />
      ) : (
        <FlatList
          data={data?.results}
          renderItem={({ item }) => <ArticleCard data={item} />}
          contentContainerClassName="gap-4"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ThemedText className="text-gray-500">
              No news to show at the moment.
            </ThemedText>
          )}
        />
      )}
    </View>
  );
};

export default Articles;
