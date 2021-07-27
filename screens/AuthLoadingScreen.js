import React, { useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import Background from '../components/Background'
import { theme } from '../core/theme'

import { AuthContext } from '../context/AuthContext'

export default function AuthLoadingScreen({ navigation }) {
  const authCtx = useContext(AuthContext)

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      authCtx.setUser(user)
      navigation.reset({
        routes: [{ name: 'HomeScreen' }],
      })
    } else {
      // User is not logged in
      navigation.reset({
        routes: [{ name: 'StartScreen' }],
      })
    }
  })

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  )
}
