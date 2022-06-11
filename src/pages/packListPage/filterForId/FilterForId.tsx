import React from 'react';
import Checkbox from "../../../common/checkbox/Checkbox";
import {AppActionsType, AppStateType, useAppDispatch} from "../../../reducers/store";
import {useSelector} from "react-redux";
import {FetchCardsTC} from "../../../reducers/cards-reducer";

const FilterForId = () => {
    const dispatch = useAppDispatch()
    // const userId=useSelector<AppStateType,string>(state=>state.cardPacks.params.user_id)
    // const filterHandler=(userId:string)=>{
    //     dispatch(FetchCardsTC())
    // }


    return (
        <p>
            <button >My</button>
            <button>All</button>

        </p>
    );
};

export default FilterForId;