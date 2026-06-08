import { useTheme } from "@/hooks/useTheme";
import { View, Text, FlatList } from "react-native";
import useNIM from "@/hooks/useNIM";
import { useEffect } from "react";

export default function SettingScreen() {
  const theme = useTheme();

  // const { getAvailableModels, ModelList } = useNIM();

  // useEffect(() => {
  //   getAvailableModels();
  // }, []);
  //
    //
    //
    //{/* <FlatList */}
      // {/*   data={ModelList} */}
      // {/*   keyExtractor={(item) => item.id} */}
      // {/*   renderItem={({ item }) => ( */}
      // {/*     <View className="p-2"> */}
      // {/*       <Text>{item.id}</Text> */}
      // {/**/}
      // {/*       {/* get the owner to arrange them maybe try to see where to get the desc */} */}
      // {/*     </View> */}
      // {/*   )} */}
      // {/* /> */}
  return (
    <View className="flex-1">
      <Text>ModelList</Text>


    </View>
  );
}



