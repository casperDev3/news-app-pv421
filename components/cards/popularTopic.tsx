import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native"
import {useFonts, Poppins_500Medium, Poppins_700Bold} from "@expo-google-fonts/poppins"
import {Grayscale} from "@/constants/colors"
import {Clock, MoreHorizontal} from "lucide-react-native"
import {useRouter} from 'expo-router'
import {Article} from "@/store/slices/bookmarksSlice"

interface IProps {
    data: Article;
}

const PopularTopicCard = ({data}: IProps) => {
    // init
    const [fontsLoaded] = useFonts({Poppins_500Medium, Poppins_700Bold})
    const router = useRouter()
    const {id, title, image, category, sourceImage, author, source, created_date} = data
    const time = new Date(created_date).toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
    })
    // load
    if (!fontsLoaded) return null

    return (
        <View style={s.card}>
            <TouchableOpacity onPress={() => router.push(`/news/${id}`)}>
                <Image style={s.cardCover} source={{uri: image || "https://picsum.photos/seed/navy1/800/450"}}/>
            </TouchableOpacity>
            <Text style={s.cardCategory}>{category || ""}</Text>
            <TouchableOpacity onPress={() => router.push(`/news/${id}`)}>
                <Text style={s.cardTitle}>{title}</Text>
            </TouchableOpacity>
            <View style={s.cardDetails}>
                <View style={s.cardDetailsMeta}>
                    <View style={s.CDMSource}>
                        <Image style={s.CDMSourceImg} source={{uri: sourceImage || "https://picsum.photos/seed/navy1/800/450"}}/>
                        <Text style={s.CDMSourceText}>{author?.username || "Anonim"}</Text>
                    </View>
                    <View style={s.CDMTime}>
                        <Clock size={12} color={Grayscale.bodyText}/>
                        <Text style={s.CDMTimeText}>{time}</Text>
                    </View>
                </View>
                <TouchableOpacity style={s.moreBtn}>
                    <MoreHorizontal size={18} color={Grayscale.bodyText}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    card: {
        marginBottom: 30,
    },
    cardCover: {
        width: '100%',
        height: 180,
        borderRadius: 6,
        marginBottom: 8,
    },
    cardCategory: {
        fontSize: 12,
        color: Grayscale.bodyText,
        fontFamily: "Poppins_500Medium",
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        color: "#000",
        marginBottom: 8,
        lineHeight: 22,
    },
    cardDetails: {
        flexDirection: 'row',
        alignItems: "center",
    },
    cardDetailsMeta: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        gap: 12,
    },
    CDMSource: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    CDMSourceImg: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    CDMSourceText: {
        color: Grayscale.bodyText,
        fontFamily: "Poppins_500Medium",
        fontSize: 13,
    },
    CDMTime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    CDMTimeText: {
        fontSize: 13,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.bodyText,
    },
    moreBtn: {
        padding: 4,
    },
})

export default PopularTopicCard
