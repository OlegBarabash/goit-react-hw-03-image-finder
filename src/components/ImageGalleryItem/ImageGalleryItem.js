import { ImageItem, StyledImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imagesItems }) => {
  return imagesItems.map(({ id, webformatURL, largeImageURL }) => (
    <ImageItem key={id}>
      <StyledImage src={webformatURL} />
    </ImageItem>
  ));
};
