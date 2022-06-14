import React from 'react';
import CardsList from "../cardsListPage/CardsList";
import HeaderPack from "./header/Header";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../Pages";
import PackList from "../packListPage/PackList";
import {useAppDispatch} from "../../reducers/store";
import {FetchCardsTC} from "../../reducers/cards-reducer";


const CardsListContainer = () => {
    const navigate = useNavigate()
    // const dispatch = useAppDispatch()
    const returnPack=()=>{
         navigate(`/pack-list`)
    }
    return (
        <div>
            <h2>Cards</h2>

             <button onClick={returnPack} >Back</button>

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