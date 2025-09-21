import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";
const emailRe = /^\S+@\S+\.\S+$/;
const phoneRe = /^\d{10}$/;

export default function ContactForm({ refresh }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);


  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.email.trim() || !emailRe.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim() || !phoneRe.test(form.phone))
      e.phone = "Phone must be 10 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const res = await axios.post(`${API_URL}/contacts`, form);
      if (res.data.success) {
        refresh();
        setForm({ name: "", email: "", phone: "" });
        setErrors({});
      } else {
        setServerError(res.data.message || "Failed to add contact");
      }
    } catch (err) {
      console.error("Add error:", err);
      setServerError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Add Contact</h2>

      {serverError && <p className="err">{serverError}</p>}

      <div className="field">
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChangeHandler}
          required
        />
        {errors.name && <small className="err">{errors.name}</small>}
      </div>

      <div className="field">
        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={onChangeHandler}
          required
        />
        {errors.email && <small className="err">{errors.email}</small>}
      </div>

      <div className="field">
        <label>Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={onChangeHandler}
          required
        />
        {errors.phone && <small className="err">{errors.phone}</small>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
