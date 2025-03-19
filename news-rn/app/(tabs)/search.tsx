import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { fetchArticles } from "@/services/api";
import ThemedText from "@/components/ThemedText";
import { THEME } from "@/lib/constants";
import ArticleCard from "@/components/ArticleCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);

  const { data, loading, error, fetchData, reset } = useFetch(
    () =>
      fetchArticles(
        (searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1))
          .split(" ")
          .join("_"),
        12,
        undefined,
        page,
      ),
    false,
  );

  const articles = data?.results;

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await fetchData();
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchData();
    }
  }, [page]);
  return (
    <View className="flex-1 bg-white p-4">
      <ThemedText weight="700" className="text-xl">
        Search for a city
      </ThemedText>

      <TextInput
        className="border-border mt-4 rounded-xl border p-4"
        placeholder="Search..."
        value={searchQuery}
        onChangeText={(value) => setSearchQuery(value)}
      />

      {loading && (
        <ActivityIndicator color={THEME.colors.primary} className="mt-4" />
      )}

      {data &&
        !loading &&
        (data?.count < 1 ? (
          <ThemedText className="mt-4 text-gray-500">
            No related news found.
          </ThemedText>
        ) : (
          <>
            <ThemedText className="my-4 text-lg" weight="600">
              Search results for '{searchQuery}'
            </ThemedText>

            <FlatList
              data={articles}
              renderItem={({ item }) => <ArticleCard data={item} />}
              contentContainerClassName="gap-4"
              showsVerticalScrollIndicator={false}
            />
          </>
        ))}
    </View>
  );
};

export default Search;
