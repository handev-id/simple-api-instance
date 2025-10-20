export type FetcherParams<T, P> = {
  api: (props: T) => Promise<P | null>;
  onSuccess?: (data: Awaited<P> | null, props: T) => void;
  onFail?: (e: unknown, props: T) => void;
  initial?: P | null;
};

export type ProcessParams = {
  reset: boolean;
  remember: boolean;
  concat: boolean | string;
};

export type UseApiReturn<T, P> = {
  data: P | null | undefined;
  isLoading: boolean;
  savedProps?: T;
  process: (
    ...props: Parameters<(props: T) => Promise<P | null>>
  ) => Promise<void>;
  withoutReset: (before?: ProcessParams) => {
    process: UseApiReturn<T, P>["process"];
    remember: ReturnType<UseApiReturn<T, P>["remember"]>;
    concat: ReturnType<UseApiReturn<T, P>["concat"]>;
  };
  remember: (before?: ProcessParams) => {
    process: UseApiReturn<T, P>["process"];
    withoutReset: ReturnType<UseApiReturn<T, P>["withoutReset"]>;
    concat: ReturnType<UseApiReturn<T, P>["concat"]>;
  };
  concat: (before?: ProcessParams) => (
    keyToConcat?: keyof P | null,
    _before?: ProcessParams
  ) => {
    process: UseApiReturn<T, P>["process"];
    withoutReset: ReturnType<UseApiReturn<T, P>["withoutReset"]>;
    remember: ReturnType<UseApiReturn<T, P>["remember"]>;
  };
};

export declare function useApi<T, P>(
  params: FetcherParams<T, P>
): UseApiReturn<T, P>;
