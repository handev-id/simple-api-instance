## Installation

```ts
npm install @handev-id/simple-api-instance
```

## 1. Quick Start

Run this command in your terminal:

```ts
npx simple-api-instance
```

This will automatically generate a ready-to-use /api folder inside your src directory.

```ts
src/
 └── api/
     ├── service.ts
     ├── models/
     │   └── example.ts
     └── endpoints/
         └── example.ts

```

---

## 2. API Instance

All API requests are handled through a single centralized Axios instance located at src/api/service.ts:

```ts
// src/api/service.ts
import axios from "axios";

const service = axios.create({
  baseURL: "https://example.com/api",
});

export default service;
```

## 3. Create Model

Define TypeScript models inside src/apis/models/:

```ts
// src/apis/models/example.ts
export type Example = {
  id: number;
  name: string;
};
```

---

## 4. Create Endpoint

All endpoint functions must use the centralized service.ts,
and be placed inside src/apis/endpoints/.

```ts
// src/apis/endpoints/service.ts
import { Example } from "../models/example";
import service from "../service";

export function exampleIndexApi({
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
```

## 5. Usage Example

### GET Method

```tsx
// src/App.tsx
import { useApi } from "@handev-id/simple-api-instance";
import { exampleIndexApi } from "./api/endpoints/example.ts";
import { AxiosError } from "axios";

const exampleGet = useApi({
  api: exampleIndexApi,
  onSuccess: () => {
    alert("Success Get Data!");
  },
  onFail: (e) => {
    const error = e as AxiosError;
    console.log(error);
  },
});

useEffect(() => {
  exampleGet.process({});
}, []);

console.log(exampleGet.data);
```

### POST Method

```tsx
// src/App.tsx
import { useApi } from "@handev-id/simple-api-instance";
import { exampleStoreApi } from "./api/endpoints/example.ts";
import { Example } from "./api/models/example.ts";
import { AxiosError } from "axios";

const exampleStore = useApi({
  api: exampleStoreApi,
  onSuccess: () => {
    alert("Success Store Data!");
  },
  onFail: (e) => {
    const error = e as AxiosError;
    console.log(error);
  },
});

const onSubmit = (data: Example) => {
  exampleStore.process(data);
};

console.log(exampleStore.data);
```
