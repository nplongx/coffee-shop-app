const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Email = require('../modules/user/domain/email');

/**
 * Abstract base repository for generic CRUD operations
 */
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  /**
   * Convert domain entity to persistence object with customizable mapping
   * @param {Object} entity - Domain entity instance
   * @param {Function} [customMapper] - Optional custom mapping function
   * @returns {Object} - Persistence-compatible object
   */
  toPersistenceObject(entity, customMapper = (e) => e) {
    if (!entity) throw new ApiError(httpStatus.BAD_REQUEST, 'Entity is required');

    const baseMapping = {
      _id: entity.id,
      ...customMapper(entity), // Ánh xạ tùy chỉnh cho từng entity
    };

    // Xóa các trường undefined hoặc null để tránh lỗi khi lưu
    Object.keys(baseMapping).forEach((key) => {
      if (baseMapping[key] === undefined || baseMapping[key] === null) {
        delete baseMapping[key];
      }
    });

    return baseMapping;
  }

  /**
   * Convert persistence object to domain entity with customizable mapping
   * @param {Object} data - Persistence object (e.g., Mongoose document)
   * @param {Function} entityConstructor - Constructor of domain entity
   * @param {Function} [customMapper] - Optional custom mapping function
   * @returns {Object} - Domain entity instance
   */
  toDomainEntity(data, entityConstructor, customMapper = (d) => d) {
    if (!data) return null;
    if (!entityConstructor) throw new ApiError(httpStatus.BAD_REQUEST, 'Entity constructor is required');
    // Kiểm tra entityConstructor có phải là class (chữ cái đầu viết hoa)
    if (typeof entityConstructor !== 'function' || !/^[A-Z]/.test(entityConstructor.name)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Entity constructor must be a class with capitalized name');
    }

    const baseMapping = {
      id: data._id,
      ...customMapper(data), // Ánh xạ tùy chỉnh cho từng entity
    };

    // Xử lý Value Object (giả định có trường email)
    if (baseMapping.email && typeof baseMapping.email === 'string') {
      baseMapping.email = new Email(baseMapping.email);
    }

    return new entityConstructor(baseMapping);
  }

  async create(entity) {
    return this.model.create(entity);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findOne(filter) {
    return this.model.findOne(filter);
  }

  async paginate(filter, options) {
    return this.model.paginate(filter, options);
  }

  async update(id, entity) {
    const doc = await this.findById(id);
    if (!doc) throw new ApiError(httpStatus.NOT_FOUND, 'Entity not found');
    Object.assign(doc, entity);
    await doc.save();
    return doc;
  }

  async delete(id) {
    const doc = await this.findById(id);
    if (!doc) throw new ApiError(httpStatus.NOT_FOUND, 'Entity not found');
    await doc.remove();
    return doc;
  }
}

module.exports = BaseRepository;
