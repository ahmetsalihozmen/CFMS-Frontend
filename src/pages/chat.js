import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import SockJsClient from "react-stomp";
import {
  CONVERSATIONS_URL,
  BACKEND_URL,
  CHAT_PATH,
  SEND_MESSAGE_PATH,
  TOPIC_PATH,
  END_CONVERSATION_PATH
} from "../utils/constants";
import ConversationsSection from "../components/chat/ConversationsSection";
import MessagesSection from "../components/chat/MessagesSection";
import MainLayout from "../components/layouts/MainLayout";

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const sockJsRef = useRef();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const options = {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        };

        const conversationsResponse = await axios.get(CONVERSATIONS_URL, options);
        const conversations = conversationsResponse?.data?.data;
        setConversations(conversations);

        const conversationId = conversations[0]?.id;
        if (!conversationId) return;
        const url = `${CONVERSATIONS_URL}/${conversationId}`;
        const conversationResponse = await axios.get(url, options);
        const conversation = conversationResponse?.data?.data;
        setSelectedConversation(conversation);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("access_token");
          router.push("/");
        } else router.push("/500");

        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  const sendMessage = text => {
    const { id } = selectedConversation;
    if (!id) return;
    const data = JSON.stringify({ conversationId: id, message: { text } });
    sockJsRef.current.sendMessage(SEND_MESSAGE_PATH, data);
  };

  const endConversation = () => {
    const { id } = selectedConversation;
    if (!id) return;
    console.log("end conversation" + id);
    const data = JSON.stringify({ conversationId: id });
    sockJsRef.current.sendMessage(END_CONVERSATION_PATH, data);
    setConversations(conversations.filter(
      conversation => conversation.id !== id
    ));
    setSelectedConversation(null);
  }

  const handleUpdate = message => {
    console.log("Received message:", message);
    if (message.event === "SENT_MESSAGE"){
      if (message.conversationId === selectedConversation?.id)
        setSelectedConversation(prevState => ({
          ...prevState,
          messages: [...prevState.messages, message.payload],
        }));
      conversationUpdate(message.payload, message.conversationId);
    }

    else if (message.event === "SENT_MESSAGES") {
      const payload = message.payload;
      if (message.conversationId === selectedConversation?.id){
        setSelectedConversation(prevState => ({
          ...prevState,
          messages: [...prevState.messages, ...payload],
        }));
      }
      conversationUpdate(payload.at(-1), message.conversationId)
    } 
    
    else if (message.event === "NEW_CONVERSATION") {
      console.log("New conversation:", message.payload);
      setConversations(conversations => [...conversations, message.payload]);
    }
  };

  const conversationUpdate = (message, conversationId) => {
    const index = conversations.findIndex(conversation => conversation.id === conversationId);
    let newConversations = [...conversations];
    newConversations[index].lastMessageDate = message.sentDate;
    newConversations[index].lastMessagePreview = message.text;
    setConversations(newConversations);

  }

  const handleSocketConnect = () => {
    console.log("Connected");
    setConnected(true);
  };

  const handleSocketDisconnect = () => {
    console.log("Disconnected");
    setConnected(false);
  };

  return (
    <MainLayout>
      <Row>
        <Col xs={5}>
          <ConversationsSection
            conversations={conversations}
            setSelectedConversation={setSelectedConversation}
          />
        </Col>

        <Col xs={7} >
          <MessagesSection conversation={selectedConversation} sendMessage={sendMessage} endConversation={endConversation} />
        </Col>
      </Row>

      <SockJsClient
        url={BACKEND_URL + CHAT_PATH}
        topics={[TOPIC_PATH]}
        onMessage={handleUpdate}
        ref={sockJsRef}
        onConnect={handleSocketConnect}
        onDisconnect={handleSocketDisconnect}
        debug={false}
      />
    </MainLayout>
  );
}
