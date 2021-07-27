import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import firebase from 'firebase/app'
import 'firebase/firebase-firestore'

import { decode, encode } from 'base-64'
import DrawerContent from './components/DrawerContent'

import { HomeIcon, ProfileIcon } from './assets/icons'

import { firebaseConfig } from './core/config'
import { theme } from './core/theme'

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ResetPasswordScreen,
  AuthLoadingScreen,
  ProfileScreen,
  PlayScreen,
  CameraScreen,
} from './screens'
import AuthContextProvider from './context/AuthContext'
import AppContextProvider from './context/AppContext'
import ScoreScreen from './screens/ScoreScreen'
import LeaderBoardScreen from './screens/LeaderBoardScreen'

if (!global.btoa) {
  global.btoa = encode
}

if (!global.atob) {
  global.atob = decode
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.firestore().settings({ experimentalForceLongPolling: true })
}

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <Provider theme={theme}>
      <AuthContextProvider>
        <AppContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="AuthLoadingScreen"
            >
              <Stack.Screen
                name="AuthLoadingScreen"
                component={AuthLoadingScreen}
              />
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="PlayScreen" component={PlayScreen} />
              <Stack.Screen name="CameraScreen" component={CameraScreen} />
              <Stack.Screen name="ScoreScreen" component={ScoreScreen} />
              <Stack.Screen
                name="LeaderBoardScreen"
                component={LeaderBoardScreen}
              />
              <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContextProvider>
      </AuthContextProvider>
    </Provider>
  )
}

function BottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon fill={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={DrawerContent}>
      <Drawer.Screen name="HomeScreen" component={BottomNavigation} />
    </Drawer.Navigator>
  )
}
export default App
