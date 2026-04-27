import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {useFonts, Poppins_400Regular} from "@expo-google-fonts/poppins"
import {Grayscale} from "@/constants/colors"
import {useState} from "react"
import {Eye, EyeOff} from "lucide-react-native"

interface IProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric";
}

const FormInput = ({label, placeholder, value, onChangeText, secureTextEntry = false, keyboardType = "default"}: IProps) => {
    // init
    const [fontsLoaded] = useFonts({Poppins_400Regular})
    const [showPassword, setShowPassword] = useState(false)

    // load
    if (!fontsLoaded) return null

    return (
        <View style={s.container}>
            {label && <Text style={s.label}>{label}</Text>}
            <View style={s.inputWrap}>
                <TextInput
                    style={s.input}
                    placeholder={placeholder}
                    placeholderTextColor={Grayscale.placeholderText}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && !showPassword}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                        {showPassword
                            ? <EyeOff size={18} color={Grayscale.bodyText}/>
                            : <Eye size={18} color={Grayscale.bodyText}/>
                        }
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
        marginBottom: 8,
    },
    inputWrap: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Grayscale.disabledInput,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: Grayscale.white,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: Grayscale.textActive,
    },
})

export default FormInput
