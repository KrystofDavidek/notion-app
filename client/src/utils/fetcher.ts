export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((response) => response.json());
