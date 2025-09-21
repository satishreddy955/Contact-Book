import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

const emailIsValid = (email) => /^\S+@\S+\.\S+$/.test(email);
const phoneIsValid = (phone) => /^\d{10}$/.test(phone);

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success:false, message: "Name, email and phone required" });
    }
    if (!emailIsValid(email)) {
      return res.status(400).json({ success:false, message: "Invalid email format" });
    }
    if (!phoneIsValid(phone)) {
      return res.status(400).json({ success:false, message: "Phone must be 10 digits" });
    }

    const existingPhone = await Contact.findOne({ phone });
    if (existingPhone) {
      return res.status(409).json({ success:false, message: "Phone number already exists" });
    }

    const newContact = new Contact({ name, email, phone });
    const saved = await newContact.save();

    // ✅ Return success flag + data
    return res.status(201).json({ success: true, data: saved });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message: "Server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || "10", 10)));
    const q = req.query.q ? req.query.q.trim() : null;

    const filter = {};
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    }

    const total = await Contact.countDocuments(filter);
    const pages = Math.ceil(total / limit);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return res.json({ contacts, total, page, pages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Contact not found" });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
