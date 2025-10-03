// src/modules/user/domain/Email.js
class Email {
  constructor(value) {
    // Kiểm tra định dạng email
    if (!Email.isValidEmail(value)) {
      throw new Error('Invalid email format');
    }
    // Lưu giá trị đã chuẩn hóa (lowercase)
    this._value = value;
  }

  // Phương thức kiểm tra định dạng email
  static isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức chính quy cơ bản
    return emailRegex.test(value) && value.length <= 254; // Giới hạn độ dài email
  }

  // Lấy giá trị (immutable)
  get value() {
    return this._value;
  }

  // So sánh hai Email (value object so sánh giá trị)
  equals(other) {
    if (!(other instanceof Email)) {
      return false;
    }
    return this._value === other._value;
  }

  // Chuyển thành string (nếu cần)
  toString() {
    return this._value;
  }
}

module.exports = Email;
