import React from 'react';
import Checkbox from "../../../common/checkbox/Checkbox";
import {AppActionsType, AppStateType, useAppDispatch} from "../../../reducers/store";
import {useSelector} from "react-redux";
import {FetchCardsTC, idFilterPackAC} from "../../../reducers/cards-reducer";
import {CardPacksType} from "../../../API/cards-api";

const FilterForId = () => {
    const dispatch = useAppDispatch()
    const userId = useSelector<AppStateType, CardPacksType[]>(state => state.cardPacks.cardPacks.filter(pack => pack.user_id))
    console.log("userId",userId)
    const filterHandler = () => {
        // dispatch(idFilterPackAC(userId))
        dispatch(FetchCardsTC())
    }


    return (
        <p>
            <button onClick={filterHandler}>My</button>
            <button>All</button>

        </p>
    );
};

export default FilterForId;