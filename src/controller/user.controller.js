const { StatusCodes } = require("http-status-codes");
const {
	createUserService,
	getUsersService,
	getUserByIdService,
	updateUserService,
	deleteUserService
} = require("../service/user.service");

const createUserController = async (req, res) => {
	const { name, email, password } = req.body;
	const result = await createUserService({
		name,
		email,
		password,
		role: "user",
	});
	res.status(StatusCodes.CREATED).json({ message: "User created successfully", result });
};

const getUsersController = async (req, res) => {

	const users = await getUsersService();
	res.status(200).json({ message: "All users", users });
};

const getUserByIdController = async (req, res) => {
	const { id } = req.params;
	const result = await getUserByIdService(id);
	res.status(200).json({ message: "Successfully got the user", result });
};

const updateUserController = async (req, res) => {
	const { id } = req.params;
	const userData = req.body;
	const result = await updateUserService(id, userData);
	res.status(200).json({ message: "Successfully updated the user", result });
}

const deleteUserController = async (req, res) => {
	const { id } = req.params;
	const result = await deleteUserService(id);
	res.status(200).json({ message: "Successfully deleted the user", result });
}

module.exports = {
	createUserController,
	getUsersController,
	getUserByIdController,
	updateUserController,
	deleteUserController
};

// if i want to use await i need to have the method to be async
// async method always return promise so we need to await for that (await keyword is used)
