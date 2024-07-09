import { Url } from "../entities/Url";
import UrlResolver from "../resolvers/UrlResolver";


type PartialUrl = Partial<Url>;

const mockUrl: PartialUrl = { 
  id: '123e4567-e89b-12d3-a456-426614174001', 
  name: 'Test URL', 
  path: 'https://example.com' 
};
const mockUrls: PartialUrl[] = [mockUrl];

describe('Unit Test Url Resolver', () => {
  let urlResolver: UrlResolver;

  beforeAll(async () => {
    urlResolver = new UrlResolver();
  });

  afterAll(async () => {
    jest.restoreAllMocks();
  });

  it('Query urls should return an array of Url', async () => {
    jest.spyOn(Url, 'find').mockImplementation(() => Promise.resolve(mockUrls as Url[]));
    const result = await urlResolver.urls();
    expect(result).toEqual(mockUrls);
  });

  it('Query urls should throw an error when fetching urls fails', async () => {
    jest.spyOn(Url, 'find').mockRejectedValue(new Error('Internal server error'));
    await expect(urlResolver.urls()).rejects.toThrow('Internal server error');
  });

  it('Query url should return an Url', async () => {
    jest.spyOn(Url, 'findOneByOrFail').mockImplementation(() => Promise.resolve(mockUrl as Url));
    const result = await urlResolver.url('123e4567-e89b-12d3-a456-426614174001');
    expect(result).toEqual(mockUrl);
  });

  it('Query url should throw an error when fetching url fails', async () => {
    jest.spyOn(Url, 'findOneByOrFail').mockRejectedValue(new Error('Internal server error'));
    await expect(urlResolver.url('123e4567-e89b-12d3-a456-426614174001'))
      .rejects.toThrow('Internal server error');
  });
});