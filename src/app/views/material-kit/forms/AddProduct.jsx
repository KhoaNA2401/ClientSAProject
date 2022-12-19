import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { Span } from "app/components/Typography";
import { useEffect, useState, useCallback } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db from '../../../utils/firebase-config'
const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const AddProduct = () => {
    const [state, setState] = useState({ date: new Date() });
    const [files, setFiles] = useState('')
    const dateFormat = (endDate) => {
        var dateIn = endDate.toISOString().split('T')[0];
        var dateFormated = dateIn.split('-').reverse().join('/');
        return dateFormated;
    }
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [endDate, setEndDate] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const id = Date.now().toString();
    const [URL, setURL] = useState("");

    const storage = getStorage();

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFiles(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        setLoading(true);
        const storageRef = ref(storage, `images/${files.name}`);
        const uploadTask = uploadBytesResumable(storageRef, files);
        try {
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            }, (error) => {
                console.log(error);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setURL(downloadURL);
                    // https://sarestfullapi.onrender.com/admin/addproducts
                    fetch('https://sarestfullapi.onrender.com/admin/addproducts', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id, name, model, price, endDate: dateFormat(endDate), description, image: downloadURL })
                    }).then(res => res.json())
                        .then((data) => {
                            setLoading(false);
                            setName('');
                            setModel('');
                            setPrice('');
                            setQuantity('');
                            setEndDate('');
                            setDescription('');
                            setFiles([]);
                        });
                });
            });
        } catch (error) {
            setLoading(false);
            alert(error.message);
        }
    }

    const [loading, setLoading] = useState(false);

    return (
        <ValidatorForm onSubmit={handleUpload} loading={loading}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Name" onChange={(e) => setName(e.target.value)} value={name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Model" onChange={(e) => setModel(e.target.value)} value={model} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Price" onChange={(e) => setPrice(e.target.value)} value={price} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="End Date" value={endDate} onChange={(newValue) => { setEndDate(newValue); }} renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
                </Grid>
                <Grid item xs={12}>
                    <input type="file" onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton type="submit" variant="contained" loading={loading} loadingPosition="start" startIcon={<Icon>send</Icon>}>
                        Submit
                    </LoadingButton>
                </Grid>
            </Grid>
        </ValidatorForm>
    );
};

export default AddProduct;

