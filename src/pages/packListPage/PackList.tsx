import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CardsDataType, FetchCardsTC, InitialStateType} from "../../reducers/cards-reducer";
import {CardPacksType} from "../../API/cards-api";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import {Navigate} from "react-router-dom";
import style from './PackList.module.css'

const PackList = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const cards=useSelector<AppStateType,CardPacksType[]>(state=>state.cardPacks.cardPacks)

    useEffect(() => {

        if (isLoggedIn)
            dispatch(FetchCardsTC())
    }, [])

    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }
    debugger
    return (

        <div >

            {cards.map(card=>{

                return <div key={card._id} className={style.packList}>

                    <div style={{width:'250px'}}>{card.name}</div>
                    <div style={{width:'250px'}}>{card.cardsCount}</div>
                    <div style={{width:'250px'}}>{card.updated}</div>

                    </div>

            })}

        </div>
    );
};

export default PackList;