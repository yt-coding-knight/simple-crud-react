import { useState, useEffect, useRef } from "react";
import {
  addManga,
  deleteFile,
  updateManga,
  uploadFile,
} from "../util/dataManga";
import Input from "./Input";

export default function Modal({
  setManga,
  isActive,
  setActive,
  dataEdit,
  setDataEdit,
  isLoading,
  setLoading,
}) {
  const [modal, setModal] = useState("");
  const [inputs, setInputs] = useState({});
  const [imgPreview, setImgPreview] = useState("");
  const inputFile = useRef(null);

  function toggleModal() {
    setModal((val) => (val === "modal-open" ? "" : "modal-open"));
    setActive(false);
    if (!isActive) {
      setInputs({});
    }
  }

  function handleFile() {
    const imgPath = URL.createObjectURL(inputFile.current.files[0]);
    setImgPreview(imgPath);
  }

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((val) => ({
      ...val,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (isActive) {
      setInputs(dataEdit[0]);
      return toggleModal();
    }
    return;
  }, [isActive]);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    if (dataEdit.length > 0) {
      const newValue = {
        title: inputs.title,
        author: inputs.author,
        year: inputs.year,
        imgUrl: dataEdit[0].imgUrl,
        createdAt: dataEdit[0].createdAt,
      };
      if (inputFile.current.value) {
        const [_, imgUrl] = await Promise.all([
          deleteFile(dataEdit[0].imgUrl),
          uploadFile(inputFile.current.files[0]),
        ]);
        newValue.imgUrl = imgUrl;
        inputFile.current.value = "";
        setImgPreview("");
      }
      await updateManga(dataEdit[0].id, newValue);
      setManga((val) => {
        const index = val.findIndex((item) => item.id === dataEdit[0].id);
        val[index] = { id: dataEdit[0].id, ...newValue };
        return val;
      });
      setLoading(false);
      setDataEdit("");
      return setModal("");
    }
    const imgUrl = await uploadFile(inputFile.current.files[0]);
    await addManga(inputs, imgUrl);

    inputFile.current.value = "";
    setImgPreview("");
    setLoading(false);
    setInputs("");
    return setModal("");
  }

  return (
    <>
      <label onClick={toggleModal} className="btn btn-primary">
        Add Manga
      </label>

      <div className={`modal ${modal}`}>
        <div className="modal-box relative">
          <label
            onClick={toggleModal}
            className="absolute font-bold right-4 top-2 cursor-pointer"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit} className="pt-6 space-y-6">
            <div className="form-control">
              <Input
                type="text"
                name="title"
                onChange={handleInput}
                value={inputs.title || ""}
                placeholder="Title"
              />
            </div>
            <div className="form-control">
              <Input
                type="text"
                name="author"
                onChange={handleInput}
                value={inputs.author || ""}
                placeholder="Author"
              />
            </div>
            <div className="form-control">
              <Input
                type="text"
                name="year"
                onChange={handleInput}
                value={inputs.year || ""}
                placeholder="Year"
              />
            </div>
            <div className="form-control">
              <input type="file" onChange={handleFile} ref={inputFile} />
            </div>
            {imgPreview.length > 0 && (
              <img className="h-52" src={imgPreview} alt="preview" />
            )}
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-md bg-blue-500 hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
