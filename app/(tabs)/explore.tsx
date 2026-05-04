import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {useFonts, Poppins_700Bold, Poppins_400Regular} from "@expo-google-fonts/poppins"
import {useEffect, useState} from "react"
import {Link} from "expo-router"
import {Grayscale} from "@/constants/colors"
import TopSpace from "@/components/system/topSpace"
import CompactTopicCard from "@/components/cards/compactTopic"
import PopularTopicCard from "@/components/cards/popularTopic"
import {topics} from "@/mockup/topics"
import ApiClient from "@/services/api";


const ExploreScreen = () => {
    // init
    const [fontsLoaded] = useFonts({Poppins_700Bold, Poppins_400Regular})
    const [savedTopics, setSavedTopics] = useState<number[]>([])
    const [news, setNews] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false);

    // load
    useEffect(() => {

        (async () => {
            try {
                setLoading(true);
                const response = await ApiClient.getInstance().get("/news/")
                const {data} = response
                setNews(data)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        })()

    }, []);

    if (!fontsLoaded) return null

    // handlers
    const handleToggleSave = (id: number) => {
        setSavedTopics(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        )
    }


    return (
        <View style={s.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TopSpace/>
                <Text style={s.title}>Explore</Text>

                {/* Topics */}
                <View style={s.CT}>
                    <View style={s.CTHeader}>
                        <Text style={s.CTHeaderLabel}>Topic</Text>
                        <Link style={s.CTHeaderLink} href="/">See All</Link>
                    </View>
                    {topics.map((item) => (
                        <CompactTopicCard
                            key={item.id}
                            data={item}
                            saved={savedTopics.includes(item.id)}
                            onToggleSave={() => handleToggleSave(item.id)}
                        />
                    ))}
                </View>

                {/* Popular Topics */}
                <View style={s.PT}>
                    <View style={s.PTHeader}>
                        <Text style={s.PTHeaderLabel}>Popular Topics</Text>
                    </View>
                    {news.map((item: any) => (
                        <PopularTopicCard key={item.id} data={item}/>
                    ))}
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
        marginBottom: 22,
    },
    CTHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 22,
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
        color: Grayscale.bodyText,
    },
    PT: {
        marginBottom: 22,
    },
    PTHeader: {
        marginBottom: 22,
    },
    PTHeaderLabel: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: "#000",
        fontWeight: "bold",
    },
})

export default ExploreScreen
