import {View, Text, Platform} from 'react-native'
import {Link} from 'expo-router'

const ChatsScreen = () => {
    return (
        <View style={{
            paddingTop: Platform.OS === 'ios' ? 52 : 48,
        }}>
            <Text>Chats</Text>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                    (item) => {
                        return (
                            <Link style={{
                                color: "blue"
                            }} key={item} href={'/chats/1'}>
                                Chat list item
                            </Link>
                        )
                    }
                )
            }
        </View>
    )
}

export default ChatsScreen