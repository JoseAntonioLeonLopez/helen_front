import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetch(endpoint) {
    const url='http://localhost:8081/helen/' + endpoint;
    const[data, setData]= useState([]);

    useEffect( ()=>{
      getData();
    },[]);

    const getData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return { data };
}