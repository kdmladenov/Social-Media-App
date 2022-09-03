export default {
  images: (value: string) =>
    Array.isArray(value) && value.every((image) => typeof image === 'string')
};
