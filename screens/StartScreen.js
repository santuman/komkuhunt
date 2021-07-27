import React, { useEffect, useContext } from 'react'

import { Paragraph } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'

import Header from '../components/Header'
import Logo from '../components/Logo'
import { AppContext } from '../context/AppContext'
import { intro } from '../core/helpers/introSound'
import { start } from '../core/helpers/startSound'

export default function StartScreen({ navigation }) {
  const appContext = useContext(AppContext)
  const handleLogin = () => navigation.navigate('LoginScreen')
  const handleSignUp = () => navigation.navigate('RegisterScreen')
  const handlePlayAsGuest = () => {
    appContext.setPlayAsGuest(true)
    navigation.navigate('PlayScreen')
    start.play()
  }

  useEffect(() => {
    //     intro.release();
    intro.play()
  }, [])

  return (
    <Background>
      <Logo />
      <Header>Login</Header>
      <Paragraph>Login to be on learboard</Paragraph>
      <Button mode="outlined" onPress={handleLogin}>
        Login
      </Button>
      <Button mode="contained" onPress={handleSignUp}>
        Sign up
      </Button>
      <Header>or</Header>

      <Button mode="contained" onPress={handlePlayAsGuest}>
        Play as guest
      </Button>
    </Background>
  )
}
