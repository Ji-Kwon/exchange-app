import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import io from 'socket.io-client';
import globalStyles from '../styles/globalStyles';

// Connect to your server (replace with your server's IP or domain)
const socket = io("http://172.20.10.5:5001");

const MessagesScreen = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // Listen for new messages from the server
    socket.on('receive_message', (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    // Optionally, fetch existing messages from your REST API on mount
    fetch('http://172.20.10.5:5001/api/message')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => setMessages(data))
    .catch(error => console.error('Error fetching messages:', error));

    // Cleanup the event listener on unmount
    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (messageText.trim()) {
      const messageData = {
        sender_id: 1,       // Replace with the actual sender's ID
        receiver_id: 2,     // Replace with the intended receiver's ID
        exchange_id: 1,     // Set as appropriate for your application
        message: messageText
      };

      // Emit the message to the server
      socket.emit('send_message', messageData);
      setMessageText('');
    }
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.message_id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.messageText}>{item.message}</Text>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageText: {
    fontSize: 16,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default MessagesScreen;
