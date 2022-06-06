import React from 'react';
import Button from '../../../common/button/Button';
import style from '../PackListContainer.module.css'
const HeaderPack = () => {
    return (

             <div className={style.PackListContainer}>

               <div>Name</div>
               <div>CardsCount</div>
               <div>Update</div>


                 <Button>Add Card</Button>
                </div>


    );
};

export default HeaderPack;