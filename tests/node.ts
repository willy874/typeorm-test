import express from 'express'
import net from 'node:net'

const testNetRequest = () => {
  const client = net.createConnection({
    host: 'localhost',
    port: 3001,
  }, () => {
    const reqData = { request: 'Hello World!' }
    const path = '/json-test';
    const method = 'POST';
    const headers = {
      'Host': 'localhost',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(reqData))
    };
    const body = JSON.stringify(reqData);
  
    // 組裝 HTTP 請求字串
    const request = ''
    + `${method} ${path} HTTP/1.1\r\n`
    + Object.entries(headers).map(([key, value]) => `${key}: ${value}`).join('\r\n')
    + `\r\n\r\n${body}`;
    client.write(request)
  })
  let data = ''
  client.on('data', (chunk) => {
    data += chunk.toString()
  })
  client.on('end', () => {
    console.log('========= Connection closed =========')
    console.log(`${data}`);
    console.log('=====================================')
  })
}


import http from 'node:http'

const testHttpRequest = () => {
  const request = http.request({
    host: 'localhost',
    port: 3001,
    path: '/json-test',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }, (response) => {
    let data = '';
    // 接收數據塊
    response.on('data', (chunk) => {
      data += chunk;
    });
    // 整個回應完成後
    response.on('end', () => {
      console.log('Response:', data);
    });
  })
  request.write(JSON.stringify({ request: 'Hello World!' }))
  request.end()
}

const testServer = new http.Server((req, res) => {
  if (req.url === '/json-test' && req.method === 'POST') {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk.toString()
    })
    req.on('end', () => {
      console.log('Request data:', data)
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      const reqData = JSON.stringify({ message: 'Hello World!' })
      const reqPrefix = reqData.slice(0, 10)
      const reqSuffix = reqData.slice(10)
      setTimeout(() => {
        res.write(reqPrefix)
      }, 1000)
      setTimeout(() => {
        res.write(reqSuffix)
      }, 2000)
      setTimeout(() => {
        res.end()
      }, 3000)
    })
  }
})
testServer.listen(3001, () => {
  console.log('Server is running on http://localhost:3001/json-test')
})


const app = express()
app.use(express.json())
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001/json-test')
})
app.post('/json-test', (req, res) => {
  res.send({ message: 'Hello World!' })
})
