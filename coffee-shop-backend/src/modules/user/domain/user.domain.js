const { roles } = require('../../../config/roles');
const Email = require('./email');

class UserDomain {
  constructor({ id, name, email, password, role, isEmailVerified }) {
    this.id = id;
    this.isEmailVerified = isEmailVerified || false;

    // Chỉ gán nếu có giá trị để hỗ trợ cập nhật một phần
    if (name !== undefined) {
      this.name = this.validateName(name);
    }

    if (email !== undefined) {
      this.email = new Email(email); // Sử dụng Value Object Email
    }

    if (password !== undefined) {
      this.password = this.validatePassword(password);
    }

    if (role !== undefined) {
      this.role = this.validateRole(role);
    } else if (id === undefined) {
      // Đặt giá trị mặc định cho tạo mới nếu không có role
      this.role = 'user';
    }
  }

  // Validation và logic nghiệp vụ
  validateName(name) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Name is required and cannot be empty');
    }
    return name.trim();
  }

  validateRole(role) {
    if (!role || !roles.includes(role)) {
      throw new Error('Invalid role');
    }
    return role;
  }

  validatePassword(password) {
    if (!password || typeof password !== 'string' || password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      throw new Error('Password must contain at least one letter and one number');
    }
    return password; // Trả về mật khẩu gốc, việc băm sẽ được thực hiện trước khi lưu vào DB bằng pre save hook của Mongoose
  }

  changeRole(newRole) {
    if (roles.includes(newRole)) {
      throw new Error('Invalid role');
    }
    this.role = newRole;
  }

  updateProfile({ name, email }) {
    this.name = name || this.name;
    if (email) this.email = new Email(email);
  }

  getEmailValue() {
    return this.email.value;
  }
}

module.exports = UserDomain;
