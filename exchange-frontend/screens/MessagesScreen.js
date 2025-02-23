// screens/MessagesScreen.js
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';
import { ConversationsContext } from '../src/context/ConversationsContext.js';

const MessagesScreen = ({ navigation, route }) => {
  const { conversations, addMessageToConversation } = useContext(ConversationsContext);
  const [selectedContact, setSelectedContact] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    if (route.params && route.params.contact) {
      setSelectedContact(route.params.contact);
    }
  }, [route.params]);

  const sendMessage = () => {
    if (text.trim() && selectedContact) {
      const message = { sender_id: 1, text, timestamp: new Date().toISOString() };
      addMessageToConversation(selectedContact.id, message);
      setText('');
    }
  };

  // Open chat view when a contact is selected
  if (selectedContact) {
    const conversation =
      conversations.find((conv) => conv.contact.id === selectedContact.id) || { messages: [] };

    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={[styles.container, styles.extraPadding]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        >
          {/* Back Button Container */}
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={() => setSelectedContact(null)}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
          </View>

          {/* Centered Chat Header with Profile Pic on Top */}
          <View style={styles.chatHeaderContainer}>
            <Image
              style={styles.chatProfilePic}
              source={
                selectedContact.image
                  ? { uri: selectedContact.image }
                  : require('../assets/images/blackdudeskissing.png')
              }
            />
            <Text style={styles.chatHeaderText}>{selectedContact.name}</Text>
          </View>

          <FlatList
            data={conversation.messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.message}>
                {item.sender_id === 1 ? 'Me: ' : `${selectedContact.name}: `}{item.text}
              </Text>
            )}
            style={styles.messageList}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={text}
              onChangeText={setText}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Conversation list view when no contact is selected
  const renderItem = ({ item }) => {
    const lastMessage = item.messages.length ? item.messages[item.messages.length - 1] : null;
    return (
      <TouchableOpacity
        style={styles.conversationCard}
        onPress={() => setSelectedContact(item.contact)}
      >
        <Image
          style={styles.profilePic}
          source={
            item.contact.image
              ? { uri: item.contact.image }
              : require('../assets/images/blackdudeskissing.png')
          }
        />
        <View style={styles.conversationTextContainer}>
          <Text style={styles.contactName}>{item.contact.name}</Text>
          {lastMessage ? (
            <Text style={styles.lastMessage}>{lastMessage.text}</Text>
          ) : (
            <Text style={styles.lastMessage}>No messages yet.</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, styles.extraPadding]}>
        <Text style={styles.header}>Your Chats</Text>
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.contact.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6DCAC',
  },
  extraPadding: {
    paddingTop: 50,
    backgroundColor: '#F6DCAC',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F6DCAC',
  },
  // Back button container
  backButtonContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  backButton: {
    fontSize: 18,
    color: '#028391',
  },
  // Chat header container: column layout to stack image on top of text
  chatHeaderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
  },
  chatProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginBottom: 10,
  },
  chatHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Conversation list styles
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#F6DCAC',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  conversationTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageList: {
    flex: 1,
    marginVertical: 10,
  },
  message: {
    marginVertical: 5,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#028391',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default MessagesScreen;
