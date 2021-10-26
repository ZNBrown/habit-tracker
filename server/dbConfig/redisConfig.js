const redis = require('redis')
// if in development mode use Redis file attached
// start redis as a child process


//export const redisClient = redis.createClient(process.env.REDIS_URL);
// process.env.REDIS_URL is the redis url config variable name on heroku. 
redis.createClient()
redisClient.on('connect',()=>{
console.log('Redis client connected')
});
redisClient.on('error', (error)=>{
console.log('Redis not connected', error)
});