import Modal from "./Modal";

export default function Content() {
  return (
    <main className="pt-16">
      <div className="pt-8 pl-8">
        <Modal />
      </div>
      <section className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="card shadow-md">
          <div className="card-body">
            <div className="card-title items-start flex-col">
              <h1>Title</h1>
              <small>Release: 2020</small>
            </div>
            <p>Author: your</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm bg-red-500 hover:bg-red-700">
                Delete
              </button>
              <button className="btn btn-sm bg-blue-500 hover:bg-blue-600">
                Edit
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
