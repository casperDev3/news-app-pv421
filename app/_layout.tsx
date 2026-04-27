import {useEffect} from "react";
import {Slot, useRouter, useSegments} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {Provider, useSelector, useDispatch} from "react-redux";
import {store, RootState} from "@/store";
import {setInitData} from "@/store/slices/authSlice";

SplashScreen.preventAutoHideAsync()

function NavigationGuard() {
    //init
    // const dispatch = useDispatch();
    const router = useRouter();
    const segments = useSegments();
    const {isFirstLaunch, isLoading, isAuthenticated} = useSelector((s: RootState) => s.auth)

    // useEffect(() => {
    //     (async ()=>{
    //         dispatch(setInitData({firstLaunch: isFirstLaunch, loggedIn: false}))
    //         await SplashScreen.hideAsync()
    //     })()
    // }, []);

    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === '(auth)'
        const inOnboardingGroup = segments[0] === 'onboarding'

        if (isFirstLaunch){
            if (!inOnboardingGroup) router.replace('/onboarding')
        } else if (!isAuthenticated){
            if (!inAuthGroup) router.replace('/(auth)/login')
        } else {
            if (inAuthGroup || inOnboardingGroup) router.replace('/(tabs)')
        }

    }, [isLoading, isAuthenticated, isFirstLaunch, segments]);

    return <Slot/>
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <NavigationGuard/>
        </Provider>
    )
}