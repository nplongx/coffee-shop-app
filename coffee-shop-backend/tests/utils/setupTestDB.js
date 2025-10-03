const mongoose = require('mongoose');
const config = require('../../src/config/config');
const logger = require('../../src/config/logger');

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
  });

  afterAll(async () => {
    // Đảm bảo mongoose tắt hết
    await mongoose.connection.close();
    await mongoose.disconnect();

    // Nếu dùng winston
    // logger.end && logger.end();

    // Force exit nếu cần (chỉ khi debug)
    // await new Promise(resolve => setTimeout(resolve, 500));
  });
};

module.exports = setupTestDB;
