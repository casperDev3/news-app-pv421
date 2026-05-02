import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput} from 'react-native'
import {useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium} from "@expo-google-fonts/poppins"
import {useRouter} from "expo-router"
import {useState} from "react"
import {ChevronLeft, Camera} from "lucide-react-native"
import {Grayscale, Primary} from "@/constants/colors"
import TopSpace from "@/components/system/topSpace"
import PrimaryButton from "@/components/ui/buttons/primary"

interface FieldProps {
    label: string
    value: string
    onChangeText?: (v: string) => void
    multiline?: boolean
    editable?: boolean
}

const Field = ({label, value, onChangeText, multiline = false, editable = true}: FieldProps) => (
    <View style={f.wrap}>
        <Text style={f.label}>{label}</Text>
        <TextInput
            style={[f.input, multiline && f.inputMulti, !editable && f.inputDisabled]}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            editable={editable}
            placeholderTextColor={Grayscale.placeholderText}
        />
    </View>
)

const f = StyleSheet.create({
    wrap: {marginBottom: 20},
    label: {
        fontSize: 13,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.bodyText,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: Grayscale.disabledInput,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: Grayscale.textActive,
        fontFamily: "Poppins_400Regular",
    },
    inputMulti: {
        height: 100,
        textAlignVertical: "top",
    },
    inputDisabled: {
        backgroundColor: Grayscale.disabledInput,
        color: Grayscale.bodyText,
    },
})

const EditProfileScreen = () => {
    // init
    const [fontsLoaded] = useFonts({Poppins_700Bold, Poppins_400Regular, Poppins_500Medium})
    const router = useRouter()
    const [name, setName] = useState("Wilson Franci")
    const [username, setUsername] = useState("wilsonfranci")
    const [bio, setBio] = useState("Journalist & storyteller. Passionate about truth and good writing.")

    // load
    if (!fontsLoaded) return null

    // handlers
    const handleSave = () => {
        router.back()
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
                    <Text style={s.headerTitle}>Edit Profile</Text>
                    <View style={s.headerSpacer}/>
                </View>

                {/* avatar */}
                <View style={s.avatarWrap}>
                    <Image
                        style={s.avatar}
                        source={{uri: "https://picsum.photos/seed/wilson/200/200"}}
                    />
                    <TouchableOpacity style={s.cameraBtn}>
                        <Camera size={16} color={Grayscale.white}/>
                    </TouchableOpacity>
                </View>

                {/* fields */}
                <View style={s.form}>
                    <Field label="Full Name" value={name} onChangeText={setName}/>
                    <Field label="Username" value={username} onChangeText={setUsername}/>
                    <Field label="Bio" value={bio} onChangeText={setBio} multiline/>
                    <Field label="Email" value="test@kabar.com" editable={false}/>
                </View>

                <PrimaryButton width={null} height={52} text="Save Changes" onPress={handleSave}/>
                <View style={s.bottomPad}/>
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
        marginBottom: 32,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: Grayscale.textActive,
    },
    headerSpacer: {width: 24},
    avatarWrap: {
        alignSelf: "center",
        marginBottom: 36,
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
    },
    cameraBtn: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Primary.default,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: Grayscale.white,
    },
    form: {marginBottom: 8},
    bottomPad: {height: 40},
})

export default EditProfileScreen
