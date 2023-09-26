import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const [productInfo, setProductInfo] =useState(null);
  const router = useRouter();
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

  //console.log(productInfo);

  return (
    <Layout>
        <h1>Edit Product</h1>
      {productInfo && <ProductForm {...productInfo}/>}
    </Layout>
  );
}
