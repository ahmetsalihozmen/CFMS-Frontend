// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

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

  res.statusCode = 200;
  res.json({ status: message });

  
}
