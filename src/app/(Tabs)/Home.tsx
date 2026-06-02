import { View, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function Home() {
    const insets = useSafeAreaInsets()
    return <View style={{paddingTop : insets.top}} className="w-full bg-white h-full">
        <Text className="text-white text-lg">
            This is the home page
        </Text>

    </View>
}
