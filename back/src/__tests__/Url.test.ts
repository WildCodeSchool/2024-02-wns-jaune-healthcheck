import dataSource from "../database/dataSource";
import { Url } from "../entities/Url";


describe('Integration Test Url Entity', () => {

  beforeAll(async () => {
    await dataSource.initialize();
  });
  afterAll(async () => {
    await dataSource.destroy();
  })

  it('find method should return a list of Url', async () => {
    const urls = await Url.find();

    // Check if the result is an array
    expect(Array.isArray(urls)).toBeTruthy();

    // Check if values are instances of Url
    urls.forEach(url => {
      expect(url).toBeInstanceOf(Url);
    });
  });

  it('findOneByOrFail method should return a single Url', async () => {
    const url = await Url.findOneByOrFail({
      id: "737fbb42-1dd9-40c5-a29e-604407a7bc7b"
    });
    expect(url).toBeInstanceOf(Url);
  });
});