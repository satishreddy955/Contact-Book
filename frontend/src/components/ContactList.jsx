import React from "react";

export default function ContactList({ contacts, onDelete, loading }) {
  if (loading) return <p>Loading contacts...</p>;
  if (!contacts?.length) return <p>No contacts found.</p>;

  return (
    <div className="list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Added</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{new Date(c.createdAt).toLocaleString()}</td>
              <td>
                <button className="del" onClick={() => onDelete(c._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
