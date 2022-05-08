import React from "react";
import { Col, Row } from "react-bootstrap";
import getPlatformName from "../../utils/getPlatformName";
import PlatformIcon from "./PlatformIcon";

export default function MessagesSectionHeader({ conversation }) {
  const { clientName, platform } = conversation;
  const platformName = getPlatformName(platform);

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
      </Row>
    </>
  );
}
