import { useEffect } from "react";
import { Slot, useRouter, useSegments, useRootNavigationState } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "@/store";

// Утримуємо Splash Screen до завершення ініціалізації
SplashScreen.preventAutoHideAsync();

function NavigationGuard() {
    const router = useRouter();
    const segments = useSegments();

    // Отримуємо стан кореневої навігації для перевірки готовності
    const navigationState = useRootNavigationState();

    const { isFirstLaunch, isAuthenticated } = useSelector((s: RootState) => s.auth);
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

    return <Slot />;
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <NavigationGuard />
        </Provider>
    );
}