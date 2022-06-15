import React from 'react';
import Button from '../../../common/button/Button';
import style from '../PackListContainer.module.css'
import {AppStateType, useAppDispatch} from "../../../reducers/store";
import {CreateCardsTC, sortingPackAC} from "../../../reducers/cards-reducer";
import {useSelector} from "react-redux";
import {CardPacksType} from "../../../API/cards-api";
import FilterForId from "../../packListPage/filterForId/FilterForId";

const HeaderPack = () => {
    const dispatch = useAppDispatch()

    const addPack = () => {
        dispatch(CreateCardsTC())
    }
    const sortHandler = (value: string) => {

        dispatch(sortingPackAC(value))
    }

    return (
        <div>
            <div>
                <FilterForId/>
            </div>

            <div className={style.PackListContainer}>

                <h4 className={style.name} onClick={() => sortHandler('0name')}
                    onDoubleClick={() => sortHandler('1name')}
                >Name</h4>
                <h4 className={style.count} onClick={() => sortHandler('0cardsCount')}
                    onDoubleClick={() => sortHandler('1cardsCount')}
                >CardsCount</h4>
                <h4 className={style.update} onClick={() => sortHandler('0updated')}
                    onDoubleClick={() => sortHandler('1updated')}
                >Update</h4>


                <div>
                    <Button onClick={addPack}>Add Card</Button>
                </div>
            </div>
        </div>

    );
};

export default HeaderPack;