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
  END_CONVERSATION_PATH,
} from "../utils/constants";
import ConversationsSection from "../components/chat/ConversationsSection";
import MessagesSection from "../components/chat/MessagesSection";
import MainLayout from "../components/layouts/MainLayout";
import { parseJwt } from "../utils";

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const [username, setUsername] = useState(null);
  const sockJsRef = useRef();
  const router = useRouter();

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const options = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      };

      const conversationsResponse = await axios.get(CONVERSATIONS_URL, options);
      const conversations = conversationsResponse?.data?.data;
      setConversations(conversations.map(c => ({ ...c, isSeen: true })));

      const conversationId = conversations[0]?.id;
      if (!conversationId) return;
      const url = `${CONVERSATIONS_URL}/${conversationId}`;
      const conversationResponse = await axios.get(url, options);
      return conversationResponse?.data?.data;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("access_token");
        router.push("/");
      } else router.push("/500");

      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const conversation = await fetchConversations();
      setSelectedConversation(conversation);
      const token = localStorage.getItem("access_token");
      const user = parseJwt(token);
      setUsername(user.sub);
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
    setConversations(conversations.filter(conversation => conversation.id !== id));
    setSelectedConversation(null);
  };

  const handleUpdate = async message => {
    console.log("Received message:", message);
    console.log("Username:", username);
    if (message.event === "SENT_MESSAGE") {
      if (message.conversationId === selectedConversation?.id)
        setSelectedConversation(prevState => ({
          ...prevState,
          messages: [...prevState.messages, message.payload],
        }));
      await conversationUpdate(message.payload, message.conversationId);
    } else if (message.event === "SENT_MESSAGES") {
      const payload = message.payload;
      await conversationUpdate(payload.at(-1), message.conversationId);
      if (message.conversationId === selectedConversation?.id) {
        setSelectedConversation(prevState => ({
          ...prevState,
          messages: [...prevState.messages, ...payload],
        }));
      }
    } else if (message.event === "NEW_CONVERSATION" && message.payload.assignedTo === username) {
      console.log("New conversation:", message.payload);
      setConversations(conversations => [...conversations, { ...message.payload, isSeen: false }]);
      if (!selectedConversation) {
        const options = {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        };
        try {
          const url = `${CONVERSATIONS_URL}/${message?.payload?.id}`;
          const conversationResponse = await axios.get(url, options);
          const conversation = conversationResponse?.data?.data;
          setSelectedConversation(conversation);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const conversationUpdate = async (message, conversationId) => {
    const index = conversations?.findIndex(conversation => conversation?.id === conversationId);

    if (index === -1) await fetchConversations();

    let newConversations = [...conversations];
    if (
      index === -1 ||
      !newConversations ||
      !newConversations[index] ||
      !newConversations[index].lastMessageDate
    )
      return;
    newConversations[index].lastMessageDate = message?.sentDate;
    newConversations[index].lastMessagePreview = message?.text;
    newConversations[index].isSeen = selectedConversation.id === conversationId ? true : false;
    setConversations(newConversations);
  };

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
            setConversations={setConversations}
          />
        </Col>

        <Col xs={7}>
          <MessagesSection
            conversation={selectedConversation}
            sendMessage={sendMessage}
            endConversation={endConversation}
          />
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
