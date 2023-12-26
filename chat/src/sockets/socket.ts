import { Server as SocketIO } from 'socket.io';
import { Server as HTTPServer } from 'http';

const users = [];

const initializeSocketIO = (httpServer: HTTPServer) => {
  const io = new SocketIO(httpServer, {
    allowEIO3: true,
    cors: { credentials: true, origin: 'http://localhost:30001' },
  });

  io.on('connection', socket => {
    socket.on('user connected', payload => {
      console.log('connected...');
      const findUser = users.find(x => x?.userId === payload.id);
      if (findUser) return;

      users.push({
        socketId: socket.id,
        userId: payload.id,
        name: payload.name,
      });

      socket.broadcast.emit('message', {
        text: `${payload.name} has joined the chat.`,
        senderId: 'system',
        senderName: payload.name,
        timestamp: Date.now(),
      });

      socket.emit('user connected', users);
      socket.broadcast.emit('user connected', users);
    });

    // Handle chat messages
    socket.on('message', message => {
      io.emit('message', message);
    });

    // Handle voice messages
    socket.on('voiceMessage', voiceData => {
      // Broadcast the voice data to all connected clients
      io.emit('voiceMessage', voiceData);
    });

    // Handle disconnect
    socket.on('user disconnect', payload => {
      const userIndex = users.findIndex(user => user.userId === payload.id);

      if (userIndex !== -1) {
        const disconnectedUser = users[userIndex];
        users.splice(userIndex, 1);

        socket.broadcast.emit('message', {
          text: `${disconnectedUser.name} has left the chat.`,
          senderId: 'system',
          senderName: disconnectedUser.name,
          timestamp: Date.now(),
        });
        socket.emit('user connected', users);
        socket.broadcast.emit('user connected', users);
      }
    });
  });
};

export default initializeSocketIO;
