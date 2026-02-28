const { User } = require("../db/models");

const createUserRepository = async (user) => {
	return await User.create(user);
};

const findUserByEmailRepository = async (email) => {
	return await User.findOne({ where: { email } });
};

const getUsersRepository = async () => {
	return await User.findAll();
};

const findUserByIdRepository = async (id) => {
	console.log("userrepo")
	return await User.findByPk(id);
};

const updateUserRepository = async (id, user) => {
	return await User.update(user, { where: { id } });
};

const deleteUserRepository = async (id) => {
	console.log("deleteuser")
	return await User.destroy({ where: { id } });
};

module.exports = {
	createUserRepository,
	getUsersRepository,
	findUserByEmailRepository,
	findUserByIdRepository,
	updateUserRepository,
	deleteUserRepository
};
