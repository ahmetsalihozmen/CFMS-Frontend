import axios from "axios";
import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { CONVERSATIONS_URL } from "../../utils/constants";
import PlatformIcon from "./PlatformIcon";

export default function ConversationsSectionListItem({ conversation, setSelectedConversation, setConversations }) {
  console.log("ConversationsSectionListItem:", conversation);
  const { id, platform, clientName, lastMessageDate, lastMessagePreview, isSeen } = conversation;
  const dateString = new Date(lastMessageDate).toLocaleTimeString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

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
      setConversations(prevState => prevState.map(c => (c.id === id ? { ...c, isSeen: true } : c)));
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
                <text className={isSeen ? "text-muted" : "fw-bold"}>
                  {lastMessagePreview || ""}
                </text>{" "}
              </Col>
            </Row>
          </Col>

          <Col className="d-flex justify-content-end mt-auto pb-1">
            {!isSeen && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height={14}>
                <path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z" />
              </svg>
            )}
          </Col>

          <Col xs="auto d-flex flex-column justify-content-end">
            <i>{dateString}</i>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}
