import React from "react";
import { Col, Row } from "react-bootstrap";

export default function MessagesSectionListItem({ message }) {
  const { id, text, sentByClient, sentDate, attachments } = message;

  const dateString = new Date(sentDate).toLocaleString();
  const hasAttachments = attachments && attachments.length > 0;
  const dateClassName = "text-muted font-italic" + (sentByClient ? "" : " text-end");
  const boxClassName = sentByClient ? "bg-gray me-auto" : "bg-primary ms-auto";
  const boxStyle = {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderTopLeftRadius: sentByClient ? 0 : 24,
    borderTopRightRadius: sentByClient ? 24 : 0,
  };

  const MessageAttachment = ({ key, attachment }) => {
    const { type, url } = attachment;
    const alt = id + "-attachment-" + key;
    const width = "100%";
    if (type === "image") return <img src={url} alt={alt} width={width} />;
    else if (type === "image") return <video controls src={url} alt={alt} width={width} />;
    else if (type === "image") return <audio controls src={url} alt={alt} width={width} />;
    else return <a href={url}>{url}</a>;
  };

  return (
    <>
      <Row>
        <Col xs="auto" className={boxClassName} style={boxStyle}>
          <Row>
            <Col className="px-3 py-2">
              <text>{text}</text>
            </Col>
          </Row>

          {hasAttachments &&
            attachments.map((attachment, i) => (
              <Row>
                <Col>
                  <MessageAttachment key={i} attachment={attachment} />
                </Col>
              </Row>
            ))}
        </Col>
      </Row>

      <Row>
        <Col>
          <p className={dateClassName}>{dateString}</p>
        </Col>
      </Row>
    </>
  );
}
