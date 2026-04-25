import {View, Text, StyleSheet, Image} from 'react-native'
import PrimaryButton from "@/components/ui/buttons/primary"
import OutlineButton from "@/components/ui/buttons/outline"
import {useFonts, Poppins_500Medium} from "@expo-google-fonts/poppins"
import {Grayscale} from "@/constants/colors";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleBookmark, Article} from "@/store/slices/bookmarksSlice";
import {RootState} from "@/store";

const CompactTopicCard = ({data}: any) => {
    // init
    const [fontsLoaded] = useFonts({
        Poppins_500Medium
    })
    const [isSaved, setIsSaved] = useState<boolean>(true)
    const {id, title, country} = data
    const dispatch = useDispatch();
    const bookmarks = useSelector((state: RootState) => state.bookmarks.savedArticles)
    // load
    useEffect(() => {
        // check existing id into bookmarks
        const isExist = bookmarks.some((bookmark) => bookmark.id === id)
        setIsSaved(isExist)
    }, [bookmarks])

    if (!fontsLoaded) {
        return null
    }


    // handlers
    const handleSave = (data: Article) => {
        dispatch(toggleBookmark(data))
    }

    return (
        <View style={s.container}>
            <View style={s.content}>
                <Image style={s.contentImage} source={require("@/assets/photos/ph_ship.png")}/>
                <View style={s.contentText}>
                    <Text style={s.contentTextTitle}>{title}</Text>
                    <Text style={s.contentTextDesc} numberOfLines={2}>{country}</Text>
                </View>
            </View>
            <View style={s.action}>
                {isSaved ? (
                    <PrimaryButton width={78} height={34} text={"Saved"} onPress={() => {
                        handleSave(data)
                    }}/>
                ) : (
                    <OutlineButton width={78} height={34} text={"Save"} onPress={() => {
                        handleSave(data)
                    }}/>
                )}
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    contentImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    contentText: {
        flex: 1,
        marginLeft: 12,
        marginRight: 12,
    },
    contentTextTitle: {
        color: "#000",
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        marginBottom: 4
    },
    contentTextDesc: {
        color: Grayscale.bodyText,
        fontSize: 14,
    },
    action: {
        justifyContent: "center",
    }
})

export default CompactTopicCard