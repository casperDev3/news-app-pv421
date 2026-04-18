import {View, Text} from 'react-native';
import TopSpace from "@/components/system/topSpace";
import {Home} from "lucide-react-native"

const ProfileScreen = () => {
    return (
        <View>
            <TopSpace />
            <Text>
                Profile Screen
            </Text>
            <Home size={28} color={"#F00"} />
        </View>
    )
}

export default ProfileScreen;