import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';


import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 195,
    },
    textField: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
    input: {
        display: 'none',
    },
}));





const EmployeeOrderPage = () => {
    const { id } = useParams();
    const orders = useSelector((store) => store.orders); // I think this is the store with the orders in it?
    const [order, setOrder] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id && orders?.length) {
            const foundOrder = orders.find((o) => o.order_id == id);
            setOrder(foundOrder);
        }
    }, [id, orders]);

    //Sends Error Package to Saga
    //Data is error status, order number, user id
    const imageError = () => {

        data = {
            cus_error_image: true,
            cus_order_number: order?.cus_order_number,
            id: order?.user_id_ref,
        }

        dispatch({ type: 'IMAGE_ERROR_BUTTON', payload: { data } });
    }

    //Sends Complete Notification to Saga
    //Data is status, order number, user id
    const setComplete = () => {

        data = {

            cus_progress_status: 'Complete',
            cus_order_number: order?.cus_order_number,
            id: order?.user_id_ref
        }

        dispatch({ type: 'PRODUCT_ORDER_COMPLETE_BUTTON', payload: { data } });
    }

    return (

        <div>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center">

                <div id="orderNumber">
                    {order?.cus_order_number}
                </div>
                <div id="fullName">
                    {order ? order.cus_first_name + ' ' + order.cus_last_name : ''}
                </div>
                <div id="phone">
                    {order?.cus_phone_number}
                </div>
                <div id="email">
                    {order?.cus_email}
                </div>
                <div id="note">
                    {order?.cus_notes}
                </div>
                <div id="image">
                    <img src={order?.cus_image} style={{ height: 150, width: 150 }} />
                </div>

                <Button onClick={imageError}>
                    Error with Image
                </Button>
                <Button>
                    <a href={order?.cus_image} download> </a>
                    Download Image
                </Button>
                <Button onClick={setComplete}>
                    Complete
                </Button>
                <Button>Download CSV</Button>
                <Button>Unassign Order</Button>

            </Grid>
        </div>
    );
};

export default EmployeeOrderPage;
