// screens/DMScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { ConversationsContext } from '../src/context/ConversationsContext';

const DMScreen = ({ route }) => {
  const { contact } = route.params;
  const { conversations, addMessageToConversation } = useContext(ConversationsContext);
  
  // Find the conversation for this contact; default to empty if not found
  const conversation = conversations.find(conv => conv.contact.id === contact.id) || { messages: [] };
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (text.trim()) {
      const message = { sender_id: 1, text, timestamp: new Date().toISOString() };
      addMessageToConversation(contact.id, message);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat with {contact.name}</Text>
      <FlatList
        data={conversation.messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.message}>
            {item.sender_id === 1 ? "Me: " : `${contact.name}: `}{item.text}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  message: { marginVertical: 5, fontSize: 16 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});

export default DMScreen;
