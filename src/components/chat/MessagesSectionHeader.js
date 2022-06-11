import React from "react";
import { Col, Row, Button, Modal} from "react-bootstrap";
import getPlatformName from "../../utils/getPlatformName";
import PlatformIcon from "./PlatformIcon";
import { useState } from "react";

export default function MessagesSectionHeader({ conversation, endConversation }) {
  if (!conversation)
    return (
      <>
        <Row className="bg-gray py-3 border-bottom">
          <Col>
          </Col>
          <Col>
          </Col>
          <Col>
          </Col>
        </Row>
      </>
    );

  const { clientName, platform } = conversation;
  
  const platformName = getPlatformName(platform);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const endConversationStyle = {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    justifyContent: "end",
    display: "flex",
  }


  return (
    <>
      <Row className="bg-gray py-3 border-bottom">
        <Col xs="auto">
          <PlatformIcon platform={platform} />
        </Col>

        <Col>
          <Row>
            <Col>
              <b>{clientName}</b>
            </Col>
          </Row>

          <Row>
            <Col>
              <text className="text-muted">{platformName}</text>
            </Col>
          </Row>
        </Col>

        <Col style={endConversationStyle}>
          <Button type="submit" onClick={handleShow}>
             ✓
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>End Conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to end this conversation?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            endConversation();
            handleClose();
          }}>
            End Conversation
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
