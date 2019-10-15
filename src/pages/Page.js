import React, {useEffect, useState} from 'react';
import {api} from '../services/api';
import {useParams} from 'react-router-dom';

export function Page() {

    const [data, setData] = useState('');
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await api.getPage(id)
            setData(response.data.text)
        }
        fetchData()
    }, [id]);

    return <div>
        <h3>Page {id}</h3>
        <div>{data}</div>
    </div>
}