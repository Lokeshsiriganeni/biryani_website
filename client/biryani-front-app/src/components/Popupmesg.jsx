function Popupmesg(props) {
  const { message, onClose } = props;
  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Call Us</h3>
        <p>
          Call us at: <strong>{message}</strong>
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popupmesg;
