import React from 'react';
import Button from '../../../common/button/Button';
import style from '../PackListContainer.module.css'
import {AppStateType, useAppDispatch} from "../../../reducers/store";
import {CreateCardsTC} from "../../../reducers/cards-reducer";
import {useSelector} from "react-redux";
import {CardPacksType} from "../../../API/cards-api";
const HeaderPack = () => {
    const dispatch = useAppDispatch()
    // const name=useSelector<AppStateType,CardPacksType[]>(state=>state.cardPacks)

    const addPack=()=>{
        dispatch(CreateCardsTC())
    }


    return (

             <div className={style.PackListContainer}>

               <h4 className={style.name}>Name</h4>
               <h4 className={style.count}>CardsCount</h4>
               <h4 className={style.update}>Update</h4>


                 <div>
                     <Button onClick={addPack} >Add Card</Button>
                 </div>
                </div>


    );
};

export default HeaderPack;