import { Example } from "../models/example";
import service from "../service";

export function exampleApi({
  additionalParams,
}: {
  additionalParams: string;
}): Promise<Example[]> {
  return service
    .get("/example", {
      params: {
        page: 1,
        limit: 20,
        additionalParams,

        // Or another query parameters
      },
    })
    .then((response) => response.data);
}

export function exampleStoreApi(body: Example): Promise<Example[]> {
  return service.post("/example", body).then((response) => response.data);
}
