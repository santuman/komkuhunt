import React, { createContext, useState } from 'react'
import { outputs } from '../constants/output'

export const AppContext = createContext({})

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const AppContextProvider = ({ children }) => {
  const [point, setPoint] = useState(0)
  const [itemIndex, setItemIndex] = useState(0)
  const [playAsGuest, setPlayAsGuest] = useState(false)

  const demoItems = [
    'laptop',
    'monitor',
    'bottle',
    'coffee mug',
    'book',
    'mask',
  ]

  // const items = []

  // for (let i = 0; i < 15; i++) {
  //   items[i] = outputs[randomInteger(0, outputs.length)]
  // }

  const [itemsToHunt, setItemsToHunt] = useState(demoItems)

  return (
    <AppContext.Provider
      value={{
        point,
        setPoint,
        itemsToHunt,
        setItemsToHunt,
        itemIndex,
        setItemIndex,
        playAsGuest,
        setPlayAsGuest,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppContextProvider
