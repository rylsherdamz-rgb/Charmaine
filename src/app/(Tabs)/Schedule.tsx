import {View, Text, Pressable} from "react-native"
import AppHeader from "@/components/AppHeader"
import { useSafeAreaInsets } from "react-native-safe-area-context"


// use the calendar and use it to display real events and timeline read the docs
// to implement this fully

export default function Schedule( ) {
    const insets = useSafeAreaInsets()

    return <View
        style={{marginTop : insets.top}}
        className="w-full h-full flex flex-1">
        <AppHeader />


    </View>

}
