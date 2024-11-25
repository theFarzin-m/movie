import React from "react";

function ToggleBtn({ children, isOpen, setIsOpen }) {
  return (
    <>
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </>
  );
}

function ErrorMessage({ message }) {
  return <div className="error">❗{message}❗</div>;
}

function Loading() {
  return <div className="loading"> Loding... </div>;
}

export { Loading, ToggleBtn, ErrorMessage };
