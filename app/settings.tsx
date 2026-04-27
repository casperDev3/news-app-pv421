import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch} from 'react-native'
import {useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium} from "@expo-google-fonts/poppins"
import {useRouter} from "expo-router"
import {useState} from "react"
import {ChevronLeft, ChevronRight, Bell, Lock, Globe, Info, LogOut, Smartphone, KeyRound} from "lucide-react-native"
import {Grayscale, Primary} from "@/constants/colors"
import TopSpace from "@/components/system/topSpace"

interface SettingsRowProps {
    icon: React.ReactNode;
    label: string;
    onPress?: () => void;
    right?: React.ReactNode;
}

const SettingsRow = ({icon, label, onPress, right}: SettingsRowProps) => (
    <TouchableOpacity style={r.row} onPress={onPress} activeOpacity={onPress ? 0.6 : 1}>
        <View style={r.rowLeft}>
            <View style={r.iconWrap}>{icon}</View>
            <Text style={r.rowLabel}>{label}</Text>
        </View>
        {right ?? <ChevronRight size={18} color={Grayscale.bodyText}/>}
    </TouchableOpacity>
)

const r = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: Grayscale.disabledInput,
    },
    rowLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },
    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: Grayscale.disabledInput,
        justifyContent: "center",
        alignItems: "center",
    },
    rowLabel: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.textActive,
    },
})

const SettingsScreen = () => {
    // init
    const [fontsLoaded] = useFonts({Poppins_700Bold, Poppins_400Regular, Poppins_500Medium})
    const router = useRouter()
    const [notifications, setNotifications] = useState(true)

    // load
    if (!fontsLoaded) return null

    // handlers
    const handleLogout = () => {
        router.replace('/(auth)/login')
    }

    return (
        <View style={s.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TopSpace/>

                {/* header */}
                <View style={s.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeft size={24} color={Grayscale.textActive}/>
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Settings</Text>
                    <View style={s.headerSpacer}/>
                </View>

                {/* profile card */}
                <View style={s.profileCard}>
                    <Image
                        style={s.avatar}
                        source={{uri: "https://picsum.photos/seed/wilson/200/200"}}
                    />
                    <View style={s.profileInfo}>
                        <Text style={s.profileName}>Wilson Franci</Text>
                        <Text style={s.profileEmail}>wilson@email.com</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/edit-profile')}>
                        <Text style={s.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                {/* account */}
                <Text style={s.sectionLabel}>Account</Text>
                <SettingsRow
                    icon={<Globe size={18} color={Primary.default}/>}
                    label="Language"
                    onPress={() => {}}
                />
                <SettingsRow
                    icon={<Lock size={18} color={Primary.default}/>}
                    label="Change Password"
                    onPress={() => {}}
                />

                {/* preferences */}
                <Text style={s.sectionLabel}>Preferences</Text>
                <SettingsRow
                    icon={<Bell size={18} color={Primary.default}/>}
                    label="Push Notifications"
                    right={
                        <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                            trackColor={{false: Grayscale.disabledInput, true: Primary.default}}
                            thumbColor={Grayscale.white}
                        />
                    }
                />

                {/* about */}
                <Text style={s.sectionLabel}>About</Text>
                <SettingsRow
                    icon={<Info size={18} color={Primary.default}/>}
                    label="Privacy Policy"
                    onPress={() => {}}
                />
                <SettingsRow
                    icon={<Info size={18} color={Primary.default}/>}
                    label="Terms of Service"
                    onPress={() => {}}
                />
                <View style={r.row}>
                    <View style={r.rowLeft}>
                        <View style={r.iconWrap}>
                            <Info size={18} color={Primary.default}/>
                        </View>
                        <Text style={r.rowLabel}>App Version</Text>
                    </View>
                    <Text style={s.version}>1.0.0</Text>
                </View>

                {/* demo */}
                <Text style={s.sectionLabel}>Демонстрація</Text>
                <SettingsRow
                    icon={<Smartphone size={18} color={Primary.successDefault}/>}
                    label="Онбординг"
                    onPress={() => router.push('/onboarding')}
                />
                <SettingsRow
                    icon={<KeyRound size={18} color={Primary.successDefault}/>}
                    label="Сторінка логіну"
                    onPress={() => router.push('/(auth)/login')}
                />

                {/* logout */}
                <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
                    <LogOut size={20} color={Primary.errorDefault}/>
                    <Text style={s.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 28,
        backgroundColor: Grayscale.white,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: Grayscale.textActive,
    },
    headerSpacer: {
        width: 24,
    },
    profileCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Grayscale.disabledInput,
        borderRadius: 12,
        padding: 16,
        marginBottom: 28,
        gap: 12,
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.textActive,
        marginBottom: 2,
    },
    profileEmail: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    editText: {
        fontSize: 14,
        fontFamily: "Poppins_500Medium",
        color: Primary.default,
    },
    sectionLabel: {
        fontSize: 13,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.bodyText,
        marginTop: 24,
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: 0.8,
    },
    version: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
    },
    logoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 40,
        marginBottom: 60,
        paddingVertical: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Primary.errorDefault,
    },
    logoutText: {
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        color: Primary.errorDefault,
    },
})

export default SettingsScreen
