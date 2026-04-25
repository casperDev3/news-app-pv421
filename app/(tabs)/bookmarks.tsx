import {View, Text} from 'react-native';
import TopSpace from "@/components/system/topSpace";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

const BookmarksScreen = () => {

    const bookmarks = useSelector((state: RootState) => state.bookmarks.savedArticles)
    return (
        <View>
            <TopSpace/>
            <Text>
                Bookmarks Screen
                Save Count: {bookmarks.length}
            </Text>
        </View>
    )
}

export default BookmarksScreen;