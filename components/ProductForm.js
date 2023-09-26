import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || '');

  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  async function createProduct(event) {
    event.preventDefault();

    const data = { title, description, price, images };

    if (_id) {
      //update
      await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, _id }),
      });
    } else {
      //create
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    router.push("/products");
  }

  function uploadImages(event){
    const files = event.target?.files;

    if(files?.length>0) {
      setIsUploading(true);
      const imgData = new FormData();
      for(const file of files){
        imgData.append('file', file)
      }
      async function imgUpload(){
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
          },
          body: imgData,
        });
        const data = await response.json();
        //console.log(data);
        setImages(oldImages => {
          return [...oldImages, ...data.links]
        });
      }
      imgUpload();
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images){
    setImages(images)
  }

  return (
    <>
      <form onSubmit={createProduct}>
        <label>Product name</label>
        <input
          type="text"
          placeholder="Product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>Images</label>
        <div className="mb-2 flex flex-wrap gap-1">
          <ReactSortable className="flex flex-wrap gap-1" list={images} setList={updateImagesOrder}>
            {images?.length>0 && images.map(link=>(
            <div key={link} className="h-24">
              <img src={link} alt='' className="rounded-lg"/>
            </div>
          ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 p-1 flex items-center">
              <Spinner/>
            </div>
          )}
          <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
            <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            </div>
            <div>
              Upload
            </div>
            <input type="file" onChange={uploadImages} className="hidden"/>
          </label>
        </div>

        <label>Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Price (in Rupees)</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </>
  );
}
