import {Tabs} from 'expo-router';
import React from 'react';
import {Home, Compass, Bookmark, CircleUserRound} from "lucide-react-native"
import {Grayscale, Primary} from "@/constants/colors";

export default function TabLayout() {
    return (
        <Tabs

            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({focused}) => (
                        focused ? <Home size={24} color={Primary.default}/> :
                            <Home size={24} color={Grayscale.bodyText}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({focused}) => (
                        focused ? <Compass size={24} color={Primary.default}/> :
                            <Compass size={24} color={Grayscale.bodyText}/>
                    )
                }}
            />
            <Tabs.Screen
                name="bookmarks"
                options={{
                    title: 'Bookmarks',
                    tabBarIcon: ({focused}) => (
                        focused ? <Bookmark  size={24} color={Primary.default}/> :
                            <Bookmark size={24} color={Grayscale.bodyText}/>
                    )

                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({focused}) => (
                        focused ? <CircleUserRound size={24} color={Primary.default}/> :
                            <CircleUserRound size={24} color={Grayscale.bodyText}/>
                    ),

                }}
            />
        </Tabs>
    );
}
