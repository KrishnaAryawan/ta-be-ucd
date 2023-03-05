const { getCacheKeyMenu } = require("../constant/cache-keys");
const database = require("../db/db-conn");
const redisClient = require("../redis/redis-conn");

const insertNewMenu = async (menu) => {
	return new Promise((resolve, reject) => {
		database.execute(
			"INSERT INTO menu (name, description, price_per_day, image_url) VALUES (?, ?, ?, ?)",
			[menu.name, menu.description, menu.pricePerDay, menu.imageUrl],
			(err, result) => {
				if (err) {
					console.error("error querying database: ", err);
					reject(err);
					return;
				}

				menu.id = result.insertId;
				redisClient.set(
					getCacheKeyMenu(result.insertId),
					JSON.stringify(menu)
				);

				resolve(result.insertId);
			}
		);
	});
};

const updateMenuById = async (menu) => {
	return new Promise((resolve, reject) => {
		database.execute(
			"UPDATE menu SET name = ?, description = ?, price_per_pcs = ?, image_url = ? WHERE id = ?",
			[
				menu.name,
				menu.description,
				menu.pricePerPcs,
				menu.imageUrl,
				menu.id,
			],
			(err, result) => {
				if (err) {
					console.error("error querying database: ", err);
					reject(err);
					return;
				}

				redisClient.set(getCacheKeyMenu(menu.id), JSON.stringify(menu));
				resolve(menu);
			}
		);
	});
};

const deleteMenuById = async (id) => {
	return new Promise((resolve, reject) => {
		database.execute("DELETE FROM menu WHERE id = ?", [id], (err) => {
			if (err) {
				console.error("error querying database: ", err);
				reject(err);
				return;
			}

			redisClient.del(getCacheKeyMenu(id));
			resolve(id);
		});
	});
};

const findMenuById = async (id) => {
	return new Promise(async (resolve, reject) => {
		const response = { cacheHit: false, data: null };
		const res = await redisClient.get(getCacheKeyMenu(id));
		if (res !== null) {
			response.cacheHit = true;
			response.data = JSON.parse(res);
			return resolve(response);
		}

		database.query(
			"SELECT id, name, description, price_per_pcs, image_url FROM menu WHERE id = ? LIMIT 1",
			[id],
			(err, resp) => {
				if (err) {
					console.error("error querying db: " + err);
					return reject(err);
				}
				if (resp.length == 0) {
					resp.data = null;
					return resolve(response);
				}
				response.data = resp[0];
				redisClient.set(getCacheKeyMenu(id), JSON.stringify(resp[0]));
				return resolve(response);
			}
		);
	});
};

const findAllMenu = async () => {
	return new Promise(async (resolve, reject) => {
		database.query(
			"SELECT id, name, description, price_per_day, image_url FROM menu LIMIT 20",
			(err, resp) => {
				if (err) {
					console.error("error querying db: " + err);
					return reject(err);
				}
				return resolve(resp);
			}
		);
	});
};

module.exports.insertNewMenu = insertNewMenu;
module.exports.findMenuById = findMenuById;
module.exports.findAllMenu = findAllMenu;
module.exports.updateMenuById = updateMenuById;
module.exports.deleteMenuById = deleteMenuById;
