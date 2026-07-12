import axios from "axios";

const API_TIMEOUT = 8000;

export async function apiGet<T = any>(url: string): Promise<T> {
  const res = await axios.get(url, { timeout: API_TIMEOUT });
  return res.data;
}
