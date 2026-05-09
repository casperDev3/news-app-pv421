import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import {useFonts, Poppins_500Medium, Poppins_400Regular} from "@expo-google-fonts/poppins"
import {useRouter} from "expo-router"
import {useState, useRef, useEffect} from "react"
import {ChevronLeft, Send} from "lucide-react-native"
import {Grayscale, Primary} from "@/constants/colors"
import CommentCard from "@/components/cards/commentCard"
import {comments} from "@/mockup/comments"
import * as Notifications from "expo-notifications";


const WS_URL = Platform.OS === 'ios'
    ? 'ws://localhost:8080/ws/notifications/'
    : 'ws://10.0.2.2:8080/ws/notifications/'

const NewsCommentsScreen = () => {
    // init
    const [fontsLoaded] = useFonts({Poppins_500Medium, Poppins_400Regular})
    const router = useRouter()
    const [text, setText] = useState("")
    const ws = useRef<WebSocket | null>(null)

    // handlers
    const handlePN = async (title: string, body: string) => {
        try {
            await Notifications.scheduleNotificationAsync({
                    content: {
                        title: title || "test",
                        body: body || "test",

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
    // load
    useEffect(() => {
        // connect to websockets
        ws.current = new WebSocket(WS_URL);

        ws.current.onopen = () => {
            console.log('WebSocket opened');
        }

        ws.current.onmessage = (data) => {
            // const {message} = data.data;
            const parsedData = JSON.parse(data.data)
            handlePN("New Article: ", parsedData.message).then()
        }
        return () => {
            if (ws.current) {
                ws.current.close()
            }
        }
    }, []);

    if (!fontsLoaded) return null
    // handlers
    const handleSend = () => {
        if (text.trim()) {
            setText("")
        }
    }

    return (
        <KeyboardAvoidingView
            style={s.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            {/* header */}
            <View style={s.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color={Grayscale.textActive}/>
                </TouchableOpacity>
                <Text style={s.headerTitle}>Comments</Text>
                <View style={s.headerSpacer}/>
            </View>

            <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
                {comments.map((comment) => (
                    <CommentCard key={comment.id} data={comment}/>
                ))}
            </ScrollView>

            {/* input bar */}
            <View style={s.inputBar}>
                <TextInput
                    style={s.input}
                    placeholder="Type your comment"
                    placeholderTextColor={Grayscale.placeholderText}
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity style={s.sendBtn} onPress={handleSend}>
                    <Send size={18} color={Grayscale.white}/>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Grayscale.white,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Grayscale.disabledInput,
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.textActive,
    },
    headerSpacer: {
        width: 24,
    },
    list: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    inputBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: Grayscale.disabledInput,
        gap: 12,
        backgroundColor: Grayscale.white,
    },
    input: {
        flex: 1,
        backgroundColor: Grayscale.disabledInput,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: Grayscale.textActive,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 8,
        backgroundColor: Primary.default,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default NewsCommentsScreen
