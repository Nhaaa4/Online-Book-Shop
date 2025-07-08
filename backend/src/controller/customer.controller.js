import db from "../db/models/index.js";

const { Customer } = db

export async function login(req, res) {
    const { name, pass } = req.body

    if (name === 'Panha' && pass === '1234')
        res.json({ success: true, message: "Login"})
    res.json({ success: false, message: "Failed"})
}