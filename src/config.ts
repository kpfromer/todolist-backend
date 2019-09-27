import convict from 'convict';

const config = convict({
  port: {
    doc: 'The port for the server',
    env: 'PORT',
    format: 'port',
    default: 3001
  },
  mongoUri: {
    // TODO:
    default: 'mongodb://localhost:27017/todolist'
  },
  auth: {
    jwtSecret: {
      default: 'jwt-secret'
    },
    saltRounds: {
      default: 10
    }
  }
});

export default config;
