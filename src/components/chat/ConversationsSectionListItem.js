import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import PlatformIcon from "./PlatformIcon";

export default function ConversationsSectionListItem({ conversation, setSelectedConversation }) {
  const { platform, clientName, lastMessageDate, lastMessagePreview } = conversation;
  const dateString = new Date(lastMessageDate).toLocaleString();
  const handleClick = () => setSelectedConversation(conversation);

  return (
    <ListGroup.Item action onClick={handleClick}>
      <Container fluid className="px-0">
        <Row >
          <Col xs="auto" className="d-flex flex-wrap align-items-center">
            <PlatformIcon platform={platform} />
          </Col>

          <Col className="d-flex flex-column justify-content-center">
            <Row>
              <Col>
                <b>{clientName}</b>
              </Col>
            </Row>

            <Row>
              <Col>
                <text className="text-muted">{lastMessagePreview || "Last message preview..."}</text>
              </Col>
            </Row>
          </Col>

          <Col xs="auto d-flex flex-column justify-content-end">
            <i>{dateString}</i>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}
