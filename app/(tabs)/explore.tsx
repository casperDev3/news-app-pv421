import {View, Text, StyleSheet, ScrollView} from 'react-native';
import TopSpace from "@/components/system/topSpace";
import CompactTopicCard from "@/components/cards/compactTopic"
import PopularTopicCard from "@/components/cards/popularTopic";
import {useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium} from "@expo-google-fonts/poppins"
import {useState} from "react";
import {Link} from "expo-router";
import {Grayscale} from "@/constants/colors";


const ExploreScreen = () => {
    // init
    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular,
        Poppins_500Medium
    })
    const [isSaved, setIsSaved] = useState<boolean>(true)

    // load
    if (!fontsLoaded) {
        return null
    }
    return (
        <View style={s.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TopSpace/>
                <Text style={s.title}>
                    Explore
                </Text>
                <View style={s.CT}>
                    <View style={s.CTHeader}>
                        <Text style={s.CTHeaderLabel}>
                            Topic
                        </Text>
                        <Link style={s.CTHeaderLink} href={"/"}>
                            See All
                        </Link>
                    </View>
                    <CompactTopicCard/>
                    <CompactTopicCard/>
                    <CompactTopicCard/>
                </View>
                <View style={s.PT}>
                    <View style={s.PTHeader}>
                        <Text style={s.PTHeaderLabel}>
                            Popular Topics
                        </Text>
                    </View>
                    <PopularTopicCard/>
                    <PopularTopicCard/>
                    <PopularTopicCard/>
                    <PopularTopicCard/>
                </View>
            </ScrollView>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        paddingHorizontal: 28,

    },
    title: {
        fontSize: 32,
        marginBottom: 30,
        fontFamily: "Poppins_700Bold",
        fontWeight: "bold",
    },
    CT: {
        marginBottom: 22
    },
    CTHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 22
    },
    CTHeaderLabel: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: "#000",
        fontWeight: "bold",
    },
    CTHeaderLink: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText
    },
    PT: {
        marginBottom: 22,
    },
    PTHeader: {
        marginBottom: 22
    },
    PTHeaderLabel: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: "#000",
        fontWeight: "bold",
    }
})

export default ExploreScreen;