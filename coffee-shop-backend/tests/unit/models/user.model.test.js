const faker = require('faker');
const { User } = require('../../../src/models');
const UserDomain = require('../../../src/modules/user/domain/user.domain');
const Email = require('../../../src/modules/user/domain/email');

describe('User model', () => {
  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
    });

    // FIX: Đã thay thế .resolves.toBeUndefined() bằng .not.toThrow()
    test('should correctly validate a valid user', () => {
      expect(() => new UserDomain(newUser)).not.toThrow();
    });

    // FIX: Đã thay thế .rejects.toThrow() bằng expect(() => ...).toThrow()
    test('should throw a validation error if email is invalid', () => {
      newUser.email = 'invalidEmail';
      expect(() => new UserDomain(newUser)).toThrow();
    });

    // FIX: Đã thay thế .rejects.toThrow() bằng expect(() => ...).toThrow()
    test('should throw a validation error if password length is less than 8 characters', () => {
      newUser.password = 'passwo1';
      expect(() => new UserDomain(newUser)).toThrow();
    });

    // FIX: Đã thay thế .rejects.toThrow() bằng expect(() => ...).toThrow()
    test('should throw a validation error if password does not contain numbers', () => {
      newUser.password = 'password';
      expect(() => new UserDomain(newUser)).toThrow();
    });

    // FIX: Đã thay thế .rejects.toThrow() bằng expect(() => ...).toThrow()
    test('should throw a validation error if password does not contain letters', () => {
      newUser.password = '11111111';
      expect(() => new UserDomain(newUser)).toThrow();
    });

    // FIX: Đã thay thế .rejects.toThrow() bằng expect(() => ...).toThrow()
    test('should throw a validation error if role is unknown', () => {
      newUser.role = 'invalid';
      expect(() => new UserDomain(newUser)).toThrow();
    });
  });

  describe('User toJSON()', () => {
    test('should not return user password when toJSON is called', () => {
      const newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
      // NOTE: Giả định User là Mongoose Model. Test này không liên quan đến UserDomain.
      expect(new User(newUser).toJSON()).not.toHaveProperty('password');
    });
  });
});
