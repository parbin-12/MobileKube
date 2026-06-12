import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import {NavigationBar} from 'expo-navigation-bar';

export default function RootLayout() {
  return (
   <>
    <Stack  screenOptions={{headerShown:false,animation:"slide_from_bottom"}}/>
    <StatusBar style="light" />
    <NavigationBar style="dark" />
   </>
  );
}