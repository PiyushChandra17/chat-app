import { View, Text, FlatList,Image,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const FriendListScreen = ({ navigation }) => {
    const usersOnline = useSelector(state => state.usersOnline)
    console.log("usersOnline", usersOnline)
  return (
    <View style={{ flex: 1 }}>
      <FlatList 
        data={usersOnline}
        renderItem={({ item }) => {
            console.log("item", item)
            return (
                <TouchableOpacity onPress={() => navigation.navigate("Chat", { name: item.username, userId: item.userId })}>
                    <View style={styles.itemContainerStyle}>
                        <Image 
                            style={styles.avatarImageStyle}
                            source={{ uri: item.avatar }}
                        />
                        <View style={styles.avatarNameViewStyle}>
                            <Text style={{ fontSize: 20 }}>{item.username}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }}
        keyExtractor={item => item.userId}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    itemContainerStyle: { 
        flex: 1, 
        flexDirection: "row" 
    },
    avatarImageStyle: { 
        width: 100, 
        height: 100, 
        borderRadius: 50 
    },
    avatarNameViewStyle: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    },

})


export default FriendListScreen