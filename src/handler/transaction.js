const { insertNewTransaction } = require("../store/transaction");

const insertTransactionData = async (menu) => {
	const resp = await insertNewTransaction(menu).then((res) =>
		console.log(res)
	);
	return resp;
};

module.exports.insertTransactionData = insertTransactionData;
