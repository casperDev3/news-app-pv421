import {View, Text, StyleSheet, Image} from 'react-native'
import PrimaryButton from "@/components/ui/buttons/primary"
import OutlineButton from "@/components/ui/buttons/outline"
import {useFonts, Poppins_500Medium} from "@expo-google-fonts/poppins"
import {Grayscale} from "@/constants/colors";
import {useState} from "react";

const CompactTopicCard = () => {
    // init
    const [fontsLoaded] = useFonts({
        Poppins_500Medium
    })
    const [isSaved, setIsSaved] = useState<boolean>(true)

    // load
    if (!fontsLoaded) {
        return null
    }

    // handlers
    const buttonHandler = () => {
        console.log("button clicked", !isSaved)
        setIsSaved(!isSaved)
    }

    return (
        <View style={s.container}>
            <View style={s.content}>
                <Image style={s.contentImage} source={require("@/assets/photos/ph_ship.png")}/>
                <View style={s.contentText}>
                    <Text style={s.contentTextTitle}>Health</Text>
                    <Text style={s.contentTextDesc} numberOfLines={2}>Get energizing workout moves, healthy
                        recipes...</Text>
                </View>
            </View>
            <View style={s.action}>
                {isSaved ? (
                    <PrimaryButton width={78} height={34} text={"Saved"} onPress={buttonHandler}/>
                ) : (
                    <OutlineButton width={78} height={34} text={"Save"} onPress={buttonHandler}/>
                )}
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    contentImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    contentText: {
        flex: 1,
        marginLeft: 12,
        marginRight: 12,
    },
    contentTextTitle: {
        color: "#000",
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        marginBottom: 4
    },
    contentTextDesc: {
        color: Grayscale.bodyText,
        fontSize: 14,
    },
    action: {
        justifyContent: "center",
    }
})

export default CompactTopicCard