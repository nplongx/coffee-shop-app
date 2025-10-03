const httpStatus = require('http-status');
const ApiError = require('../../../utils/ApiError');
const userRepository = require('../repositories/user.repository');
const UserDomain = require('../domain/user.domain');

const createUser = async (userBody) => {
  if (await userRepository.findUserByEmail(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = new UserDomain({ ...userBody, email: userBody.email, id: null });
  return userRepository.create(userRepository.toPersistenceObject(user));
};

const queryUsers = async (filter, options) => userRepository.paginate(filter, options);

const getUserById = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};

const getUserByEmail = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  if (updateBody.email) {
    const existing = await userRepository.findUserByEmail(updateBody.email);
    if (existing && existing.id.toString() !== userId.toString()) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
  }

  const updatedUser = new UserDomain({
    ...user,
    ...updateBody,
    email: updateBody.email,
  });

  return userRepository.update(userId, userRepository.toPersistenceObject(updatedUser));
};

const deleteUserById = async (userId) => {
  await userRepository.delete(userId);
  return null; // để controller trả 204
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
