import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import ConversationsSectionHeader from "./ConversationsSectionHeader";
import ConversationsSectionListItem from "./ConversationsSectionListItem";

export default function ConversationsSection({
  conversations,
  setSelectedConversation,
  setConversations,
}) {
  return (
    <div>
      <Row>
        <Col className="pb-2">
          <ConversationsSectionHeader />
        </Col>
      </Row>

      <Row>
        <Col style={{ height: "60vh", overflowY: "scroll" }}>
          {!conversations || !conversations.length ? (
            <div>
              <Row>
                <Col className="mt-5">
                  <h5 className="text-center text-muted pt-5">There is no conversation assigned to you right now.</h5>
                </Col>
              </Row>
            </div>
          ) : (
            <ListGroup>
              {conversations.map(conversation => (
                <ConversationsSectionListItem
                  key={conversation.id}
                  conversation={conversation}
                  setSelectedConversation={setSelectedConversation}
                  setConversations={setConversations}
                />
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
}
