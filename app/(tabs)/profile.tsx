import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import {useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium} from "@expo-google-fonts/poppins"
import {Settings} from "lucide-react-native"
import {Grayscale, Primary} from "@/constants/colors"
import {useRouter} from "expo-router"
import TopSpace from "@/components/system/topSpace"
import NewsCard from "@/components/cards/newsCard"
import {news} from "@/mockup/news"
import {Link} from "expo-router"

const STATS = [
    {label: "Articles", value: "32"},
    {label: "Followers", value: "1.4K"},
    {label: "Following", value: "120"},
]

const ProfileScreen = () => {
    // init
    const [fontsLoaded] = useFonts({Poppins_700Bold, Poppins_400Regular, Poppins_500Medium})
    const router = useRouter()

    // load
    if (!fontsLoaded) return null

    return (
        <View style={s.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TopSpace/>

                {/* top nav */}
                <View style={s.topNav}>
                    <Text style={s.navTitle}>Profile</Text>
                    <TouchableOpacity onPress={() => router.push('/settings')}>
                        <Settings size={22} color={Grayscale.textActive}/>
                    </TouchableOpacity>
                </View>

                {/* avatar + info */}
                <View style={s.profileWrap}>
                    <Image
                        style={s.avatar}
                        source={{uri: "https://picsum.photos/seed/wilson/200/200"}}
                    />
                    <Text style={s.name}>Wilson Franci</Text>
                    <Text style={s.username}>@wilsonfranci</Text>

                    {/* stats */}
                    <View style={s.stats}>
                        {STATS.map((stat, index) => (
                            <View key={stat.label} style={s.statItem}>
                                <Text style={s.statValue}>{stat.value}</Text>
                                <Text style={s.statLabel}>{stat.label}</Text>
                                {index < STATS.length - 1 && <View style={s.statDivider}/>}
                            </View>
                        ))}
                    </View>
                    {/* @ts-ignore */}
                    <Link href={'/chats/'}>
                        <Text>
                            Chats
                        </Text>
                    </Link>
                </View>

                {/* articles */}
                <View style={s.section}>
                    <Text style={s.sectionTitle}>My Articles</Text>
                    {news.map((item) => (
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
    topNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28,
    },
    navTitle: {
        fontSize: 20,
        fontFamily: "Poppins_700Bold",
        color: Grayscale.textActive,
    },
    profileWrap: {
        alignItems: "center",
        marginBottom: 32,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 12,
    },
    name: {
        fontSize: 20,
        fontFamily: "Poppins_700Bold",
        color: Grayscale.textActive,
        marginBottom: 4,
    },
    username: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
        marginBottom: 24,
    },
    stats: {
        flexDirection: "row",
        backgroundColor: Grayscale.disabledInput,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        width: "100%",
    },
    statItem: {
        flex: 1,
        alignItems: "center",
        position: "relative",
    },
    statValue: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: Grayscale.textActive,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    statDivider: {
        position: "absolute",
        right: 0,
        top: 4,
        bottom: 4,
        width: 1,
        backgroundColor: Grayscale.placeholderText,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: Grayscale.textActive,
        marginBottom: 16,
    },
})

export default ProfileScreen
