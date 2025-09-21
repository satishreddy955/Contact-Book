import React, { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Pagination from "./components/Pagination";
import axios from "axios";


const API_URL = "https://contact-book-vh02.onrender.com/api";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");


  const fetchContacts = async (currentPage = 1, search = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/contacts`, {
        params: { page: currentPage, limit, q: search },
      });
      setContacts(res.data.contacts || []);
      setPage(res.data.page || 1);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Delete contact?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      fetchContacts(page, query);
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.response?.data?.message || "Failed to delete contact");
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = (e) => {
    e.preventDefault();
    fetchContacts(1, query);
    setQuery("");  
  };

  return (
    <div className="container">
      <h1>📖 Contact Book</h1>

      {error && <p className="err">{error}</p>}

      <div className="top-row">
        <ContactForm refresh={() => fetchContacts(1, query)} />

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search name, email, or phone"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>


      <ContactList
        loading={loading}
        contacts={contacts}
        onDelete={handleDelete}
      />


      <Pagination
        page={page}
        pages={totalPages}
        onPageChange={(newPage) => fetchContacts(newPage, query)}
      />
    </div>
  );
}
