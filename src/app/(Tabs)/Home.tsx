import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Pressable } from "react-native";
import AppHeader from "@/components/AppHeader";

export default function Home() {
    const insets = useSafeAreaInsets()
    return <View
        style={{paddingTop : insets.top}}
        className="w-full   h-full flex">
        <AppHeader />

    </View>

}
