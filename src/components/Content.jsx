import { useEffect, useState } from "react";
import {
  deleteFile,
  deleteManga,
  getManga,
  getSingleManga,
} from "../util/dataManga";
import Modal from "./Modal";

export default function Content() {
  const [manga, setManga] = useState([]);
  const [dataEdit, setDataEdit] = useState("");
  const [isActive, setActive] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getManga(setManga);
    return;
  }, [isLoading]);

  async function rmManga(id, imgUrl) {
    await Promise.all([deleteFile(imgUrl), deleteManga(id)]);
    setManga((val) => val.filter((item) => item.id !== id));
  }

  async function upManga(id) {
    const singleManga = [await getSingleManga(id)];
    setDataEdit(singleManga);
    setActive(true);
  }

  return (
    <main className="pt-16">
      <div className="pt-8 pl-8">
        <Modal
          setManga={setManga}
          isActive={isActive}
          setActive={setActive}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
          isLoading={isLoading}
          setLoading={setLoading}
        />
      </div>
      <section className="p-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {manga?.map((item) => (
          <div key={item.id} className="card shadow-md">
            <figure className="relative max-h-52 overflow-hidden">
              <img src={item.imgUrl} alt="cover" />
            </figure>
            <div className="card-body">
              <div className="card-title items-start flex-col">
                <h1>{item.title}</h1>
                <small>Release: {item.year}</small>
              </div>
              <p>Author: {item.author}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => rmManga(item.id, item.imgUrl)}
                  className="btn btn-sm bg-red-500 hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => upManga(item.id)}
                  className="btn btn-sm bg-blue-500 hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
