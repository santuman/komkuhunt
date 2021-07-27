import React, { useEffect, useRef, useState, useContext } from 'react'
import { StyleSheet } from 'react-native'
import Background from '../components/Background'
import Header from '../components/Header'

import { AppContext } from '../context/AppContext'

const PlayScreen = ({ navigation }) => {
  const [count, setCount] = useState(3)
  const clearInterval = useRef(null)

  const { itemsToHunt } = useContext(AppContext)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCount(3)
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (count <= -1) {
      navigation.reset({
        routes: [{ name: 'CameraScreen' }],
      })
    }
    clearInterval.current = setTimeout(() => {
      setCount((prevCount) => prevCount - 1)
    }, 1000)
    return () => {
      clearTimeout(clearInterval.current)
    }
  })

  return (
    <Background>
      {(count === 0 || count === -1) && (
        <Header style={styles.findText}>
          Find
          {`   ${itemsToHunt[0]}`}
        </Header>
      )}
      {count > 0 && <Header style={styles.findText}>{count}</Header>}
    </Background>
  )
}

const styles = StyleSheet.create({
  findText: {
    textAlign: 'center',
    fontSize: 50,
  },
})

export default PlayScreen
