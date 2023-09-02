import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  if (!images.length) {
    return;
  }
  return (
    <GalleryList>
      <ImageGalleryItem imagesItems={images} />
    </GalleryList>
  );
};
