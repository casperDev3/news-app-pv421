import {useEffect} from "react";
import {Slot, useRouter, useSegments, useRootNavigationState} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {Provider, useSelector} from "react-redux";
import {store, RootState} from "@/store";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";


// Утримуємо Splash Screen до завершення ініціалізації
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
    // @ts-ignore
    handleNotification: async () => ({
        // shouldShowAlert: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false
    }),
})


function NavigationGuard() {
    const router = useRouter();
    const segments = useSegments();

    // Отримуємо стан кореневої навігації для перевірки готовності
    const navigationState = useRootNavigationState();

    const {isFirstLaunch, isAuthenticated} = useSelector((s: RootState) => s.auth);
    const rehydrated = useSelector((s: any) => s.auth._persist?.rehydrated ?? false);

    // 1. Ініціалізація та приховання Splash Screen
    useEffect(() => {
        const initApp = async () => {
            try {
                // Місце для майбутньої перевірки токенів з AsyncStorage чи SecureStore
                // dispatch(setInitData({ firstLaunch: isFirstLaunch, loggedIn: false }));
            } catch (e) {
                console.warn(e);
            } finally {
                // Обов'язково ховаємо Splash Screen
                await SplashScreen.hideAsync();
            }
        };

        initApp();
        registerPushNotificationsAsync();
    }, []);

    // 2. Логіка захисту роутів (Navigation Guard)
    useEffect(() => {
        if (!rehydrated || !navigationState?.key) return;

        const inAuthGroup = segments[0] === '(auth)';
        const inOnboardingGroup = segments[0] === 'onboarding';

        // Відкладаємо виконання навігації, щоб Expo Router встиг змонтувати Root Layout
        const timeout = setTimeout(() => {
            if (isFirstLaunch) {
                if (!inOnboardingGroup) {
                    router.replace('/onboarding');
                }
            } else if (!isAuthenticated) {
                if (!inAuthGroup) {
                    router.replace('/(auth)/login');
                }
            } else {
                if (inAuthGroup || inOnboardingGroup) {
                    router.replace('/(tabs)');
                }
            }
        }, 1);

        // Очищаємо таймаут при розмонтуванні, щоб уникнути витоків пам'яті
        return () => clearTimeout(timeout);
    }, [rehydrated, isAuthenticated, isFirstLaunch, segments, navigationState?.key]);

    return <Slot/>;
}

async function registerPushNotificationsAsync() {
    console.log("RegisterPushNotificationsAsync")
    // if(Device.isDevice){
    const {status: existingStatus} = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync()
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        return
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
    // }
    console.log("RegisterPushNotificationsAsync")
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <NavigationGuard/>
        </Provider>
    );
}

