const redis = require('redis');
const redisClient = redis.createClient({ url: process.env.REDIS_URI });

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  console.log(`Redis error: ${err}`);
});

module.exports = redisClient;
