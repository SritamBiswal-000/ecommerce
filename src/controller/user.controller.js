const {
	createUserService,
	getUsersService,
	getUserByIdService,
} = require("../service/user.service");

const createUserController = async (req, res) => {
	console.log("Inside createUserController");
	const { name, email, password } = req.body;
	const result = await createUserService({
		name,
		email,
		password,
		role: "user",
	});
	if (result === "User already exists") {
		return res
			.status(400)
			.json({ message: "User already exists with this email" });
	}
	res.status(201).json({ message: "User created successfully", result });
};

const getUsersController = async (req, res) => {
	const users = await getUsersService();
	res.status(200).json({ message: "All users", users });
};

const getUserByIdController = async (req, res) => {
	const { id } = req.params;
	const result = await getUserByIdService(id);
	if (result === "User doesn't exists") {
		return res
			.status(400)
			.json({ message: "User doesn't exists with this id" });
	}
	res.status(200).json({ message: "Successfully got the user", result });
};

const updateUserController = async (req, res) => {
	// task1: implement update user functionality 
	// argument: id, req.body (name, email, password)
	// requirements: 
	// 1. user should be able to update name, email, password (anyone or all)
	// 2. there should be check for email (if email is updated then check for email already exists)

	res.status(501).json({ message: "Not implemented" })
}

const deleteUserController = async (req, res) => {
	// task2: implement delete user functionality 
	// argument: id
	// requirements: 
	// 1. user should be able to delete user
	// 2. there should be check for user exists
	res.status(501).json({ message: "Not implemented" })
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
