import React from 'react';
import Button from '../../../common/button/Button';
import style from '../PackListContainer.module.css'
const HeaderPack = () => {
    return (

             <div className={style.PackListContainer}>

               <div className={style.name}>Name</div>
               <div className={style.count}>CardsCount</div>
               <div className={style.update}>Update</div>


                 <Button >Add Card</Button>
                </div>


    );
};

export default HeaderPack;