const {
	insertNewMenu,
	findMenuById,
	findAllMenu,
	updateMenuById,
	deleteMenuById,
} = require("../store/menu");

const insertMenuData = async (menu) => {
	const resp = await insertNewMenu(menu);
	return resp;
};

const updateMenu = async (id, menu) => {
	menu.id = id;
	return await updateMenuById(menu);
};

const deleteMenu = async (id) => {
	const response = {
		cacheHit: false,
		data: null,
	};
	const menuExists = await getMenuById(id);
	response.cacheHit = menuExists.cacheHit;
	if (menuExists.data === null) {
		response.data = "not found";
		return response;
	}

	const deletedId = await deleteMenuById(id);
	response.data = deletedId;
	return response;
};

const getMenuById = async (id) => {
	return await findMenuById(id);
};

const getAllMenu = async () => {
	return await findAllMenu();
};

module.exports.insertMenu = insertMenuData;
module.exports.getMenuById = getMenuById;
module.exports.getAllMenu = getAllMenu;
module.exports.updateMenu = updateMenu;
module.exports.deleteMenu = deleteMenu;
