import axios from "axios";
import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { CONVERSATIONS_URL } from "../../utils/constants";
import PlatformIcon from "./PlatformIcon";

export default function ConversationsSectionListItem({ conversation, setSelectedConversation }) {
  console.log("ConversationsSectionListItem:", conversation);
  const { id, platform, clientName, lastMessageDate, lastMessagePreview } = conversation;
  const dateString = new Date(lastMessageDate).toLocaleString();

  const handleClick = async () => {
    const options = {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    };
    try {
      console.log("Clicked " + id);
      const url = `${CONVERSATIONS_URL}/${id}`;
      const conversationResponse = await axios.get(url, options);
      const conversation = conversationResponse?.data?.data;
      setSelectedConversation(conversation);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListGroup.Item action onClick={handleClick}>
      <Container fluid className="px-0">
        <Row>
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
                <text className="text-muted">
                  {lastMessagePreview || "Last message preview..."}
                </text>
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
