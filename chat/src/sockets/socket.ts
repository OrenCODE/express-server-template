import { Server as SocketIO } from 'socket.io';
import { Server as HTTPServer } from 'http';

const initializeSocketIO = (httpServer: HTTPServer) => {
  const io = new SocketIO(httpServer, {
    allowEIO3: true,
    cors: { credentials: true, origin: 'http://localhost:3000' },
  });

  const users = [];

  io.on('connection', socket => {
    console.log('connected...');

    socket.on('user connected', payload => {
      users.push({
        id: socket.id,
        appId: payload.appId,
        name: payload.name,
        avatar: payload.avatar,
      });
      socket.broadcast.emit('user connected', users);
    });

    // Handle chat messages
    socket.on('message', message => {
      io.emit('message', message);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

export default initializeSocketIO;
