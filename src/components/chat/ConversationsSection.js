import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import ConversationsSectionHeader from "./ConversationsSectionHeader";
import ConversationsSectionListItem from "./ConversationsSectionListItem";

export default function ConversationsSection({ conversations, setSelectedConversation }) {
  return (
    <div>
      <Row>
        <Col className="pb-2">
          <ConversationsSectionHeader />
        </Col>
      </Row>

      <Row>
        <Col style={{ height: "60vh", overflowY: "scroll" }}>
          <ListGroup>
            {conversations.map(conversation => (
              <ConversationsSectionListItem
                key={conversation.id}
                conversation={conversation}
                setSelectedConversation={setSelectedConversation}
              />
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
