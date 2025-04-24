import React from "react";

const ImageModal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose} // close when clicking outside the image
    >
      <div onClick={(e) => e.stopPropagation()}>
        <img
          src={imageSrc}
          alt="Preview"
          className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
};

export default ImageModal;
