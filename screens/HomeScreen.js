import React from 'react'
import { View, StyleSheet } from 'react-native'
import Button from '../components/Button'
import TopBar from '../components/TopBar'
import { start } from '../core/helpers/startSound'

export default function HomeScreen({ navigation }) {
  return (
    <>
      <TopBar title="Home" />
      <View style={styles.container}>
        <Button
          mode="contained"
          onPress={navigation.openDrawer}
          style={{ width: 160 }}
        >
          Open Menu
        </Button>
        <Button
          icon="play"
          mode="contained"
          onPress={() => {
            start.play()
            navigation.navigate('PlayScreen')
          }}
          style={{ width: 160 }}
        >
          Play
        </Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
