import Sound from 'react-native-sound'

Sound.setCategory('Playback')
export const start = new Sound('start.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error)
    return
  }
  // loaded successfully
  console.log(
    'duration in seconds: ' +
      start.getDuration() +
      'number of channels: ' +
      start.getNumberOfChannels()
  )

  // Play the sound with an onEnd callback
  start.play((success) => {
    if (success) {
      console.log('successfully finished playing')
    } else {
      console.log('playback failed due to audio decoding errors')
    }
  })
})
