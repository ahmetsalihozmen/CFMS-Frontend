import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BACKEND_URL, SEND_MESSAGE_PATH, TOPIC_PATH } from "../../utils/constants";
import MessagesSectionHeader from "./MessagesSectionHeader";
import MessagesSectionListItem from "./MessagesSectionListItem";
import SendMessageInput from "./SendMessageInput";
import SockJsClient from "react-stomp";

export default function MessagesSection({ conversation }) {
  const { id } = conversation;
  const [messages, setMessages] = useState(conversation?.messages);
  const [isLoading, setLoading] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const ref = useRef();

  const sendMessage = text => {
    const data = JSON.stringify({ conversationId: id, message: { text } });
    ref.current.sendMessage(SEND_MESSAGE_PATH, data);
  };

  const handleReceivedMessage = message => {
    console.log("Received message:", message);
    if (message.event === "NEW_MESSAGE" || message.event === "SENT_MESSAGE")
      setMessages(messages => [...messages, message.payload]);
  };

  return (
    <>
      <MessagesSectionHeader conversation={conversation} />

      <Row>
        <Col className="py-3 px-4">
          {messages ? (
            messages.map(message => <MessagesSectionListItem message={message} />)
          ) : (
            <h1>No messages...</h1>
          )}
        </Col>
      </Row>

      <Row className="py-2">
        <Col>
          <SendMessageInput sendMessage={sendMessage} />
        </Col>
      </Row>

      <SockJsClient
        url={BACKEND_URL + "/chat"}
        topics={[TOPIC_PATH]}
        onMessage={handleReceivedMessage}
        ref={ref}
        onConnect={() => {
          console.log("Connected");
          setConnected(true);
        }}
        onDisconnect={() => {
          console.log("Disconnected");
          setConnected(false);
        }}
        debug={false}
      />
    </>
  );
}
