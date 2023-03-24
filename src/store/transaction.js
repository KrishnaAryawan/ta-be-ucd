const database = require("../db/db-conn");
const redisClient = require("../redis/redis-conn");

const insertNewTransaction = async (trx) => {
	return new Promise((resolve, reject) => {
		database.execute(
			"INSERT INTO `transaksi`(`menu_id`, `jumlah`, `total`, `name`, payment) VALUES (?,?,?,?,?)",
			[trx.menu_id, trx.pcs, trx.total, trx.name, trx.payment],
			(err, result) => {
				if (err) {
					console.error("error querying database: ", err);
					reject(err);
					return;
				}
				resolve(result.id);
			}
		);
	});
};
const insertNewTransactionWithoutMenuId = async (trx) => {
	return new Promise((resolve, reject) => {
		database.execute(
			"INSERT INTO `transaksi`(`total`, `name`, payment) VALUES (?,?,?)",
			[trx.total, trx.name, trx.payment],
			(err, result) => {
				if (err) {
					console.error("error querying database: ", err);
					reject(err);
					return;
				}
				resolve(result.id);
			}
		);
	});
};

module.exports.insertNewTransaction = insertNewTransaction;
module.exports.insertNewTransactionWithoutMenuId =
	insertNewTransactionWithoutMenuId;
