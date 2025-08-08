import { spawn } from 'child_process';
import path from 'path';

const clientDir = path.resolve('client/inboxpert');
const serverDir = path.resolve('server');

// Start Client (Vite+React in client/inboxpert)
const client = spawn('npm', ['run', 'dev'], {
  cwd: clientDir,
  shell: true,
  stdio: 'inherit'
});

// Start Server
const server = spawn('npm', ['run', 'dev'], {
  cwd: serverDir,
  shell: true,
  stdio: 'inherit'
});

// Error handling for client
client.on('error', (err) => {
  console.error('Failed to start client:', err);
});
client.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`Client process exited with code ${code} and signal ${signal}`);
  }
});

// Error handling for server
server.on('error', (err) => {
  console.error('Failed to start server:', err);
});
server.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`Server process exited with code ${code} and signal ${signal}`);
  }
});