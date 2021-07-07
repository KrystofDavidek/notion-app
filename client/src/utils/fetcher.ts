import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = "application/json";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const postFetcher = (url: string, body?: string) => axios.post(url, body).then((res) => res.data);

export const putFetcher = (url: string, body?: string) => axios.put(url, body).then((res) => res.data);

export const deleteFetcher = (url: string) => axios.delete(url).then((res) => res.data);
