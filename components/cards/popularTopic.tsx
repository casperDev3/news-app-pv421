import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native"
import {Grayscale} from "@/constants/colors";
import {useFonts, Poppins_500Medium, Poppins_700Bold} from "@expo-google-fonts/poppins"
import {useState} from "react";
import {Clock} from "lucide-react-native"

const PopularTopicCard = () => {
    // init
    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_700Bold
    })
    const [isSaved, setIsSaved] = useState<boolean>(true)

    // load
    if (!fontsLoaded) {
        return null
    }
    return (
        <View style={s.card}>
            <Image style={s.cardCover} source={require('@/assets/photos/ph_ship.png')} />
            <Text style={s.cardCountry}>
                Ukraine
            </Text>
            <Text style={s.cardTitle}>
                Russian warship: Moskva sinks in Black Sea
            </Text>
            <View style={s.cardDetails}>
                <View style={s.cardDetailsMeta}>
                    <View style={s.CDMSource}>
                        <Image style={s.CDMSourceImg} source={require('@/assets/photos/ph_ship.png')}/>
                        <Text style={s.CDMSourceText}>
                            BBC
                        </Text>
                    </View>
                    <View style={s.CDMTime}>
                        <Clock size={12} color={Grayscale.bodyText}/>
                        <Text style={s.CDMTimeText}>
                            4 ago
                        </Text>
                    </View>
                </View>
                <View style={s.cardDetailsMore}>
                    <TouchableOpacity style={s.CDMButton} onPress={() => {}}>
                        <Text style={s.CDMButtonIcon} >
                            ...
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const s =  StyleSheet.create({
    card: {
        marginBottom: 30
    },
    cardCover: {
        width: '100%',
        height: 180,
        objectFit: 'cover',
        borderRadius: 6,
        marginBottom: 4
    },
    cardCountry: {
        fontSize: 12,
        color: Grayscale.bodyText,
        fontFamily: "Poppins_500Medium"
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        color: "#000"
    },
    cardDetails: {
        flexDirection: 'row',

    },
    cardDetailsMeta: {
        flex: 1,
        flexDirection: 'row',

    },
    CDMSource: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    CDMSourceImg: {
        width: 20,
        height: 20,
        borderRadius: 50,
        objectFit: 'cover',
    },
    CDMSourceText: {
        color: Grayscale.bodyText,
        fontFamily: "Poppins_500Medium",
        fontSize: 14,
        marginLeft: 4
    },
    CDMTime: {
        flexDirection: 'row',
        marginLeft: 14,
        alignItems: 'center',
    },
    CDMTimeText: {
        marginLeft: 4,
        fontSize: 14,
        fontFamily: "Poppins_500Medium",
        color: Grayscale.bodyText,
    },

    cardDetailsMore: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    CDMButton: {},
    CDMButtonIcon: {}
})

export default PopularTopicCard