import { Tabs } from "expo-router";
import {Feather} from "@expo/vector-icons"


export default function TabsLayout() {
    return (
    <Tabs>
        <Tabs.Screen
            name="Home"
            options={{
                    title : "Home"
                }}
            >

        </Tabs.Screen>
            <Tabs.Screen
            name="Setting"
            options={{
                    title : "Setting"
                }}
            >

        </Tabs.Screen>
    </Tabs>
    )
}

