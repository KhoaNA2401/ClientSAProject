import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
//register with email and password 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase-config';
const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
    },
}));


const Register = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // loginWithEmail(email, password);
        navigate('/dashboard/default');
    }

    const register = async (e) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user);
            alert("User created successfully");
            navigate('/session/signin');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <JWTRoot>
            <Card className="card">
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
                            <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
                        </JustifyBox>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <ContentBox>
                            <TextField fullWidth label="Name" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Box sx={{ height: 16 }} />
                            <TextField fullWidth label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />

                            <Box sx={{ height: 16 }} />
                            <TextField fullWidth label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Box sx={{ height: 16 }} />
                            <Box sx={{ height: 16 }} />
                            <TextField fullWidth label="Phone" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Box sx={{ height: 16 }} />
                            <TextField fullWidth label="Address" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <FlexBox>
                                <Checkbox color="primary" />
                                <Paragraph color="text.secondary">Remember me</Paragraph>
                            </FlexBox>

                            <Box sx={{ height: 16 }} />
                            <LoadingButton fullWidth type="submit" variant="contained" onClick={register}>
                                Register
                            </LoadingButton>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    );
};

export default Register;
