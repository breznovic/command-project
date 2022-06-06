import React from 'react';
import PackList from "../packListPage/PackList";

import HeaderPack from "./header/Header";


const PackListContainer = () => {
    return (
        <div>
            <div>
                <HeaderPack/>

            </div>

            <div>
                <PackList/>
            </div>

        </div>
    )
};

export default PackListContainer;