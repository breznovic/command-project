import {AppStateType, useAppDispatch} from "../../reducers/store";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Navigate, useParams} from "react-router-dom";
import style from "../cardsListPage/CardsList.module.css";
import {CardType, setCardsTC, setPackAC} from "../../reducers/packCards-reducer";

const CardsList = () => {
    const dispatch = useAppDispatch()
    let {pack_id} = useParams()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const cards = useSelector<AppStateType, CardType[]>(state => state.cards.cards)
    const pageCount = useSelector<AppStateType, number>(state => state.cards.pageCount)

    const onClickHandler = () => {
        dispatch(setCardsTC())
    }

    useEffect(() => {

        if (pack_id){
            dispatch(setPackAC(pack_id)as any)
        }
        dispatch(setCardsTC())
    }, [pack_id])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    let currentPage = []
    for (let i = 1; i <= pageCount; i++) {
        currentPage.push(i)
    }

    return (

        <div>

            {cards.map(({_id, answer, question, grade, updated}: CardType) => {

                return <div key={_id} className={style.cardsList}>

                    <div style={{width: '250px'}}>{question}</div>
                    <div style={{width: '250px'}}>{answer}</div>
                    <div style={{width: '250px'}}>{grade}</div>
                    <div style={{width: '250px'}}>{updated}</div>

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

export default CardsList;