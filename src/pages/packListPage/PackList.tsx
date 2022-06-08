import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CardsDataType, FetchCardsTC, InitialStateType, setPageCountAC} from "../../reducers/cards-reducer";
import {CardPacksType} from "../../API/cards-api";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import {Navigate} from "react-router-dom";
import style from './PackList.module.css'

const PackList = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const cards = useSelector<AppStateType, CardPacksType[]>(state => state.cardPacks.cardPacks)
    const pageCount = useSelector<AppStateType, number>(state => state.cardPacks.params.pageCount)

    const onClickHandler = () => {
        dispatch(FetchCardsTC())
    }

    useEffect(() => {

        if (isLoggedIn)
            dispatch(FetchCardsTC())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    let currentPage = []
    for (let i = 1; i <= pageCount; i++) {
        currentPage.push(i)
    }

    return (

        <div>

            {cards.map(card => {

                return <div key={card._id} className={style.packList}>

                    <div style={{width: '250px'}}>{card.name}</div>
                    <div style={{width: '250px'}}>{card.cardsCount}</div>
                    <div style={{width: '250px'}}>{card.updated}</div>

                </div>

            })}
            <div className={style.pageCount}>
                {currentPage.map((page) => {
                    return <span
                        onClick={onClickHandler}
                    >
{page}
                </span>
                })}
            </div>
        </div>
    );
};

export default PackList;