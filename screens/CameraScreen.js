import React, { useState, useEffect, useContext, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { RNCamera } from 'react-native-camera-tflite'
import Icon from 'react-native-vector-icons/MaterialIcons'
import _ from 'lodash'
import firebase from 'firebase'
import Button from '../components/Button'
import GameBar from '../components/GameBar'
import { theme } from '../core/theme'
import { outputs } from '../constants/output'
import { AppContext } from '../context/AppContext'
import { ThumbsDown, ThumbsUp } from '../assets/icons'

import { bg } from '../core/helpers/bgSound'
import { successSound } from '../core/helpers/successSound'
import { wrong } from '../core/helpers/wrongSound'
import Header from '../components/Header'
import 'firebase/firebase-firestore'
import 'firebase/auth'

const CameraScreen = ({ navigation }) => {
  const [output, setOutput] = useState([])
  const [count, setCount] = useState(30)
  const [showThumbsUp, setShowThumbsUp] = useState(false)
  const [showThumbsDown, setShowThumbsDown] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  const appContext = useContext(AppContext)
  const intervalRef = useRef(null)

  const modelParams = {
    file: 'models/mobilenet_v1_1.0_224_quant.tflite',
    inputDimX: 224,
    inputDimY: 224,
    outputDim: 1001,
    freqms: 0,
  }
  function processOutput({ data }) {
    const orderedData = _.chain(data)
      .zip(outputs)
      .orderBy(0, 'desc')
      .map((item) => [_.round(item[0] / 255.0, 2), item[1]])
      .value()
    const outputData = _.chain(orderedData)
      .take(5)
      .map((item) => `${item[1]}`)
      .join('\n')
      .value()
    setOutput(outputData.split('\n'))
  }
  const onNextItemPressesd = () => {
    appContext.setItemIndex((prevIndex) => prevIndex + 1)

    setShowThumbsUp(false)
  }
  const onTryAgainPressesd = () => {
    setShowThumbsDown(false)
  }
  const timeUpHandle = () => {
    clearInterval(intervalRef.current)
    if (appContext.playAsGuest) {
      navigation.replace('ScoreScreen')
      return
    }
    const db = firebase.firestore()
    // db.settings({ experimentalForceLongPolling: true })

    const leaderBoardRef = db.collection('leaderboard')

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        leaderBoardRef.doc(user.uid).set({
          uid: user.uid,
          name: user.displayName,
          score: appContext.point,
        })
      }
    })

    navigation.replace('ScoreScreen')
  }

  // background audio
  useEffect(() => {
    bg.play()
    return () => {
      bg.stop()
    }
  }, [])

  // Timer
  useEffect(() => {
    if (count > 0) {
      intervalRef.current = setInterval(() => {
        setCount((p) => p - 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
      setTimeUp(true)
      setShowThumbsDown(false)
      setShowThumbsUp(false)
      bg.stop()
    }

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [count])

  const handleCorrectItemScan = () => {
    console.log('found')
    successSound.play()
    appContext.setPoint((prevPoint) => prevPoint + 1)
    setCount((prevCount) => prevCount + 10)
    setShowThumbsUp(true)
  }
  const handleWrongItemScan = () => {
    console.log('not found')
    wrong.play()
    setShowThumbsDown(true)
  }

  const captureHandler = () => {
    console.log('output', output)
    const currentItem = appContext.itemsToHunt[appContext.itemIndex]
    if (output.includes(currentItem)) {
      handleCorrectItemScan()
    } else {
      handleWrongItemScan()
    }
  }
  return (
    <>
      <View style={styles.screen}>
        <GameBar
          title={appContext.itemsToHunt[appContext.itemIndex]}
          value={appContext.point}
          time={count}
        />
        <View style={styles.cameraWrapper}>
          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle="Permission to use camera"
            permissionDialogMessage="We need your permission to use your camera phone"
            onModelProcessed={(data) => processOutput(data)}
            modelParams={modelParams}
          />
          {showThumbsUp && (
            <View style={styles.thumbsUp}>
              <ThumbsUp />
              <Button mode="outlined" onPress={onNextItemPressesd}>
                Next Item
              </Button>
            </View>
          )}
          {showThumbsDown && (
            <View style={styles.thumbsUp}>
              <ThumbsDown />
              <Button mode="outlined" onPress={onTryAgainPressesd}>
                Try Again
              </Button>
            </View>
          )}
          {timeUp && (
            <View style={{ ...styles.thumbsUp, left: 70 }}>
              <Header style={styles.gameOverText}>Time Up!</Header>
              <Button mode="outlined" onPress={timeUpHandle}>
                Okay!
              </Button>
            </View>
          )}
        </View>
        <Button
          disabled={showThumbsUp || showThumbsDown || timeUp}
          icon={() => <Icon name="camera" size={60} />}
          onPress={captureHandler}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  cameraWrapper: {
    flex: 1,
    borderColor: theme.colors.primary,
    borderWidth: 10,
  },
  screen: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  thumbsUp: {
    position: 'absolute',
    top: 200,
    left: 115,
  },
  foundText: {
    fontSize: 50,
    color: 'gold',
    textAlign: 'center',
  },
  gameOverText: {
    fontSize: 60,
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  neuo: {
    elevation: 20,
  },
  neuo2: {
    elevation: 20,
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  button: {
    height: 100,
    width: '50%',
  },
  cameraText: {
    fontSize: 18,
    color: 'white',
  },
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default CameraScreen
