import React, { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import MessagesSectionHeader from "./MessagesSectionHeader";
import MessagesSectionListItem from "./MessagesSectionListItem";
import SendMessageInput from "./SendMessageInput";

export default function MessagesSection({ conversation, sendMessage, endConversation }) {
  const messages = conversation?.messages;

  if (!messages || messages.length < 1) return <></>;

  return (
    <>
      <MessagesSectionHeader conversation={conversation} endConversation={endConversation} />

      <Row>
        <Col className="py-3 px-4" style={{ height: "60vh", overflowY: "scroll" }}>
          {messages.map(message => (
            <MessagesSectionListItem message={message} />
          ))}
          <AlwaysScrollToBottom />
        </Col>
      </Row>

      <Row className="py-2">
        <Col>
          <SendMessageInput sendMessage={sendMessage} />
        </Col>
      </Row>
    </>
  );
}

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};
