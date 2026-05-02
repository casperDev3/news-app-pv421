import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import {useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium} from "@expo-google-fonts/poppins"
import {useRouter} from "expo-router"
import {useState} from "react"
import {Grayscale, Primary} from "@/constants/colors"
import TopSpace from "@/components/system/topSpace"
import FormInput from "@/components/ui/input"
import PrimaryButton from "@/components/ui/buttons/primary"

const SignupScreen = () => {
    // init
    const [fontsLoaded] = useFonts({Poppins_700Bold, Poppins_400Regular, Poppins_500Medium})
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // load
    if (!fontsLoaded) return null

    // handlers
    const handleSignup = () => {
        router.replace('/(tabs)')
    }

    return (
        <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
            <TopSpace/>

            {/* header */}
            <Text style={s.logo}>KaBar</Text>
            <Text style={s.title}>Create Account</Text>
            <Text style={s.subtitle}>
                Fill in the details below to create your account
            </Text>

            {/* form */}
            <View style={s.form}>
                <FormInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={name}
                    onChangeText={setName}
                />
                <FormInput
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <FormInput
                    label="Password"
                    placeholder="Create a password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
            </View>

            <PrimaryButton
                width={null}
                height={52}
                text="Sign Up"
                onPress={handleSignup}
            />

            {/* divider */}
            <View style={s.divider}>
                <View style={s.dividerLine}/>
                <Text style={s.dividerText}>Or sign up with</Text>
                <View style={s.dividerLine}/>
            </View>

            {/* login link */}
            <TouchableOpacity
                style={s.loginBtn}
                onPress={() => router.push('/(auth)/login')}
            >
                <Text style={s.loginText}>
                    Already have an account?{" "}
                    <Text style={s.loginLink}>Login</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 28,
        backgroundColor: Grayscale.white,
    },
    logo: {
        fontSize: 28,
        fontFamily: "Poppins_700Bold",
        color: Primary.default,
        marginBottom: 32,
    },
    title: {
        fontSize: 26,
        fontFamily: "Poppins_700Bold",
        color: Grayscale.textActive,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
        marginBottom: 32,
        lineHeight: 22,
    },
    form: {
        marginBottom: 8,
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
        gap: 12,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Grayscale.disabledInput,
    },
    dividerText: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    loginBtn: {
        alignItems: "center",
        paddingBottom: 40,
    },
    loginText: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    loginLink: {
        color: Primary.default,
        fontFamily: "Poppins_500Medium",
    },
})

export default SignupScreen
