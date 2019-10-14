import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export function Green() {

    const [color, setColor] = useState('');

    useEffect(() => {
        async function fetchData() {
            const response = await api.getColor('green');
            setColor(response.data.color);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1 style={{color: 'green'}}>green</h1>
            <div>Value obtained from the API is -{color}-</div>
        </div>
    );
}