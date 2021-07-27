import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { StopWatch, Trophy } from '../assets/icons'

import { theme } from '../core/theme'

const GameBar = ({ style, title, value, time }) => {
  return (
    <View style={{ ...styles.header, ...style }}>
      <Text style={styles.headerTitle}>{`FIND  ${title}`}</Text>
      <View style={styles.pointContainer}>
        <View style={styles.flex}>
          <Trophy />
          <Text style={styles.point}>{value}</Text>
        </View>
        <View style={styles.flex}>
          <StopWatch />
          <Text style={styles.point}>{time}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56 + getStatusBarHeight(),
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  point: { color: 'white', fontSize: 36 },
  pointContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
})

export default GameBar
