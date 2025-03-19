import { LucideIcon } from "lucide-react-native";
import { Text, View } from "react-native";

interface WeatherDetailItemProps {
  title: string;
  Icon: LucideIcon;
  value: string;
  metric?: string;
}

const WeatherDetailItem = ({
  Icon,
  title,
  value,
  metric,
}: WeatherDetailItemProps) => {
  return (
    <View className="flex flex-1 flex-col items-center">
      <View
        className="flex w-full flex-row items-center justify-center gap-2 rounded-full bg-white/20 font-bold"
        style={{ padding: 8, width: 130 }}
      >
        <Icon className="size-6" color="black" />
        <Text className="text-lg font-bold">{title}</Text>
      </View>

      <Text className="mt-4 text-2xl font-semibold">
        {value} {metric && <Text className="text-foreground/50">{metric}</Text>}
      </Text>
    </View>
  );
};

export default WeatherDetailItem;
