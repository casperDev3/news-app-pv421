import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native'
import {useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium} from "@expo-google-fonts/poppins"
import {useRouter} from "expo-router"
import {useDispatch} from "react-redux"
import {login} from "@/store/slices/authSlice"
import {useState} from "react"
import {Grayscale, Primary} from "@/constants/colors"
import TopSpace from "@/components/system/topSpace"
import FormInput from "@/components/ui/input"
import PrimaryButton from "@/components/ui/buttons/primary"
import OutlineButton from "@/components/ui/buttons/outline"
import ApiClient from "@/services/api";
import * as SecureStore from 'expo-secure-store'

const TEST_EMAIL = "test@kabar.com"
const TEST_PASSWORD = "kabar123"

const LoginScreen = () => {
    // init
    const [fontsLoaded] = useFonts({Poppins_700Bold, Poppins_400Regular, Poppins_500Medium})
    const router = useRouter()
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // load
    if (!fontsLoaded) return null

    // handlers
    const handleLogin = async () => {
        try {
            setLoading(true)
            const response = await ApiClient.getInstance().post(
                '/auth/login/',
                {
                    username,
                    password,
                }
            )
            // @ts-ignore
            const {access, refresh} = response.data;

            await SecureStore.setItemAsync('access_token', access);
            await SecureStore.setItemAsync('refresh_token', refresh);

            setError("")
            dispatch(login())
            router.replace('/(tabs)')
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleTestLogin = () => {
        setUsername(TEST_EMAIL)
        setPassword(TEST_PASSWORD)
        setError("")
        dispatch(login())
        router.replace('/(tabs)')
    }

    return (
        <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
            <TopSpace/>

            <Text style={s.logo}>KaBar</Text>
            <Text style={s.title}>Welcome back 👋</Text>
            <Text style={s.subtitle}>
                Enter your username and password to login
            </Text>

            {/* form */}
            <View style={s.form}>
                <FormInput
                    label="Username"
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={(v) => {
                        setUsername(v);
                        setError("")
                    }}
                />
                <FormInput
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={(v) => {
                        setPassword(v);
                        setError("")
                    }}
                    secureTextEntry={true}
                />
                {error ? <Text style={s.error}>{error}</Text> : null}
                <TouchableOpacity
                    style={s.forgotBtn}
                    onPress={() => router.push('/(auth)/forgot-password')}
                >
                    <Text style={s.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <PrimaryButton width={null} height={52} text="Login" onPress={handleLogin}/>

            {/* divider */}
            <View style={s.divider}>
                <View style={s.dividerLine}/>
                <Text style={s.dividerText}>або</Text>
                <View style={s.dividerLine}/>
            </View>

            {/* test credentials */}
            <View style={s.testWrap}>
                <View style={s.testCredentials}>
                    <Text style={s.testLabel}>Тестовий акаунт</Text>
                    <View style={s.testRow}>
                        <Text style={s.testKey}>Username</Text>
                        <Text style={s.testValue}>{TEST_EMAIL}</Text>
                    </View>
                    <View style={s.testRow}>
                        <Text style={s.testKey}>Password</Text>
                        <Text style={s.testValue}>{TEST_PASSWORD}</Text>
                    </View>
                </View>
                <OutlineButton
                    width={null}
                    height={48}
                    text="Виконати тестовий вхід"
                    onPress={handleTestLogin}
                />
            </View>

            {/* sign up link */}
            <TouchableOpacity
                style={s.signupBtn}
                onPress={() => router.push('/(auth)/signup')}
            >
                <Text style={s.signupText}>
                    Don&#39;t have an account?{" "}
                    <Text style={s.signupLink}>Sign up</Text>
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
    forgotBtn: {
        alignSelf: "flex-end",
        marginTop: -8,
        marginBottom: 20,
    },
    forgotText: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: Primary.default,
    },
    error: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: Primary.errorDefault,
        marginBottom: 12,
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
    testWrap: {
        gap: 16,
        marginBottom: 8,
    },
    testCredentials: {
        backgroundColor: Grayscale.disabledInput,
        borderRadius: 10,
        padding: 16,
        gap: 8,
    },
    testLabel: {
        fontSize: 12,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.buttonText,
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: 0.6,
    },
    testRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    testKey: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    testValue: {
        fontSize: 13,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.textActive,
    },
    signupBtn: {
        alignItems: "center",
        paddingVertical: 24,
        paddingBottom: 40,
    },
    signupText: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    signupLink: {
        color: Primary.default,
        fontFamily: "Poppins_500Medium",
    },
})

export default LoginScreen
