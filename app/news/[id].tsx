import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import {useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium} from "@expo-google-fonts/poppins"
import {useLocalSearchParams, useRouter} from "expo-router"
import {useState} from "react"
import {ChevronLeft, Share2, Heart, MessageCircle, Bookmark} from "lucide-react-native"
import {useDispatch, useSelector} from "react-redux"
import {toggleBookmark} from "@/store/slices/bookmarksSlice"
import {RootState} from "@/store"
import {Grayscale, Primary} from "@/constants/colors"
import {news} from "@/mockup/news"
import PrimaryButton from "@/components/ui/buttons/primary"

const ArticleScreen = () => {
    // init
    const [fontsLoaded] = useFonts({Poppins_700Bold, Poppins_400Regular, Poppins_500Medium})
    const {id} = useLocalSearchParams()
    const router = useRouter()
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [following, setFollowing] = useState(false)
    const bookmarks = useSelector((state: RootState) => state.bookmarks.savedArticles)

    const article = news.find(n => String(n.id) === String(id)) ?? news[0]
    const isBookmarked = bookmarks.some(b => b.id === article.id)

    // load
    if (!fontsLoaded) return null

    return (
        <View style={s.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* top nav */}
                <View style={s.topNav}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeft size={24} color={Grayscale.textActive}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Share2 size={22} color={Grayscale.bodyText}/>
                    </TouchableOpacity>
                </View>

                {/* source row */}
                <View style={s.sourceRow}>
                    <Image style={s.sourceLogo} source={{uri: article.sourceImage}}/>
                    <View style={s.sourceInfo}>
                        <Text style={s.sourceName}>{article.source}</Text>
                        <Text style={s.sourceTime}>{article.time}</Text>
                    </View>
                    <PrimaryButton
                        width={90}
                        height={34}
                        text={following ? "Following" : "Follow"}
                        onPress={() => setFollowing(!following)}
                    />
                </View>

                {/* cover */}
                <Image style={s.cover} source={{uri: article.image}}/>

                {/* content */}
                <View style={s.content}>
                    <Text style={s.category}>{article.category}</Text>
                    <Text style={s.title}>{article.title}</Text>
                    <Text style={s.body}>{article.body}</Text>
                </View>
            </ScrollView>

            {/* bottom bar */}
            <View style={s.bottomBar}>
                <TouchableOpacity style={s.interaction} onPress={() => setLiked(!liked)}>
                    <Heart
                        size={22}
                        color={liked ? Primary.errorDefault : Grayscale.bodyText}
                        fill={liked ? Primary.errorDefault : "none"}
                    />
                    <Text style={s.interactionText}>24.5K</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={s.interaction}
                    onPress={() => router.push(`/news/comments/${id}`)}
                >
                    <MessageCircle size={22} color={Grayscale.bodyText}/>
                    <Text style={s.interactionText}>1K</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(toggleBookmark(article))}>
                    <Bookmark
                        size={22}
                        color={isBookmarked ? Primary.default : Grayscale.bodyText}
                        fill={isBookmarked ? Primary.default : "none"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Grayscale.white,
    },
    topNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 16,
    },
    sourceRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sourceLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    sourceInfo: {
        flex: 1,
        marginLeft: 10,
    },
    sourceName: {
        fontSize: 14,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.textActive,
    },
    sourceTime: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    cover: {
        width: "100%",
        height: 220,
        marginBottom: 16,
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    category: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
        marginBottom: 8,
    },
    title: {
        fontSize: 22,
        fontFamily: "Poppins_700Bold",
        color: Grayscale.textActive,
        lineHeight: 32,
        marginBottom: 16,
    },
    body: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
        lineHeight: 24,
    },
    bottomBar: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: Grayscale.disabledInput,
        backgroundColor: Grayscale.white,
    },
    interaction: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    interactionText: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
})

export default ArticleScreen
