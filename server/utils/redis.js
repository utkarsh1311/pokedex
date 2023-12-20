
const redis = require('ioredis');
const config = require('./config');

const redisClient = new redis(config.REDIS_URL);

redisClient.on('connect',() => {
    console.log('connected to redis successfully!');
})

redisClient.on('error',(error) => {
    console.log('Redis connection error :', error);
})

module.exports = redisClient;