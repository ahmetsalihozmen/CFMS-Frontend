import React from "react";
import { Col, Row } from "react-bootstrap";
import MessagesSectionHeader from "./MessagesSectionHeader";
import MessagesSectionListItem from "./MessagesSectionListItem";
import SendMessageInput from "./SendMessageInput";

export default function MessagesSection({ conversation, sendMessage }) {
  const messages = conversation?.messages;

  if (!messages || messages.length < 1) return <></>;

  return (
    <>
      <MessagesSectionHeader conversation={conversation} />

      <Row>
        <Col className="py-3 px-4">
          {messages.map(message => (
            <MessagesSectionListItem message={message} />
          ))}
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
