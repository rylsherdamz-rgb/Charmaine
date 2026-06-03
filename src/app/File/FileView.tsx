import { Pressable, View, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function FileView() {
    const insets = useSafeAreaInsets()
    return <View
        style={{paddingBottom : insets.top}}
        className="w-full h-full flex">

    </View>
}
