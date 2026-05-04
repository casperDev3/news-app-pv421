import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Button, Alert} from 'react-native'
import {useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium} from "@expo-google-fonts/poppins"
import {useEffect, useState} from "react"
import {Link} from "expo-router"
import {Bell} from "lucide-react-native"
import {Grayscale, Primary} from "@/constants/colors"
import TopSpace from "@/components/system/topSpace"
import SearchBar from "@/components/ui/searchBar"
import PopularTopicCard from "@/components/cards/popularTopic"
import NewsCard from "@/components/cards/newsCard"
import {news} from "@/mockup/news"
import * as Notifications from "expo-notifications";


const CATEGORIES = ["All", "Sports", "Politics", "Business", "Health", "Travel", "Science"]

const HomeScreen = () => {
    // init
    const [fontsLoaded] = useFonts({Poppins_700Bold, Poppins_400Regular, Poppins_500Medium})
    const [activeCategory, setActiveCategory] = useState("All")


    // load
    if (!fontsLoaded) return null

    const trending = news[2]
    const filteredNews = activeCategory === "All"
        ? news
        : news.filter(n => n.category === activeCategory)

    // handlers
    const handlePN = async () => {
        try {
            await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "test",
                        body: "test",

                    },
                    trigger: null
                }
            )
        } catch (error) {
            console.log(error)
        } finally {
            console.log("It's also done")
        }
    }

    // @ts-ignore
    return (
        <View style={s.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TopSpace/>

                {/* header */}
                <View style={s.header}>
                    <Text style={s.logo}>KaBar</Text>
                    <TouchableOpacity>
                        <Bell size={24} color={Grayscale.textActive}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <Button title={"test push notification"} onPress={handlePN}/>
                </View>

                <SearchBar/>

                {/* Trending */}
                <View style={s.section}>
                    <View style={s.sectionHeader}>
                        <Text style={s.sectionTitle}>Trending</Text>
                        <Link style={s.seeAll} href="/">See all</Link>
                    </View>
                    {/* @ts-ignore */}
                    <PopularTopicCard data={trending}/>
                </View>

                {/* Latest */}
                <View style={s.section}>
                    <View style={s.sectionHeader}>
                        <Text style={s.sectionTitle}>Latest</Text>
                        <Link style={s.seeAll} href="/">See all</Link>
                    </View>

                    {/* category tabs */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.tabsWrap}>
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[s.tab, activeCategory === cat && s.tabActive]}
                                onPress={() => setActiveCategory(cat)}
                            >
                                <Text style={[s.tabText, activeCategory === cat && s.tabTextActive]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* news list */}
                    {filteredNews.map((item) => (
                        // @ts-ignore
                        <NewsCard key={item.id} data={item}/>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}


const s = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 28,
        backgroundColor: Grayscale.white,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        fontSize: 28,
        fontFamily: "Poppins_700Bold",
        color: Primary.default,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: Grayscale.textActive,
    },
    seeAll: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    tabsWrap: {
        marginBottom: 16,
    },
    tab: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
    },
    tabActive: {
        backgroundColor: Primary.default,
    },
    tabText: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    tabTextActive: {
        color: Grayscale.white,
    },
})

export default HomeScreen
