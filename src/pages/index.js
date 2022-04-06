import Head from 'next/head'
import React from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import GetMesssage from '../components/GetMesssage'
import SendMessage from '../components/SendMessage'


const sendMessage = async (message) => {
  const response = await fetch('/api/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message
    })
  })
  const data = await response.json()
  
  console.log(data)
}

export default function Home() {

  const [message, setMessage] = React.useState('')

  console.log(message)
  return (
    <div>
      <Container classname='w-100 h-100' >
        <Row>
          <Col md={4} className='left-side border border-dark'>
            <h1 className=''>Mesajlar</h1>
          </Col>

          <Col className='right-side border border-dark'>
            <Row>
              <div className='right-side border border-dark'>
                <GetMesssage />
                <SendMessage />
              </div>
            </Row>
            <Row>
              <Col>
                <input className='w-80' value={message} type="text" onChange={(e) => setMessage(e.target.value)} />
                <Button variant="danger" size="md" onClick={() => {
                  sendMessage(message)
                  setMessage('')
                }} >Deneme</Button>
              </Col>

            </Row>
          </Col>
        </Row>
      </Container>




    </div>
  )
}
