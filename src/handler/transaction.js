const {
	insertNewTransaction,
	insertNewTransactionWithoutMenuId,
} = require("../store/transaction");

const insertTransactionData = async (menu) => {
	const resp = await insertNewTransaction(menu).then((res) =>
		console.log(res)
	);
	return resp;
};
const insertTransactionDataWithoutId = async (menu) => {
	const resp = await insertNewTransactionWithoutMenuId(menu).then((res) =>
		console.log(res)
	);
	return resp;
};

module.exports.insertTransactionData = insertTransactionData;
module.exports.insertTransactionDataWithoutId = insertTransactionDataWithoutId;
