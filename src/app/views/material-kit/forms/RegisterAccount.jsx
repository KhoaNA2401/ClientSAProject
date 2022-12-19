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
import FileUpload from "react-mui-fileuploader"
import db from '../../../utils/firebase-config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const Register = () => {
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
    const [description, setDescription] = useState("");
    const id = Date.now().toString();
    const [URL, setURL] = useState("");
    console.log(URL);
    const storage = getStorage();

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFiles(e.target.files[0]);
        }
    }

    const [cus_name, setCus_name] = useState("");
    const [cus_email, setCus_email] = useState("");
    const [cus_password, setCus_password] = useState("");
    const [cus_phone, setCus_phone] = useState("");
    const [cus_address, setCus_address] = useState("");

    const register = async () => {
        try {
            const res = await fetch('https://sarestfullapi.onrender.com/client/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cus_name: cus_name,
                    cus_email: cus_email,
                    cus_password: cus_password,
                    cus_phone: cus_phone,
                    cus_address: cus_address,
                })
            })
            const data = await res.json();
            console.log(data);
            alert("Register Success");
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
    }, [id]);

    const [loading, setLoading] = useState(false);
    return (
        <div>
            <ValidatorForm onSubmit={register} onError={() => null} loading={loading}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField label="Name" onChange={(e) => setCus_name(e.target.value)} />
                        <TextField label="Email" onChange={(e) => setCus_email(e.target.value)} />
                        <TextField label="Password" onChange={(e) => setCus_password(e.target.value)} />
                        <TextField label="Phone" onChange={(e) => setCus_phone(e.target.value)} />
                        <TextField label="Address" onChange={(e) => setCus_address(e.target.value)} />
                    </Grid>
                </Grid>
                <LoadingButton color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Register</Span>
                </LoadingButton>
            </ValidatorForm>
        </div>
    );
};
export default Register;
