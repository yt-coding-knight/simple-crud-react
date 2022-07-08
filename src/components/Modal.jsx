import { useState, useEffect } from "react";
import Input from "./Input";

export default function Modal({
  setManga,
  isActive,
  setActive,
  dataEdit,
  setDataEdit,
}) {
  const [modal, setModal] = useState("");
  const [inputs, setInputs] = useState({});

  function toggleModal() {
    setModal((val) => (val === "modal-open" ? "" : "modal-open"));
    setActive(false);
    if (!isActive) {
      setInputs({});
    }
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

  function handleSubmit(e) {
    e.preventDefault();

    if (dataEdit.length > 0) {
      setManga((val) => {
        const index = val.findIndex((item) => item.id === dataEdit[0].id);
        const newValue = {
          id: inputs.id,
          title: inputs.title,
          author: inputs.author,
          year: inputs.year,
        };
        val[index] = newValue;
        return val;
      });
      setDataEdit("");
      return setModal("");
    }
    setManga((old) => {
      return [
        ...old,
        {
          id: +new Date(),
          title: inputs.title,
          author: inputs.author,
          year: inputs.year,
        },
      ];
    });

    setInputs("");
    setModal("");
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
            <button
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
