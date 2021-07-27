import Sound from 'react-native-sound'

Sound.setCategory('Playback')
export const bg = new Sound('bg.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error)
    return
  }
  bg.setNumberOfLoops(-1)

  // loaded successfully
  console.log(
    'duration in seconds: ' +
      bg.getDuration() +
      'number of channels: ' +
      bg.getNumberOfChannels()
  )

  // Play the sound with an onEnd callback
  bg.play((success) => {
    if (success) {
      console.log('successfully finished playing')
    } else {
      console.log('playback failed due to audio decoding errors')
    }
  })
})
