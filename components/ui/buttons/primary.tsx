import {TouchableOpacity, Text, StyleSheet} from "react-native";
import {Primary, Grayscale} from "@/constants/colors";
import {useFonts, Poppins_500Medium} from "@expo-google-fonts/poppins"

interface IProps {
    width: number | null;
    height: number | null;
    text: string | null;
    onPress?: () => void;
}

const PrimaryButton = ({width, height, text, onPress}: IProps) => {
    // init
    const [fontsLoaded] = useFonts({
        Poppins_500Medium
    })
    // load
    if (!fontsLoaded) {
        return null
    }
    return (
        <TouchableOpacity style={{
            ...s.button,
            width: width ? width : "100%",
            height: height ? height : "100%"
        }}
                          onPress={onPress}
        >
            <Text style={s.text}>
                {text ? text : "Primary Button"}
            </Text>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    button: {
        // paddingHorizontal: 24,
        // paddingVertical: 12,
        backgroundColor: Primary.default,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: Grayscale.white,
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
    }
})

export default PrimaryButton