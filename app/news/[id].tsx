import {View, Text} from 'react-native'
import {useLocalSearchParams, useRouter, Link} from "expo-router";

const ArticleScreen = () => {
    const {id} = useLocalSearchParams()
    // const router = useRouter();

    return (
        <View>
            <Text>
                Single News Screen
                ID: {id}
            </Text>
            <Link href={`/news/comments/${id}`}>
                Comments
            </Link>
        </View>
    )
}

export default ArticleScreen;