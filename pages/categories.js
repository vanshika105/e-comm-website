import Layout from "@/components/Layout";
import { useState } from "react";

export default function CategoriesPage() {
  const [name, setName] = useState("");

  async function saveCategory(event) {
    event.preventDefault();
      //create
      await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
      });
    setName('');
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New category name</label>
      <form onSubmit={saveCategory} className="flex gap-2">
        <input
          className="mb-0"
          type="text"
          placeholder="Category name"
          onChange={(ev) => setName(ev.target.value)}
          value={name}
        />
        <button className="btn-primary py-1">Save</button>
      </form>
    </Layout>
  );
}
