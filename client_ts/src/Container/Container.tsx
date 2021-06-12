import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Page from '../Page/Page';
import Menu from '../Menu/Menu';
import './Container.css'

const fetchData = () => {
    return axios.get("/get-pages")
    .then((res) => {
        const result = res.data
        // console.log(result);
        return result
    })
    .catch((err) => {
        console.error(err)
    })
}

export default function Container() {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetchData().then(pages => {
            setPages(pages);
        });
    }, [])

    return (
        <div className="Container">
            <Menu pages={pages}/>
            <Page/>
        </div>
    )
}
