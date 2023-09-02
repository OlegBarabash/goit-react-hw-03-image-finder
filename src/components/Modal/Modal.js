import * as basicLightbox from 'basiclightbox';

export const Modal = ({ picture }) => {
  const instance = basicLightbox.create(`
    <img src=${picture} width="800" height="600">
`);

  instance.show();
  return instance;
};
