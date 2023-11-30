// components/ImageContainer.tsx
import React from 'react';

interface ImageContainerProps {
  children: React.ReactNode;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ children }) => {
  return <div className="image-container">{children}</div>;
};

export default ImageContainer;
