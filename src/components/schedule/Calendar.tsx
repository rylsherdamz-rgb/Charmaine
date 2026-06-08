import {Calendar, CalendarUtils} from "react-native-calendars"
import {Text, View} from "react-native"


export default function CalendarComponent() {
    const date = new Date().getTime()

    return <View className="flex flex-1 w-full h-full">
        <Text>
            Test Calendar
        </Text>

        <Calendar
        enableSwipeMonths
        current={date}
        />


        {/* append more schedule in here so i can manage it here */}


    </View>
}
