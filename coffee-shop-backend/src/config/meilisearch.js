const { MeiliSearch } = require('meilisearch');

const client = new MeiliSearch({
  host: 'http://localhost:7700',
});

module.exports = client;
