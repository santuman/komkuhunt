import React, { useContext } from 'react'

import { Paragraph } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'

import Header from '../components/Header'
import Logo from '../components/Logo'
import { AppContext } from '../context/AppContext'

const demoItems = ['laptop', 'monitor', 'bottle', 'coffee mug', 'book', 'mask']
export default function ScoreScreen({ navigation }) {
  const appContext = useContext(AppContext)

  return (
    <Background>
      <Logo />
      <Header>Your Scored</Header>
      <Paragraph>{appContext.point}</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LeaderBoardScreen')}
      >
        Check Leaderboard
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          appContext.setPoint(0)
          appContext.setItemsToHunt(demoItems)
          appContext.setItemIndex(0)
          navigation.navigate('PlayScreen')
        }}
      >
        Play Again
      </Button>
    </Background>
  )
}
