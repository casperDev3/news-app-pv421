import {View, Platform} from 'react-native'

const TopSpace = () => {
    return (
        <View style={{
            paddingTop: Platform.OS === 'ios' ? 52 : 44,
        }}></View>
    )
}

export default TopSpace