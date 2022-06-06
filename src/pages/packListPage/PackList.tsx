import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FetchCardsTC} from "../../reducers/cards-reducer";
import {CardPacksType} from "../../API/cards-api";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import {Navigate} from "react-router-dom";

const PackList = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const cards=useSelector<AppStateType,CardPacksType[]>(state=>state.cardPacks)
    useEffect(() => {

        if (isLoggedIn)
            dispatch(FetchCardsTC())
    }, [])

    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }
    return (

        <div>
            {cards.map(card=>{

                return <li>

                    <span>{card.name}</span>
                    <span>{card.cardsCount}</span>
                    <span>{card.updated}</span>

                    </li>

            })}
        </div>
    );
};

export default PackList;