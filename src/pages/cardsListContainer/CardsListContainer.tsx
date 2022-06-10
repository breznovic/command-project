import React from 'react';
import CardsList from "../cardsListPage/CardsList";
import HeaderPack from "./header/Header";


const CardsListContainer = () => {
    return (
        <div>
            <h2>Cards</h2>
            <div>
                <HeaderPack/>

            </div>

            <div>
                <CardsList/>
            </div>

        </div>
    )
};

export default CardsListContainer;