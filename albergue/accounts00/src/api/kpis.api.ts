import axios from "axios";

const kpisApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getKpis = async (jwt: string) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  };
  const response = await kpisApi.get(`/kpis/data/`, config);
  console.log('response.data:', response.data)
  return response.data;
};