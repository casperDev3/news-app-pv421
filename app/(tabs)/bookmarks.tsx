import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {useFonts, Poppins_700Bold, Poppins_400Regular} from "@expo-google-fonts/poppins"
import {useState} from "react"
import {useSelector} from "react-redux"
import {RootState} from "@/store"
import {Grayscale} from "@/constants/colors"
import TopSpace from "@/components/system/topSpace"
import SearchBar from "@/components/ui/searchBar"
import NewsCard from "@/components/cards/newsCard"

const BookmarksScreen = () => {
    // init
    const [fontsLoaded] = useFonts({Poppins_700Bold, Poppins_400Regular})
    const [search, setSearch] = useState("")
    const bookmarks = useSelector((state: RootState) => state.bookmarks.savedArticles)

    // load
    if (!fontsLoaded) return null

    const filtered = search
        ? bookmarks.filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
        : bookmarks

    return (
        <View style={s.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TopSpace/>
                <Text style={s.title}>Bookmark</Text>
                <SearchBar value={search} onChangeText={setSearch}/>
                {filtered.length === 0 && (
                    <Text style={s.empty}>No saved articles yet</Text>
                )}
                {filtered.map((item) => (
                    <NewsCard key={item.id} data={item}/>
                ))}
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
    title: {
        fontSize: 32,
        fontFamily: "Poppins_700Bold",
        fontWeight: "bold",
        marginBottom: 20,
    },
    empty: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: Grayscale.bodyText,
        textAlign: "center",
        marginTop: 40,
    },
})

export default BookmarksScreen
