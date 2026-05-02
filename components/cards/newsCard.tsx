import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {useFonts, Poppins_500Medium, Poppins_400Regular} from "@expo-google-fonts/poppins"
import {Grayscale} from "@/constants/colors"
import {Clock} from "lucide-react-native"
import {useRouter} from "expo-router"
import {Article} from "@/store/slices/bookmarksSlice"

interface IProps {
    data: Article;
}

const NewsCard = ({data}: IProps) => {
    // init
    const [fontsLoaded] = useFonts({Poppins_500Medium, Poppins_400Regular})
    const router = useRouter()
    const {id, title, category, source, sourceImage, time, image} = data

    // load
    if (!fontsLoaded) return null

    return (
        <TouchableOpacity style={s.card} onPress={() => router.push(`/news/${id}`)}>
            <Image style={s.cardImage} source={{uri: image}}/>
            <View style={s.cardContent}>
                <Text style={s.cardCategory}>{category}</Text>
                <Text style={s.cardTitle} numberOfLines={2}>{title}</Text>
                <View style={s.cardMeta}>
                    <Image style={s.cardSourceImg} source={{uri: sourceImage}}/>
                    <Text style={s.cardSourceText}>{source}</Text>
                    <Clock size={12} color={Grayscale.bodyText} style={s.clockIcon}/>
                    <Text style={s.cardTimeText}>{time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    card: {
        flexDirection: "row",
        marginBottom: 20,
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    cardContent: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "center",
    },
    cardCategory: {
        fontSize: 12,
        color: Grayscale.bodyText,
        fontFamily: "Poppins_400Regular",
        marginBottom: 2,
    },
    cardTitle: {
        fontSize: 14,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.textActive,
        lineHeight: 20,
        marginBottom: 8,
    },
    cardMeta: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    cardSourceImg: {
        width: 16,
        height: 16,
        borderRadius: 8,
    },
    cardSourceText: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    clockIcon: {
        marginLeft: 6,
    },
    cardTimeText: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
})

export default NewsCard
