import { useEffect, useState} from "react";
import axios from "axios";
const baseURL = 'http://localhost:3000/';

const useFetch = (endpoint) => {
  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${baseURL}${endpoint}`);
        setData(response.data);
      } catch (error) {
        console.log('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [endpoint]);

  return { data, loading }
}