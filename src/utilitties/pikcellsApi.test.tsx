import fetchData from "./pikcellsAPI";
jest.mock("./pikcellsAPI");

//  Helper function for Typing mocked functions. From :
//  https://instil.co/blog/typescript-testing-tips-mocking-functions-with-jest/
function mockFunction<T extends (...args: any[]) => any>(
  fn: T
): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>;
}

const mockedResponse = {
  layers: [
    {
      order: 0,
      items: [
        {
          order: 1,
          name: "Almost Silly Silver",
          imgSrc: "BWK.jpg",
        },
        {
          order: 0,
          name: "Typically Pretty Blue",
          imgSrc: "hk9.jpg",
        },
        {
          order: 2,
          name: "Terribly Honest Black",
          imgSrc: "aDn.jpg",
        },
      ],
    },
    {
      order: 1,
      items: [
        {
          order: 0,
          name: "Really Eloquent Blue",
          imgSrc: "0Og.png",
        },
        {
          order: 1,
          name: "Extremely Honest Silver",
          imgSrc: "2Ks.png",
        },
        {
          order: 2,
          name: "Terribly Confident Pink",
          imgSrc: "L99.png",
        },
      ],
    },
    {
      order: 2,
      items: [
        {
          order: 2,
          name: "Too Melodic Silver",
          imgSrc: "jeb.png",
        },
        {
          order: 0,
          name: "Never Generous Silver",
          imgSrc: "VRC.png",
        },
        {
          order: 1,
          name: "Terribly Juicy Green",
          imgSrc: "58Z.png",
        },
      ],
    },
  ],
  default_configuration: [2, 1, 0],
};

describe("fetching data from API", () => {
  const fetchDataMock = mockFunction(fetchData);

  it("should correctly fetch data", async () => {
    fetchDataMock.mockResolvedValueOnce(mockedResponse);

    const expectedData = mockedResponse;

    const actualData = await fetchData();

    expect(actualData).toEqual(expectedData);
  });

  it.todo("should throw error when API call rejects ");
});
