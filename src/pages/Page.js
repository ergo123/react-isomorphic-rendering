import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPage} from '../services/store/actions';

export function Page() {

    const dispatch = useDispatch()
    const { id } = useParams();
    const data = useSelector(state => state.pages[id] || {});

    useEffect(() => {
        dispatch(fetchPage(id));
    }, [id]);

    return <div>
        <h3>Page {id}</h3>
        <div>{data.text}</div>
    </div>
}
