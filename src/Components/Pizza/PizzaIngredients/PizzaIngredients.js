import React, { Fragment } from 'react';

import classes from './PizzaIngredients.scss';

const pizzaIngredients = (props) => {
    let ingredient = null;

    switch (props.type) {

        case 'tomatoes':

            ingredient = (
                <div className={classes.tomatoes}>
                    <div className={classes.tomato_1}>
                    </div>
                    <div className={classes.tomato_2}>
                    </div>
                    <div className={classes.tomato_3}>
                    </div>
                    <div className={classes.tomato_4}>
                    </div>
                    <div className={classes.tomato_5}>
                    </div>
                    <div className={classes.tomato_6}>
                    </div>
                    <div className={classes.tomato_7}>
                    </div>
                    <div className={classes.tomato_8}>
                    </div>
                    <div className={classes.tomato_9}>
                    </div>
                    <div className={classes.tomato_10}>
                    </div>
                </div>
            );
            break;

        case 'mushrooms':

            ingredient = (

                <div className={classes.mushrooms}>
                    <div className={classes.cup_1}>
                    </div>
                    <div className={classes.stem_1} >
                    </div>
                    <div className={classes.cup_2} >
                    </div>
                    <div className={classes.stem_2} >
                    </div>
                    <div className={classes.cup_3} >
                    </div>
                    <div className={classes.stem_3} >
                    </div>
                    <div className={classes.cup_4} >
                    </div>
                    <div className={classes.stem_4} >
                    </div>
                    <div className={classes.cup_5} >
                    </div>
                    <div className={classes.stem_5} >
                    </div>
                    <div className={classes.cup_6} >
                    </div>
                    <div className={classes.stem_6} >
                    </div>
                    <div className={classes.cup_7} >
                    </div>
                    <div className={classes.stem_7} >
                    </div>
                    <div className={classes.cup_8} >
                    </div>
                    <div className={classes.stem_8} >
                    </div>
                </div>

            );
            break;

        case 'corns':

            ingredient = (

                <div className={classes.corns}>
                    <div className={classes.corn_1}>
                    </div>
                    <div className={classes.corn_2}>
                    </div>
                    <div className={classes.corn_3}>
                    </div>
                    <div className={classes.corn_4}>
                    </div>
                    <div className={classes.corn_5}>
                    </div>
                    <div className={classes.corn_6}>
                    </div>
                    <div className={classes.corn_7}>
                    </div>
                    <div className={classes.corn_8}>
                    </div>
                    <div className={classes.corn_9}>
                    </div>
                    <div className={classes.corn_10}>
                    </div>
                    <div className={classes.corn_11}>
                    </div>
                    <div className={classes.corn_11}>
                    </div>
                </div>
            );
            break;

        case 'vegies':

            ingredient = (

                <div className={classes.vegies}>
                    <div className={classes.veg_1} >
                    </div>
                    <div className={classes.veg_2} >
                    </div>
                    <div className={classes.veg_3} >
                    </div>
                    <div className={classes.veg_4} >
                    </div>
                    <div className={classes.veg_5} >
                    </div>
                    <div className={classes.veg_6} >
                    </div>
                    <div className={classes.veg_7} >
                    </div>
                    <div className={classes.veg_8} >
                    </div>
                    <div className={classes.veg_9} >
                    </div>
                    <div className={classes.veg_10} >
                    </div>
                    <div className={classes.veg_11} >
                    </div>
                    <div className={classes.veg_12} >
                    </div>
                    <div className={classes.veg_13} >
                    </div>
                </div>

            );
            break;

        case 'onions':

            ingredient = (
                <Fragment>

                    <div className={`${classes.onions} ${classes.onion_1}`}>
                    </div>

                    <div className={`${classes.onions} ${classes.onion_2}`}>
                    </div>

                    <div className={`${classes.onions} ${classes.onion_3}`}>
                    </div>

                    <div className={`${classes.onions} ${classes.onion_4}`}>
                    </div>

                    <div className={`${classes.onions} ${classes.onion_5}`}>
                    </div>

                    <div className={`${classes.onions} ${classes.onion_6}`}>
                    </div>

                    <div className={`${classes.onions} ${classes.onion_7}`}>
                    </div>

                    <div className={`${classes.onions} ${classes.onion_8}`}>
                    </div>

                    <div className={`${classes.onions} ${classes.onion_9}`}>
                    </div>

                    <div className={`${classes.onions} ${classes.onion_10}`}>
                    </div>

                </Fragment>
            );
            break;

        case 'base':

            ingredient = (

                <Fragment>
                    <div className={classes.pizza_base_1} >
                    </div >
                    <div className={classes.pizza_base_2} >
                    </ div>

                    <div className={classes.slice_base_1} >
                    </div>

                    <div className={classes.slice_base_2} >
                    </div>

                    {/* <div className={classes.classes.handle}}>
                    </div>

                    <div className={classes.classes.handle_hole}}>
                    </div> */}
                </Fragment >

            );
            break;

        default:
            ingredient = null;

    }

    return ingredient;
}

export default pizzaIngredients;