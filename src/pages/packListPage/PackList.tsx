import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {DeletePackTC, FetchCardsTC, setPageAC, UpdatePackTC} from "../../reducers/cards-reducer";
import {CardPacksType} from "../../API/cards-api";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import {Navigate, useNavigate} from "react-router-dom";
import style from './PackList.module.css'

import Button from "../../common/button/Button";
import Pagination from "./pagination/Pagination";

const PackList = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const cards = useSelector<AppStateType, CardPacksType[]>(state => state.cardPacks.cardPacks)
    const pageCount = useSelector<AppStateType, number>(state => state.cardPacks.pageCount)
    const packPage = useSelector<AppStateType, number>(state => state.cardPacks.page)
    const totalCount = useSelector<AppStateType, number>(state => state.cardPacks.cardPacksTotalCount)
    const userId = useSelector<AppStateType, string>(state => state.cardPacks.params.user_id)
    console.log("pageCount", pageCount)

    const setNewPageHandler = (page: number) => {
        dispatch(setPageAC(page))
    }
    const deletePackHandler = (id: string) => {
        dispatch(DeletePackTC(id))

    }
    const updatePackHandler = (id: string) => {
        dispatch(UpdatePackTC(id))
    }

    useEffect(() => {

        dispatch(FetchCardsTC())
    }, [packPage, userId])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
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

            <Pagination packPage={packPage}
                        pageCount={pageCount}
                        callback={(page) => setNewPageHandler(page)}
                        totalCount={totalCount}
            />


            {/*            <div className={style.pageCount}>*/}
            {/*                {currentPage.map((page) => {*/}

            {/*                    return <span*/}
            {/*                        className={packPage === page ? style.pages : ''}*/}
            {/*                        onClick={() => setNewPageHandler(page)}*/}
            {/*                    >*/}
            {/*{page}*/}
            {/*                </span>*/}

            {/*                })}*/}
            {/*            </div>*/}
        </div>
    );
};

export default PackList;