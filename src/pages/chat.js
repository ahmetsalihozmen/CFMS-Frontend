import axios from "axios";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ConversationsSection from "../components/chat/ConversationsSection";
import MessagesSection from "../components/chat/MessagesSection";
import MainLayout from "../components/layouts/MainLayout";
import { CONVERSATIONS_URL } from "../utils/constants";

export default function ChatPage({ conversations }) {
  console.log(conversations);
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  return (
    <MainLayout>
      <Row>
        <Col xs={5}>
          <ConversationsSection
            conversations={conversations}
            setSelectedConversation={setSelectedConversation}
          />
        </Col>

        <Col xs={7} className="border">
          <MessagesSection conversation={selectedConversation} />
        </Col>
      </Row>
    </MainLayout>
  );
}

// TODO Yeni conversation handle
export async function getServerSideProps() {
  const response = await axios.get(CONVERSATIONS_URL);
  const conversations = response?.data?.data;
  return { props: { conversations } };
}
