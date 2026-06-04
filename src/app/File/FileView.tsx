import { Pressable, View, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"


// this is all of the file that have been uploaded will shows

export default function FileView() {
    const insets = useSafeAreaInsets()
    return <View
        style={{paddingBottom : insets.top}}
        className="w-full h-full flex">

    </View>
}
