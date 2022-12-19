import { async } from "@firebase/util";
import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    Stack,
    Fab,
    DialogContentText,
    DialogContent,
    CardContent,
    Card,
    CardHeader,
    Typography,
    useTheme
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { display } from "@mui/system";
import { SimpleCard } from "app/components";
import { get } from "lodash";
import { useState, useEffect } from "react";

const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));
const ContentBox = styled("div")(() => ({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
}));
const FabIcon = styled(Fab)(() => ({
    width: "44px !important",
    height: "44px !important",
    boxShadow: "none !important",
}));

///admin/getall
const OrderTable1 = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const [order, setOrder] = useState([]);
    const [customerOrder, setCustomerOrder] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    //OK
    const getAllOrder = async () => {
        fetch('http://localhost:3000/admin/getorder').then((response) => {
            response.json().then((result) => {
                setOrder(result);
                // setOrderDetails(result.map(item => item.details));
            });
        });
    };

    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [endDate, setEndDate] = useState("");
    ///admin/deleteproducts/:id

    // /admin/getproducts/:id and use handleClickOpen
    const state = {
        name,
        model,
        price,
        description,
        quantity,
        endDate,
    }
    //view details when click on view button get array from backend and set data
    const [data, setData] = useState([]);
    const [cusDetails, setCusDetails] = useState([]);
    const [productID, setProductID] = useState([]);
    const array = [];
    const arrayDetails = []
    const [details, setDetails] = useState([]);
    const [pro_id, setPro_id] = useState([]);

    const handleClick = async (id) => {
        console.log(id);
        for (let i = 0; i < order.length; i++) {
            if (order[i].id == id) {
                setData(order[i]);
                setCusDetails(order[i].cus_id);
                array.push(order[i].details);
                console.log(details);

                handleClickOpen();
            }
        }
        getCartDetails(array);

        // getProductDetails(pro_id);
    }
    // console.log(pro_id);
    // //admin/getproducts/:id
    const values = [];
    const [productDetails, setProductDetails] = useState([]);

    const getCartDetails = async (orderDetails) => {
        // console.log(orderDetails);
        const stringID = orderDetails.toString();
        const arrayID = stringID.split(',');
        // console.log(arrayID);
        const id = [];
        for (let i = 0; i < arrayID.length; i++) {
            fetch('http://localhost:3000/client/getcartbyid/' + arrayID[i]).then((response) => {
                response.json().then((result) => {
                    arrayDetails.push(result);
                    values.push(result.pro_id);
                    // console.log(result.pro_id);
                    setPro_id(result.pro_id);
                    // console.log(arrayDetails.map(item => item.pro_id));
                    setDetails(arrayDetails);
                    // /admin/getproducts/:id
                    for (let i = 0; i < arrayDetails.length; i++) {
                        fetch('http://localhost:3000/admin/getproducts/' + arrayDetails[i].pro_id).then((response) => {
                            response.json().then((result) => {
                                console.log(result); 
                                setProductDetails(result);
                            });
                        });
                    }
                });

            });
        }
    };
    console.log([pro_id].length);
    // /admin/getproducts/:id with array of id
    const getProductDetails = async (pro_id) => {
        console.log(pro_id);
        const stringID = pro_id.toString();
        const arrayID = stringID.split(',');
        console.log(arrayID);
        const id = [];
        for (let i = 0; i < arrayID.length; i++) {
            fetch('http://localhost:3000/admin/getproducts/' + arrayID[i]).then((response) => {
                response.json().then((result) => {
                    console.log(result);
                    setProductDetails(result);
                });
            });
        }
    };



    ///admin/accpetcheckout body = {id}
    const handleAccept = (id) => {
        if (window.confirm("Are you sure you want to accept this order?"))
            try {
                fetch('http://localhost:3000/admin/accpetcheckout', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: id })
                }).then((response) => {
                    response.json().then((result) => {
                        console.log(result);
                        getAllOrder();
                    });
                });
                alert("Order Accepted");
                handleClose();
            } catch (error) {
                console.log(error);
            }
        else {
            console.log("Order not accepted");
        }
    }

    ///admin/deleteorder/:id
    const handleDelete = (id) => {
        console.log(id);
        if (window.confirm("Are you sure you want to delete this order?"))
            try {
                fetch('http://localhost:3000/admin/deleteorder/' + id, {
                    method: 'DELETE',
                }).then((response) => {
                    response.json().then((result) => {
                        console.log(result);
                        getAllOrder();
                    });
                });
                alert("Order Deleted");

            } catch (error) {
                console.log(error);
            }
        else {
            console.log("Order not deleted");
        }
    }
    useEffect(() => {
        getAllOrder();
    }, [data]);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const StyledTable = styled(Table)(({ theme }) => ({
        whiteSpace: "pre",
        "& thead": {
            "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
        },
        "& tbody": {
            "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
        },
        '& small': {
            width: 50,
            height: 15,
            borderRadius: 500,
            boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        },
    }));
    const Small = styled('small')(({ bgcolor }) => ({
        width: 50,
        height: 15,
        color: '#fff',
        padding: '2px 8px',
        borderRadius: '4px',
        overflow: 'hidden',
        background: bgcolor,
        boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    }));
    const { palette } = useTheme();
    const bgError = palette.error.main;
    const bgPrimary = palette.primary.main;
    return (
        <Box width="100%" overflow="auto">
            <Button variant="contained" color="primary" onClick={() => getAllOrder()} >Re-Fresh</Button>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Customer Name</TableCell>
                        <TableCell align="center">Customer Phone</TableCell>
                        <TableCell align="center">Customer Address</TableCell>
                        <TableCell align="center">Product Order</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((subscriber, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{subscriber.id}</TableCell>

                            <TableCell align="center">{subscriber.cus_id.cus_name}</TableCell>
                            <TableCell align="center">{subscriber.cus_id.cus_phone}</TableCell>
                            <TableCell align="center">{subscriber.cus_id.cus_address}</TableCell>
                            <TableCell align="center">{subscriber.details.length}</TableCell>
                            <TableCell align="center">{subscriber.total}</TableCell>
                            {subscriber.status === "Đã giao hàng" ? (
                                <TableCell align="center">
                                    <Small bgcolor={bgPrimary}>{subscriber.status}</Small>
                                </TableCell>
                            ) : (
                                <TableCell align="center">
                                    <Small bgcolor={bgError}>{subscriber.status}</Small>
                                </TableCell>
                            )}
                            <TableCell align="center">
                                <IconButton onClick={() => handleDelete(`${subscriber.id}`)}>
                                    <Icon color="error">close</Icon>
                                </IconButton>
                                <IconButton onClick={() => handleClick(subscriber.id)} >
                                    <Icon color="primary">search</Icon>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>

            <TablePagination
                sx={{ px: 2 }}
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                count={order.length}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ "aria-label": "Next Page" }}
                backIconButtonProps={{ "aria-label": "Previous Page" }}
            />

            <Dialog open={open} onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Details Order</DialogTitle>
                <Stack spacing={2} direction="row" >
                    <CardContent>
                        <p>Name: {cusDetails.cus_name}</p>
                        <p>Phone: {cusDetails.cus_phone}</p>
                        <p>Address: {cusDetails.cus_address}</p>

                    </CardContent>
                    <CardContent>
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Model</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    {/* <TableCell align="center">Description</TableCell> */}
                                </TableRow>
                            </TableHead>
                            {details
                                .map((item, index) => (
                                    <TableBody key={index}>
                                        <TableRow >
                                            <TableCell align="center">{item.pro_id}</TableCell>
                                            <TableCell align="center">{item.quantity}</TableCell>
                                            <TableCell align="center">{item.status}</TableCell>
                                            {/* <TableCell align="center">{item.model}</TableCell>
                                        <TableCell align="center">{item.price}</TableCell>
                                        <TableCell align="center">{item.description}</TableCell> */}
                                        </TableRow>
                                    </TableBody>
                                ))}
                            <TableBody>
                                <p align="center">Total: {data.total}</p>
                            </TableBody>
                        </StyledTable>
                    </CardContent>
                </Stack>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="secondary" onClick={() => handleAccept(`${data.id}`)}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
};

export default OrderTable1;
