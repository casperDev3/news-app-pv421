import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native'
import {useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium} from "@expo-google-fonts/poppins"
import {useRouter} from "expo-router"
import {Grayscale, Primary} from "@/constants/colors"
import PrimaryButton from "@/components/ui/buttons/primary"
import OutlineButton from "@/components/ui/buttons/outline"

const {height} = Dimensions.get('window')

const Onboarding3Screen = () => {
    // init
    const [fontsLoaded] = useFonts({Poppins_700Bold, Poppins_400Regular, Poppins_500Medium})
    const router = useRouter()

    // load
    if (!fontsLoaded) return null

    return (
        <View style={s.container}>
            {/* full-screen image */}
            <Image
                style={s.image}
                source={{uri: "https://picsum.photos/seed/bookmark3/800/1000"}}
            />

            {/* bottom card */}
            <View style={s.card}>
                {/* dots */}
                <View style={s.dots}>
                    <View style={s.dot}/>
                    <View style={s.dot}/>
                    <View style={[s.dot, s.dotActive]}/>
                </View>

                <Text style={s.title}>Stay Ahead of the Curve</Text>
                <Text style={s.desc}>
                    Save articles for later, follow your favorite authors, and never miss a story that matters to you.
                </Text>

                <PrimaryButton
                    width={null}
                    height={52}
                    text="Get Started"
                    onPress={() => router.replace('/(auth)/login')}
                />
                <View style={s.gap}/>
                <OutlineButton
                    width={null}
                    height={48}
                    text="I already have an account"
                    onPress={() => router.replace('/(auth)/login')}
                />
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    image: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.62,
    },
    card: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Grayscale.white,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 28,
        paddingTop: 32,
        paddingBottom: 48,
    },
    dots: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 24,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Grayscale.disabledInput,
    },
    dotActive: {
        width: 28,
        borderRadius: 4,
        backgroundColor: Primary.default,
    },
    title: {
        fontSize: 26,
        fontFamily: "Poppins_700Bold",
        color: Grayscale.textActive,
        marginBottom: 12,
    },
    desc: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
        lineHeight: 24,
        marginBottom: 32,
    },
    gap: {height: 12},
})

export default Onboarding3Screen
