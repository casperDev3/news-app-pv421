import React, { useEffect, useState } from 'react';
import {View, TextInput, FlatList, Text, TouchableOpacity, Button, Platform} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '@/services/socket';
import { RootState } from '@/store';
import { receiveMessage, clearMessages } from '@/store/slices/chatSlice';

export default function OneChatScreen() {
    const { id } = useLocalSearchParams();
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const messages = useSelector((state: RootState) => state.chat.messages);

    useEffect(() => {
        dispatch(clearMessages());
        socket.connect();
        socket.emit('joinRoom', id);

        socket.on('newMessage', (message) => {
            dispatch(receiveMessage(message));
        });

        return () => {
            socket.off('newMessage');
            socket.disconnect();
        };
    }, [id]);

    const sendMessage = () => {
        if (text.trim()) {
            const msg = { roomId: id, text, senderId: 'me' };
            socket.emit('sendMessage', msg);
            dispatch(receiveMessage({
                id: 1,
                text,
                senderId: 1
            }));
            setText('');
        }
    };

    return (
        <View style={{ flex: 1, padding: Platform.OS === 'ios' ? 52 : 48 }}>
            <View>
                <Button title={"Back"} onPress={()=> {
                    router.back()
                }}/>
            </View>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginVertical: 5 }}>
                        <Text>{item.text}</Text>
                    </View>
                )}
            />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    style={{ flex: 1, borderWidth: 1, padding: 10, borderRadius: 5 }}
                />
                <TouchableOpacity
                    onPress={sendMessage}
                    style={{ padding: 10, backgroundColor: 'blue', marginLeft: 10, borderRadius: 5 }}
                >
                    <Text style={{ color: 'white' }}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
