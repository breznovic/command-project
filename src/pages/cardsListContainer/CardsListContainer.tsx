import React from 'react';
import CardsList from "../cardsListPage/CardsList";
import HeaderPack from "./header/Header";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../Pages";
import PackList from "../packListPage/PackList";
import {useAppDispatch} from "../../reducers/store";
import {FetchCardsTC} from "../../reducers/cards-reducer";


const CardsListContainer = () => {
    // const dispatch = useAppDispatch()
    // const returnPack=()=>{
    //     dispatch(FetchCardsTC())
    // }
    return (
        <div>
            <h2>Cards</h2>

             <button >Back</button>

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