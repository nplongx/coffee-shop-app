const { mapDoc } = require('../helper/meilisearch.helper');

module.exports = function syncModelToMeilisearch(Model, index) {
  Model.watch().on('change', async (change) => {
    console.log(`[${Model.modelName}] Change detected:`, change);

    try {
      if (change.operationType === 'insert') {
        const doc = change.fullDocument;
        await index.addDocuments([mapDoc(doc)]);
        console.log(`[${Model.modelName}] Inserted into Meilisearch:`, doc._id);
      }

      if (change.operationType === 'update' || change.operationType === 'replace') {
        const updatedDoc = await Model.findById(change.documentKey._id);
        if (updatedDoc) {
          await index.updateDocuments([mapDoc(updatedDoc)]);
          console.log(`[${Model.modelName}] Updated in Meilisearch:`, updatedDoc._id);
        }
      }

      if (change.operationType === 'delete') {
        await index.deleteDocument(change.documentKey._id.toString());
        console.log(`[${Model.modelName}] Deleted from Meilisearch:`, change.documentKey._id);
      }
    } catch (err) {
      console.error(`[${Model.modelName}] Sync error:`, err);
    }
  });
};
