import { createStore, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import { Provider } from "react-redux";
import io from "socket.io-client";
import React from 'react';
import AppContainer from './AppContainer';

const socket = io("http://10.200.158.43:5000");
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

function reducer(state = { conversations: {} }, action) {
  switch (action.type) {
    case "users_online":
      const conversations = { ...state.conversations }
      const usersOnline = action.data
      for (let i = 0; i < usersOnline.length; i++) {
        const userId = usersOnline[i].userId
        if (conversations[userId] === undefined) {
          conversations[userId] = {
            messages: [],
            username: usersOnline[i].username
          }
        }
      }
      return { ...state, usersOnline, conversations }
    case "private_message":
      const conversationId = action.data.conversationId
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [
              action.data.message,
              ...state.conversations[conversationId].messages
            ]
          }
        }
      }
    case "self_user":
      return { ...state, selfUser: action.data }
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log("new state", store.getState());
});


const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;