import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native'
import {useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium} from "@expo-google-fonts/poppins"
import {useRouter} from "expo-router"
import {Grayscale, Primary} from "@/constants/colors"
import PrimaryButton from "@/components/ui/buttons/primary"

const {height} = Dimensions.get('window')

const Onboarding1Screen = () => {
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
                source={{uri: "https://picsum.photos/seed/news1/800/1000"}}
            />

            {/* skip */}
            <TouchableOpacity style={s.skip} onPress={() => router.replace('/(auth)/login')}>
                <Text style={s.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* bottom card */}
            <View style={s.card}>
                {/* dots */}
                <View style={s.dots}>
                    <View style={[s.dot, s.dotActive]}/>
                    <View style={s.dot}/>
                    <View style={s.dot}/>
                </View>

                <Text style={s.title}>Latest Breaking News</Text>
                <Text style={s.desc}>
                    Get all the breaking news and stories from around the world. Stay informed 24/7 with live updates.
                </Text>

                <PrimaryButton
                    width={null}
                    height={52}
                    text="Next"
                    onPress={() => router.push('/onboarding/two')}
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
    skip: {
        position: "absolute",
        top: 60,
        right: 28,
        backgroundColor: "rgba(0,0,0,0.35)",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    skipText: {
        fontSize: 14,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.white,
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
})

export default Onboarding1Screen
