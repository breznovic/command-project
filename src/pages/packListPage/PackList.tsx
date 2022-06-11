import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {DeletePackTC, FetchCardsTC, setCardsAC, setPageAC, UpdatePackTC} from "../../reducers/cards-reducer";
import {CardPacksType} from "../../API/cards-api";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import {Navigate, useNavigate} from "react-router-dom";
import style from './PackList.module.css'

import Button from "../../common/button/Button";

const PackList = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const cards = useSelector<AppStateType, CardPacksType[]>(state => state.cardPacks.cardPacks)
    const pageCount = useSelector<AppStateType, number>(state => state.cardPacks.params.pageCount)
    const packPage = useSelector<AppStateType, number>(state => state.cardPacks.params.page)

    const setNewPageHandler = () => {
       dispatch(FetchCardsTC())
    }
    const deletePackHandler = (id: string) => {
        dispatch(DeletePackTC(id))

    }
    const updatePackHandler = (id: string) => {
        dispatch(UpdatePackTC(id))

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
                const setChangePageToCard = () => {
                    navigate(`${card._id}`)
                }

                return <div key={card._id} className={style.packList}>

                    <div onClick={setChangePageToCard} style={{width: '250px'}}>{card.name}</div>
                    <div style={{width: '250px'}}>{card.cardsCount}</div>
                    <div style={{width: '250px'}}>{card.updated}</div>

                    <Button onClick={() => deletePackHandler(card._id)}>Del</Button>
                    <Button onClick={() => updatePackHandler(card._id)}>Update</Button>
                </div>

            })}
            <div className={style.pageCount}>
                {currentPage.map((page) => {

                    return <span
                        className={packPage === page ? style.pages : ''}
                        onClick={setNewPageHandler}
                    >
{page}
                </span>
                })}
            </div>
        </div>
    );
};

export default PackList;