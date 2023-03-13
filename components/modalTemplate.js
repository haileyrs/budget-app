export default function Modal({ children, title, control }) {
  return (
    <>
      <input type="checkbox" id={control} className="modal-toggle" />
      <div className="modal modal-primary">
        <div className="modal-box">
          <div className="modal-headline pb-4">
            <article className="prose">
              <h2>{title}</h2>
            </article>
            <label
              id={control}
              htmlFor={control}
              className="btn btn-circle btn-ghost absolute right-2 top-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </>
  );
}