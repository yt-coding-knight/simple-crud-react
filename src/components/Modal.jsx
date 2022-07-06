import { useState } from "react";
import Input from "./Input";

export default function Modal() {
  const [modal, setModal] = useState("");

  function toggleModal() {
    setModal((val) => (val === "modal-open" ? "" : "modal-open"));
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
          <form className="pt-6 space-y-6">
            <div className="form-control">
              <Input
                type="text"
                name="title"
                onChange={""}
                value={""}
                placeholder="Title"
              />
            </div>
            <div className="form-control">
              <Input
                type="text"
                name="author"
                onChange={""}
                value={""}
                placeholder="Author"
              />
            </div>
            <div className="form-control">
              <Input
                type="text"
                name="year"
                onChange={""}
                value={""}
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
