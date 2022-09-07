import PostImageType from '../types/PostImageType';

const getPostImagesClass = (images: PostImageType[] | string[]) =>
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

export default getPostImagesClass;
