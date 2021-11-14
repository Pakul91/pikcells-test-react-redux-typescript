const fetchData = jest.fn(() => {
  return Promise.resolve({
    status: "",
    data: {},
  });
});

export default fetchData;
