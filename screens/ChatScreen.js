import React from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";

ChatScreen.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam("name")
});

export default function ChatScreen({ navigation,route }) {
  const dispatch = useDispatch();
  const selfUser = useSelector(state => state.selfUser);
  const conversations = useSelector(state => state.conversations);
  const { userId } = route.params
  const messages = conversations[userId].messages;

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={messages}
        onSend={messages => {
          dispatch({
            type: "private_message",
            data: { message: messages[0], conversationId: userId }
          });
          dispatch({
            type: "server/private_message",
            data: { message: messages[0], conversationId: userId }
          });
        }}
        user={{
          _id: selfUser.userId
        }}
      />
      
    </View>
  );
}