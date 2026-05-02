import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {useFonts, Poppins_700Bold, Poppins_400Regular} from "@expo-google-fonts/poppins"
import {useRouter} from "expo-router"
import {useState} from "react"
import {ChevronLeft} from "lucide-react-native"
import {Grayscale, Primary} from "@/constants/colors"
import TopSpace from "@/components/system/topSpace"
import FormInput from "@/components/ui/input"
import PrimaryButton from "@/components/ui/buttons/primary"

const ForgotPasswordScreen = () => {
    // init
    const [fontsLoaded] = useFonts({Poppins_700Bold, Poppins_400Regular})
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)

    // load
    if (!fontsLoaded) return null

    // handlers
    const handleSend = () => {
        if (email.trim()) {
            setSent(true)
        }
    }

    return (
        <View style={s.container}>
            <TopSpace/>

            {/* back */}
            <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
                <ChevronLeft size={24} color={Grayscale.textActive}/>
            </TouchableOpacity>

            <Text style={s.title}>Forgot Password?</Text>
            <Text style={s.subtitle}>
                Enter your registered email. We'll send you a link to reset your password.
            </Text>

            {sent ? (
                <View style={s.successWrap}>
                    <Text style={s.successText}>
                        ✅ Reset link sent! Check your email inbox.
                    </Text>
                    <TouchableOpacity style={s.backToLoginBtn} onPress={() => router.replace('/(auth)/login')}>
                        <Text style={s.backToLoginText}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <View style={s.form}>
                        <FormInput
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>
                    <PrimaryButton
                        width={null}
                        height={52}
                        text="Send Reset Link"
                        onPress={handleSend}
                    />
                    <TouchableOpacity
                        style={s.backToLoginBtn}
                        onPress={() => router.back()}
                    >
                        <Text style={s.backToLoginText}>Back to Login</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 28,
        backgroundColor: Grayscale.white,
    },
    backBtn: {
        marginBottom: 24,
    },
    title: {
        fontSize: 26,
        fontFamily: "Poppins_700Bold",
        color: Grayscale.textActive,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
        lineHeight: 22,
        marginBottom: 32,
    },
    form: {
        marginBottom: 8,
    },
    successWrap: {
        marginTop: 20,
    },
    successText: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: Primary.successDefault,
        lineHeight: 22,
        marginBottom: 32,
    },
    backToLoginBtn: {
        alignItems: "center",
        marginTop: 20,
    },
    backToLoginText: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: Primary.default,
    },
})

export default ForgotPasswordScreen
