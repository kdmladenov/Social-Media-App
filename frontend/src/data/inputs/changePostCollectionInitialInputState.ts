const changePostCollectionInitialInputState = (collections: string[]) => {
  return {
    collection: {
      formElement: 'select',
      label: 'Select New Collection',
      options: collections.sort().map((collection) => ({
        label: `${collection}`,
        value: `${collection}`
      })),
      placeholder: 'Select Collection ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    }
  };
};
export default changePostCollectionInitialInputState;
