import {View, Platform} from 'react-native'

const TopSpace = () => {
    return (
        <View style={{
            paddingTop: Platform.OS === 'ios' ? 58 : 44,
        }}></View>
    )
}

export default TopSpace