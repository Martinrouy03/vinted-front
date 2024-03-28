const ModalLogin = ({ setVisibility }) => {
  return (
    <div className="modal-root">
      <button
        onClick={() => {
          setVisibility([false, false]);
        }}
      >
        X
      </button>
      <p>Je suis la Modal "Connect"</p>
    </div>
  );
};
export default ModalLogin;
