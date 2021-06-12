import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Page from '../Page/Page';
import {Menu} from '../Menu/Menu';
import {PageData} from "../Page/Page";

function fetchData():Promise<PageData[]> {
    // @ts-ignore
    return axios.get("/get-pages")
    .then((res) => {
        const result:PageData[] = res.data
        console.log(result);
        return result
    })
    .catch((err) => {
        console.error(err)
    })
}

export default function Container() {
    const [pages, setPages] = useState<PageData[]>([]);

    useEffect(() => {
        fetchData().then(pages => {
            setPages(pages);
        });
    }, [])

    return (
        <div>
            <Menu pages={pages}/>
            <Page/>
        </div>
    )
}
