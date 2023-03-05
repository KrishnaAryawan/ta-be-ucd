const { createClient } = require("redis");

const redisClient = createClient({
	url: process.env.REDISURL,
});

redisClient
	.connect()
	.then(() => {
		return redisClient.ping();
	})
	.catch((e) => console.error("error connecting to redis: " + e));

module.exports = redisClient;
