import {
  sortByOrderProp,
  formatItem,
  formatLayer,
  formatData,
} from "./helpers";

describe("sortByOrderProp function", () => {
  const itemA = {
    order: 0,
    name: "Never Generous Silver",
    imgSrc: "VRC.png",
  };

  const itemB = {
    order: 1,
    name: "Terribly Juicy Green",
    imgSrc: "58Z.png",
  };

  const itemC = {
    order: 0,
    name: "Terribly Juicy Green",
    imgSrc: "58Z.png",
  };
  it("should return -1 if 1st argument ordred property is smaller then seconds ", () => {
    expect(sortByOrderProp(itemA, itemB)).toBe(-1);
  });

  it("should return 1 if 1st argument ordred property is bigger then seconds ", () => {
    expect(sortByOrderProp(itemB, itemA)).toBe(1);
  });

  it("should return 0 if 1st argument ordred property is equal to seconds ", () => {
    expect(sortByOrderProp(itemA, itemC)).toBe(0);
  });
});

describe("formatItem function", () => {
  const itemA = {
    order: 0,
    name: "Never Generous Silver",
    imgSrc: "VRC.png",
  };

  it("should return item with active property", () => {
    const expectedItem = {
      order: 0,
      name: "Never Generous Silver",
      imgSrc: "VRC.png",
      active: false,
    };

    expect(formatItem(itemA, 1)).toEqual(expectedItem);
  });

  it("should return item with active property = true if item order property match indexOfActive argument ", () => {
    const expectedItem = {
      order: 0,
      name: "Never Generous Silver",
      imgSrc: "VRC.png",
      active: true,
    };

    expect(formatItem(itemA, 0)).toEqual(expectedItem);
  });
});

describe("formatLayer funtion", () => {
  const layerA = {
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
  };

  it("should return layer with formated items array sorted in ascending order", () => {
    const expectedLayer = {
      order: 0,
      items: [
        {
          order: 0,
          name: "Typically Pretty Blue",
          imgSrc: "hk9.jpg",
          active: false,
        },
        {
          order: 1,
          name: "Almost Silly Silver",
          imgSrc: "BWK.jpg",
          active: true,
        },

        {
          order: 2,
          name: "Terribly Honest Black",
          imgSrc: "aDn.jpg",
          active: false,
        },
      ],
    };

    expect(formatLayer(layerA, 1)).toEqual(expectedLayer);
  });
});

describe("formatData function", () => {
  const data = {
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
        ],
      },
      {
        order: 2,
        items: [
          {
            order: 1,
            name: "Terribly Juicy Green",
            imgSrc: "58Z.png",
          },
          {
            order: 0,
            name: "Never Generous Silver",
            imgSrc: "VRC.png",
          },
        ],
      },
    ],
    default_configuration: [1, 1, 0],
  };

  it("should return formated data", () => {
    const expecteData = {
      layers: [
        {
          order: 0,
          items: [
            {
              order: 0,
              name: "Typically Pretty Blue",
              imgSrc: "hk9.jpg",
              active: false,
            },
            {
              order: 1,
              name: "Almost Silly Silver",
              imgSrc: "BWK.jpg",
              active: true,
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
              active: false,
            },
            {
              order: 1,
              name: "Extremely Honest Silver",
              imgSrc: "2Ks.png",
              active: true,
            },
          ],
        },
        {
          order: 2,
          items: [
            {
              order: 0,
              name: "Never Generous Silver",
              imgSrc: "VRC.png",
              active: true,
            },
            {
              order: 1,
              name: "Terribly Juicy Green",
              imgSrc: "58Z.png",
              active: false,
            },
          ],
        },
      ],
      default_configuration: [1, 1, 0],
    };

    expect(formatData(data)).toEqual(expecteData);
  });
});
