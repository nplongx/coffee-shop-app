const BaseRepository = require('../../../base/base.repository');
const UserModel = require('../../../models/user.model');
const UserDomain = require('../domain/user.domain');

class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
    this.entityConstructor = UserDomain;
  }

  toPersistenceObject(entity, customMapper = (e) => e) {
    return super.toPersistenceObject(entity, (e) => ({
      name: e.name,
      email: e.email,
      password: e.password,
      role: e.role,
      isEmailVerified: e.isEmailVerified || false,
      ...customMapper(e),
    }));
  }

  // toDomainEntity(data, entityConstructor = this.entityConstructor, customMapper = (d) => d) {
  //   return super.toDomainEntity(data, entityConstructor, (d) => ({
  //     name: d.name,
  //     email: d.email, // hỗ trợ cả Email instance lẫn string
  //     role: d.role,
  //     isEmailVerified: d.isEmailVerified,
  //     ...customMapper(d),
  //   }));
  // }

  async findUserByEmail(email) {
    if (!email) return null;
    const doc = await this.model.findOne({ email });
    if (!doc) return null;

    try {
      return doc;
    } catch (err) {
      return null; // tránh crash nếu email trong DB invalid
    }
  }
}

module.exports = new UserRepository();
