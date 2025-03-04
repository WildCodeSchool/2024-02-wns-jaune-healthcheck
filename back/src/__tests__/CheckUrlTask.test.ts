import axios from "axios";
import { Url } from "../entities/Url";
import { History } from "../entities/History";
import { CheckFrequency } from "../entities/CheckFrequency";
import dataSource from "../database/dataSource";
import checkUrl from "../schedulers/tasks/checkUrlTask";
import Semaphore from "../thread/Semaphore";
import handleAxiosErrorResponse from "../utilities/handleAxiosErreurResponse";


jest.mock("../entities/History");
jest.mock("../database/dataSource");
jest.mock("../utilities/handleAxiosErreurResponse");

type PartialUrl = Partial<Url>;
type PartialCheckFrequency = Partial<CheckFrequency>;

const mockCheckFrequency: PartialCheckFrequency = {
  id: "123e4567-e89c-12d3-a456-426614174001",
  interval: "Jour",
  created_at: new Date(),
};
const mockUrls: PartialUrl[] = [
  { 
    id: "123e4567-e89b-12d3-a456-426614174000", 
    path: "http://example.com", 
    checkFrequency: mockCheckFrequency as CheckFrequency,
  }
];

const mockedHandleAxiosErrorResponse = handleAxiosErrorResponse as jest.MockedFunction<typeof handleAxiosErrorResponse>;

describe("Unit test checkUrl", () => {
  const semaphoreAcquireSpy = jest.spyOn(Semaphore.prototype, "acquire");
  const semaphoreReleaseSpy = jest.spyOn(Semaphore.prototype, "release");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should acquire and release the semaphore", async () => {
    await checkUrl();

    expect(semaphoreAcquireSpy).toHaveBeenCalled();
    expect(semaphoreReleaseSpy).toHaveBeenCalled();
  });

  it("should fetch URLs with the specified interval", async () => {
    jest.spyOn(Url, "find").mockImplementation(() =>
      Promise.resolve(mockUrls as Url[]),
    );

    await checkUrl("Jour");

    expect(Url.find).toHaveBeenCalledWith({
      where: {
        checkFrequency: {
          interval: "Jour",
        },
      },
    });
  });

  it("should handle axios errors and call handleAxiosErrorResponse", async () => {

    jest.spyOn(Url, "find").mockImplementation(() =>
      Promise.resolve(mockUrls as Url[]),
    );
    axios.get = jest.fn().mockRejectedValue({ code: "ECONNABORTED" });
    mockedHandleAxiosErrorResponse.mockReturnValue({ 
      data: "error", status: 500, headers: { "content-type": "" } 
    });

    await checkUrl("Jour");

    expect(mockedHandleAxiosErrorResponse).toHaveBeenCalledWith("ECONNABORTED");
  });

  it("should create a new history entry and update lastCheckDate", async () => {
    jest.spyOn(Url, "find").mockImplementation(() =>
      Promise.resolve(mockUrls as Url[]),
    );
    axios.get = jest.fn().mockResolvedValue({ 
      data: "response", 
      status: 200, 
      headers: { "content-type": "application/json" } }
    );
    History.create = jest.fn().mockReturnValue({ save: jest.fn().mockResolvedValue(undefined) });
    dataSource.query = jest.fn().mockResolvedValue(undefined);

    await checkUrl("Jour");

    expect(History.create).toHaveBeenCalledWith({
      url: mockUrls[0],
      response: JSON.stringify("response"),
      status_code: 200,
      content_type: "application/json",
    });
    expect(dataSource.query).toHaveBeenCalledWith(
      `UPDATE url SET "lastCheckDate" = $1 WHERE id = $2`,
      [expect.any(Date), mockUrls[0].id]
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});