import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function deleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    async function fetchData() {
      const response = await fetch("/api/products?id=" + id);
      const data = await response.json();
      setProductInfo(data);
    }
    fetchData();
  }, [id]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await fetch("/api/products?id=" + id, {
      method: "DELETE",
    });

    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete product &nbsp;"{productInfo?.title}"?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
