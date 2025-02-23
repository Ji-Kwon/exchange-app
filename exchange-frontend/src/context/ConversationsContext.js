// src/context/ConversationsContext.js
import React, { createContext, useState } from 'react';

export const ConversationsContext = createContext();

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]); // Each item: { contact, messages: [] }

  const addConversation = (contact) => {
    // Only add if conversation doesn't already exist
    if (!conversations.find(conv => conv.contact.id === contact.id)) {
      setConversations(prev => [...prev, { contact, messages: [] }]);
    }
  };

  const addMessageToConversation = (contactId, message) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.contact.id === contactId
          ? { ...conv, messages: [...conv.messages, message] }
          : conv
      )
    );
  };

  return (
    <ConversationsContext.Provider
      value={{ conversations, addConversation, addMessageToConversation }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
