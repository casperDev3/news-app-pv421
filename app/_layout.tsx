import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from "@/store";


export const unstable_settings = {
    anchor: '(tabs)',
};

export default function RootLayout() {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    </Stack>
                    <StatusBar style="auto"/>
                </PersistGate>
            </Provider>
        </>
    );
}