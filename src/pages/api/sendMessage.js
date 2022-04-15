// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import WebSocket from 'ws';

let ws;

export default async (req, res) => {

  const message =  req.body.message;

  // try {
  //   const response = await fetch('http://localhost:8080/sendMessage', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       message: message
  //     })
  //   })
  //   const data = await response.json()
  //   res.statusCode = 200;
  //   res.json({ status: data });
  //   console.log(message)

  // }
  // catch (error) {
  //   console.log(error)
  //   res.json({ error: error })
  // }


  connect();

  res.statusCode = 200;
  res.json({ status: message });

  
}

function sendData() {
	var data = JSON.stringify({
		'user' : "Ahmet",
	})
	ws.send(data);
}

function connect() {
  ws = new WebSocket('ws://localhost:8080/cfms');
  ws.onmessage = function(data) {
    console.log(data.data);
  }
  ws.onopen = function() {
    console.log('connected');
    sendData();
  }
}
