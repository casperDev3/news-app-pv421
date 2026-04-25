import {View, Text} from 'react-native'
import {useLocalSearchParams} from "expo-router";

const NewsCommentsScreen = () => {
    const {news_id} = useLocalSearchParams();
    return (
        <View>
            <Text>
                Comments Screen
                NEWS ID: {news_id}
            </Text>
        </View>
    )
}

export default NewsCommentsScreen