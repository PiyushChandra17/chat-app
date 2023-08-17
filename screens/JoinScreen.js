import { View, Button, TextInput, Image, Platform,KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

const JoinScreen = ({ joinChat }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [username,setUsername] = useState("")
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image resizeMode='contain' style={{ flex: 1 }} source={require("../assets/chat-icon.png")}/>
        <View style={{ flex: 1, justifyContent: "space-around" }}>
            <TextInput 
                style={{ fontSize: 30, textAlign: "center" }} 
                placeholder='Enter username'
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <Button title="Join Chat" onPress={() => {
                dispatch({ type: "server/join", data: username })
                navigation.navigate("FriendList")
            }}
            />
        </View>
        {Platform.OS === "ios" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  )
}

export default JoinScreen