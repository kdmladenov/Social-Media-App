import PostImageType from '../types/PostImageType';

const getImagesClass = (images: PostImageType[]) =>
  images?.length === 1
    ? ''
    : images?.length === 2
    ? 'two'
    : images?.length === 2
    ? 'two'
    : images?.length === 3
    ? 'three'
    : images?.length === 4
    ? 'four'
    : 'more';

export default getImagesClass;
