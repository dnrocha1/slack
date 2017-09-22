const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on('error', (err) => {
  console.error(err);
});

function retrieveStoredMetadata(id) {
  return new Promise((resolve, reject) => {
    redisClient.get(id, (err, value) => {
      if (err) {
        reject(new Error(err));
      } else if (!value) {
        reject(new Error(`Could not find the supplied id in the database: Value is ${value}`));
      } else {
        resolve(value);
      }
    });
  });
}

function storeMessageMetadata(id, metaData) {
  redisClient.set(id, JSON.stringify(metaData), redis.print);
}

module.exports = {
  retrieveStoredMetadata,
  storeMessageMetadata,
};