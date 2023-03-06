const {
	insertMenu,
	getMenuById,
	getAllMenu,
	updateMenu,
	deleteMenu,
} = require("../handler/menu");
const { insertTransactionData } = require("../handler/transaction");

const router = require("express").Router();

router.get("/ping", (_, res) => {
	res.json({
		message: "pong",
		serverTimestamp: new Date(),
	}).status(200);
});

router.post("/menu", async (req, res, next) => {
	try {
		const menu = req.body;
		const resp = await insertMenu(menu);

		res.json({
			insertedId: resp,
		}).status(200);
	} catch (e) {
		next(e);
	}
});

router.put("/menu/:id", async (req, res, next) => {
	try {
		const menu = req.body;
		const id = req.params["id"];
		const resp = await updateMenu(id, menu);

		res.json({
			data: resp,
		}).status(200);
	} catch (e) {
		next(e);
	}
});

router.delete("/menu/:id", async (req, res, next) => {
	try {
		const id = req.params["id"];
		const deleteData = await deleteMenu(id);
		if (deleteData.data == "not found") {
			return res.status(404).json(deleteData);
		}
		return res.json(deleteData).status(200);
	} catch (e) {
		next(e);
	}
});

router.get("/menu/:id", async (req, res, next) => {
	try {
		const queryId = req.params["id"];
		const menu = await getMenuById(queryId);

		return res.json(menu).status(200);
	} catch (e) {
		next(e);
	}
});

router.get("/ordernow", async (req, res, next) => {
	try {
		const ordernow = await getAllMenu();
		return res
			.json({
				data: ordernow,
			})
			.status(200);
	} catch (e) {
		next(e);
	}
});

router.post("/transaction", async (req, res, next) => {
	try {
		const trx = req.body;
		const resp = await insertTransactionData(trx);

		res.json({
			insertedId: resp,
		}).status(200);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
