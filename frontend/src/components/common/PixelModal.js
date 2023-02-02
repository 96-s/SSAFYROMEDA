const PixelModal = () => {
  return (
    <div>
      <section>
        <dialog className="nes-dialog is-rounded" id="dialog-rounded">
          <form method="dialog">
            <p className="title">Rounded dialog</p>
            <p>Alert: this is a dialog.</p>
            <menu className="dialog-menu">
              <button className="nes-btn">Cancel</button>
              <button className="nes-btn is-primary">Confirm</button>
            </menu>
          </form>
        </dialog>
      </section>
    </div>
  );
};

export default PixelModal;
