import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import firebase from 'firebase/app'
import Leaderboard from 'react-native-leaderboard'
import Background from '../components/Background'

import Header from '../components/Header'
import Logo from '../components/Logo'

import 'firebase/firebase-firestore'
import { theme } from '../core/theme'

export default function LeaderBoardScreen() {
  const [leaderBoardData, setLeaderBoardData] = useState(null)

  const getLeaderBoardData = async () => {
    try {
      const list = []
      const db = firebase.firestore()
      // db.settings({ experimentalForceLongPolling: true })
      const snapshot = await db.collection('leaderboard').get()
      snapshot.forEach((doc) => {
        list.push(doc.data())
      })
      setLeaderBoardData(list)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getLeaderBoardData()
  }, [])

  if (!leaderBoardData)
    return <ActivityIndicator size="large" color={theme.colors.primary} />

  return (
    <Background>
      <Logo />
      <Header>Leaderboard</Header>
      <Leaderboard data={leaderBoardData} sortBy="score" labelBy="name" />
    </Background>
  )
}
