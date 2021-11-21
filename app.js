const express = require("express");
const path = require("path");
const { v4 } = require("uuid"); // for create id
const app = express();

let CONTACTS = [{ id: v4(), name: "Alexandr", value: "some information", marked: false }];

app.use(express.json());

// This must be in bottom
// GET
app.get("/api/contacts", (req, res) => {
	setTimeout(() => {
		res.status(200).json(CONTACTS);
	}, 1000);
});
// POST
app.post("/api/contacts", (req, res) => {
	const contact = { ...req.body, id: v4(), marked: false };
	CONTACTS.push(contact);
	res.status(201).json(contact);
});
// DELETE
app.delete("/api/contacts/:id", (req, res) => {
	CONTACTS = CONTACTS.filter((el) => el.id !== req.params.id);
	res.status(200).json({ message: "Contact was delete" });
});
// PUT
app.put("/api/contacts/:id", (req, res) => {
	const idx = CONTACTS.findIndex((el) => el.id === req.params.id);
	CONTACTS[idx] = req.body;
	res.json(CONTACTS[idx]);
});

app.use(express.static(path.resolve(__dirname, "client")));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "index.html"));
});
app.listen(4000);
