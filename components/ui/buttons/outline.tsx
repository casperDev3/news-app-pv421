import {TouchableOpacity, Text, StyleSheet} from "react-native";
import {Primary, Grayscale} from "@/constants/colors";
import {useFonts, Poppins_500Medium} from "@expo-google-fonts/poppins"

interface IProps {
    width: number | null;
    height: number | null;
    text: string | null;
    onPress?: () => void;
}

const OutlineButton = ({width, height, text, onPress}: IProps) => {
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
            height: height ? height : "100%",
        }}
                          onPress={onPress}
        >
            <Text style={s.text}>
                {text ? text : "Outline Button"}
            </Text>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    button: {
        // paddingHorizontal: 24,
        // paddingVertical: 12,
        backgroundColor: Grayscale.white,
        borderWidth: 1,
        borderColor: Primary.default,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: Primary.default,
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
    }
})

export default OutlineButton