import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {Search, SlidersHorizontal} from "lucide-react-native"
import {Grayscale} from "@/constants/colors"

interface IProps {
    value?: string;
    onChangeText?: (text: string) => void;
    onFilterPress?: () => void;
}

const SearchBar = ({value, onChangeText, onFilterPress}: IProps) => {
    return (
        <View style={s.container}>
            <View style={s.inputWrap}>
                <Search size={18} color={Grayscale.placeholderText}/>
                <TextInput
                    style={s.input}
                    placeholder="Search"
                    placeholderTextColor={Grayscale.placeholderText}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
            <TouchableOpacity style={s.filterBtn} onPress={onFilterPress}>
                <SlidersHorizontal size={18} color={Grayscale.bodyText}/>
            </TouchableOpacity>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 24,
    },
    inputWrap: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Grayscale.disabledInput,
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        gap: 10,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: Grayscale.textActive,
    },
    filterBtn: {
        backgroundColor: Grayscale.disabledInput,
        borderRadius: 8,
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default SearchBar
