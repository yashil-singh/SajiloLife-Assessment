import ThemedText from "@/components/ThemedText";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ArrowRight, MapPin } from "lucide-react-native";
import { THEME } from "@/lib/constants";
import { Link } from "expo-router";
import ArticleCard from "@/components/ArticleCard";
import useLocation from "@/hooks/useLocationContext";
import useFetch from "@/hooks/useFetch";
import { fetchArticles } from "@/services/api";

export default function Index() {
  const { location } = useLocation();

  const { data, loading } = useFetch(() => fetchArticles(location!, 8));

  return (
    <ScrollView
      className="h-full bg-white px-4"
      showsVerticalScrollIndicator={false}
    >
      {location && (
        <View className="flex-row items-center gap-1">
          <MapPin color="#005e42" />
          <ThemedText className="text-primary text-lg underline" weight="700">
            {location}
          </ThemedText>
        </View>
      )}
      <View className="bg-hover mt-4 items-center px-4 py-6">
        <Text style={{ fontFamily: "Domine-700" }} className="text-gray-500">
          WELCOME TO BUZZ
        </Text>

        <ThemedText weight="600" className="mt-2 text-center text-gray-500">
          <ThemedText weight="700" className="text-primary">
            Real-time
          </ThemedText>{" "}
          news, breaking{" "}
          <ThemedText weight="700" className="text-primary">
            headlines
          </ThemedText>
          , and{" "}
          <ThemedText weight="700" className="text-primary">
            trending
          </ThemedText>{" "}
          stories - all in one place.
        </ThemedText>
      </View>

      {/* Latest News */}
      <View className="mt-4 flex-row justify-between">
        <ThemedText className="text-xl" weight="700">
          Latest News
        </ThemedText>

        <Link href="/articles">
          <View className="flex flex-row items-center">
            <ThemedText className="text-primary underline">See all</ThemedText>
            <ArrowRight color={THEME.colors.primary} size={18} />
          </View>
        </Link>
      </View>

      <View className="mt-4 flex-row flex-wrap">
        {loading && (
          <ActivityIndicator color={THEME.colors.primary} className="mx-auto" />
        )}
        {!loading &&
          data?.results.map((item) => (
            <ArticleCard data={item} key={item.url} />
          ))}
        {data && data?.count < 1 && !loading && (
          <ThemedText className="text-center text-gray-500">
            No news to show at the moment.
          </ThemedText>
        )}
      </View>
    </ScrollView>
  );
}
