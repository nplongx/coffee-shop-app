function mapDoc(doc) {
  if (!doc) return null;

  const obj = doc.toObject ? doc.toObject() : doc;

  // Convert MongoDB _id -> id (string)
  const mapped = {
    id: obj._id.toString(),
    ...obj,
  };

  // Remove sensitive fields
  delete mapped._id;
  delete mapped.password;
  delete mapped.__v;

  return mapped;
}

module.exports = { mapDoc };
