import Fastify from 'fastify'

const server = Fastify({})

server.get('/ping', async () => {
  return 'pong2'
})

server.listen({ port: 4000 })
