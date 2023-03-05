const { insertNewTransaction } = require("../store/transaction");

const insertTransactionData = async (saran) => {
	const resp = await insertNewTransaction(saran).then((res) =>
		console.log(res)
	);
	return resp;
};

module.exports.insertTransactionData = insertTransactionData;
