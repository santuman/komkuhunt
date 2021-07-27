import React from 'react'
import { View, StyleSheet } from 'react-native'
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import { Avatar, Title, Caption, Drawer } from 'react-native-paper'
import firebase from 'firebase/app'
import { SettingsIcon } from '../assets/icons'
import 'firebase/auth'
import Button from './Button'

export default function DrawerContent({ navigation }) {
  // const [displayName, setDisplayName] = useState('')
  // const [photoUrl, setPhotoUrl] = useState('')

  const user = firebase.auth().currentUser
  // useEffect(() => {
  //   if (!user) return
  //   setDisplayName(user.displayName)
  //   setPhotoUrl(user.photoURL)
  // }, [user])

  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Text size={80} label={user.displayName.slice(0, 2)} />
          <Title style={styles.title}>{user.displayName}</Title>
          <Caption style={styles.caption}>{user.email}</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <Button
            mode="outlined"
            onPress={() => {
              navigation.navigate('LeaderBoardScreen')
            }}
          >
            LeaderBoard
          </Button>
          <DrawerItem
            label="Settings"
            icon={({ color }) => <SettingsIcon fill={color} />}
            onPress={() => {}}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})
