import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {useFonts, Poppins_500Medium, Poppins_400Regular} from "@expo-google-fonts/poppins"
import {Grayscale, Primary} from "@/constants/colors"
import {Heart, CornerUpLeft} from "lucide-react-native"
import {Comment} from "@/mockup/comments"

interface IProps {
    data: Comment;
    isReply?: boolean;
}

const CommentCard = ({data, isReply = false}: IProps) => {
    // init
    const [fontsLoaded] = useFonts({Poppins_500Medium, Poppins_400Regular})
    const {author, avatar, text, time, likes, liked, replies} = data

    // load
    if (!fontsLoaded) return null

    const formatLikes = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n)

    return (
        <View style={[s.container, isReply && s.containerReply]}>
            <Image
                style={[s.avatar, isReply && s.avatarSmall]}
                source={{uri: avatar}}
            />
            <View style={s.content}>
                <Text style={s.author}>{author}</Text>
                <Text style={s.text}>{text}</Text>
                <View style={s.actions}>
                    <Text style={s.time}>{time}</Text>
                    <TouchableOpacity style={s.actionBtn}>
                        <Heart
                            size={14}
                            color={liked ? Primary.errorDefault : Grayscale.bodyText}
                            fill={liked ? Primary.errorDefault : "none"}
                        />
                        <Text style={s.actionText}>{formatLikes(likes)} likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.actionBtn}>
                        <CornerUpLeft size={14} color={Grayscale.bodyText}/>
                        <Text style={s.actionText}>reply</Text>
                    </TouchableOpacity>
                </View>

                {/* first reply */}
                {replies && replies.length > 0 && (
                    <CommentCard data={replies[0]} isReply={true}/>
                )}
                {/* see more */}
                {replies && replies.length > 1 && (
                    <TouchableOpacity style={s.seeMoreBtn}>
                        <Text style={s.seeMore}>See more ({replies.length})</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 24,
    },
    containerReply: {
        marginTop: 16,
        marginBottom: 0,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
    },
    avatarSmall: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    content: {
        flex: 1,
    },
    author: {
        fontSize: 15,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.textActive,
        marginBottom: 2,
    },
    text: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
        lineHeight: 20,
        marginBottom: 8,
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    time: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    actionBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    actionText: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    seeMoreBtn: {
        marginTop: 8,
    },
    seeMore: {
        fontSize: 13,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.textActive,
    },
})

export default CommentCard
