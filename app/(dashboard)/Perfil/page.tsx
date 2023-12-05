'use client'
import Head from 'next/head';

import {
    Box, Button, Card, CardActions,
    CardContent, CardHeader, Divider, TextField,
    Container, Stack, Typography, Avatar,
    Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSession, signOut } from "next-auth/react";
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import IUsuario from '@/app/models/IUsuario';
import axios from 'axios';

const ButtonGlobal = styled(Button)({
    background: '#4D8B55',
    '&:hover': {
        backgroundColor: '#151515',
        borderColor: '#151515',
        boxShadow: 'none',
    }
})

const TextFieldGlobal = styled(TextField)({
    '.css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
        color: '#4D8B55',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#4D8B55',
    },
    '& .MuiOutlinedInput-root': {
        // '& fieldset': {
        //     borderColor: 'white',
        // },
        // '&:hover fieldset': {
        //     borderColor: 'white',
        // },
        '&.Mui-focused fieldset': {
            borderColor: '#4D8B55',
        },
    }
})

const InputLabelGlobal = styled(InputLabel)({
    '&.Mui-focused': {
        color: '#4D8B55'

    },
})

const InputPassword = styled(OutlinedInput)({
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#4D8B55'
    }
})
interface StateOption {
    value: string;
    label: string;
}



const AccountProfileDetails: React.FC = () => {



    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const { data: session, status } = useSession();
    const [userData, setUserData] = useState({
        nombre: "",
        apePaterno: "",
        apeMaterno: "",
        telefono: "",
        usuario: "",
        email: "",
        password: "",
    });
    useEffect(() => {
        const fetchData = async () => {
            if (session?.user.token) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/usuarios/full/${session.user.id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            "Authorization": `Bearer ${session.user.token}`
                        },
                    });
                    console.log(response.data);
                    setUserData(response.data);

                } catch (error) {
                    console.error('Errores', error);
                }
            }
        };

        fetchData();
    }, [session]);

    const handleUpdate = async () => {
        if (session?.user.token) {
            try {
                const response = await axios.put(
                    `http://localhost:8080/api/usuarios/${session.user.id}`,
                    userData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            Authorization: `Bearer ${session.user.token}`,
                        },
                    }
                );

                Swal.fire({
                    icon: 'success',
                    title: 'Actualización exitosa',
                    showConfirmButton: false,
                    timer: 2000,
                });
            } catch (error) {
                console.error('Error al actualizar', error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        }

    };


    return (
        <>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 6,

                }}
                style={{}}
            >
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <div>
                            <Typography variant="h4">
                                Perfil
                            </Typography>
                        </div>
                        <div>
                            <Grid
                                style={{}}
                                spacing={3}

                            >
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={4}
                                    mb={2}
                                >
                                    <Card>
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Avatar

                                                    sx={{
                                                        height: 80,
                                                        mb: 2,
                                                        width: 80
                                                    }}
                                                />
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                >
                                                    Adolfo Ramos Cruz
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    variant="body2"
                                                >
                                                    adolfo@gmail.com
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    variant="body2"
                                                >
                                                    2315935858
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                        <Divider />
                                        <CardActions>

                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={8}
                                >
                                    <Card>
                                        <CardHeader subheader="Puede actualizar sus datos" title="Datos del usuario" />
                                        <CardContent sx={{}}>
                                            <Box sx={{}}>
                                                <Grid style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10 }} spacing={10}>
                                                    <Grid xs={12} md={6} >
                                                        <TextFieldGlobal
                                                            fullWidth
                                                            label="Nombre"
                                                            name="nombre"
                                                        />
                                                    </Grid>
                                                    <Grid xs={12} md={6}>
                                                        <TextFieldGlobal
                                                            fullWidth
                                                            label="Apelliido paterno"
                                                            name="apePaterno"

                                                            required

                                                        />
                                                    </Grid>
                                                    <Grid xs={12} md={6}>
                                                        <TextFieldGlobal
                                                            fullWidth
                                                            label="Apelliido materno"
                                                            name="apeMaterno"

                                                            required

                                                        />
                                                    </Grid>
                                                    <Grid xs={12} md={6}>
                                                        <TextFieldGlobal
                                                            fullWidth
                                                            label="Teléfono"
                                                            name="telefono"

                                                            required

                                                        />
                                                    </Grid>
                                                    <Grid xs={12} md={6}>
                                                        <TextFieldGlobal
                                                            fullWidth
                                                            label="Usuario"
                                                            name="usuario"

                                                            type="text"

                                                        />
                                                    </Grid>
                                                    <Grid xs={12} md={6}>
                                                        <TextFieldGlobal
                                                            fullWidth
                                                            label="Email"
                                                            name="email"

                                                            required

                                                        />
                                                    </Grid>
                                                    <Grid xs={12} md={6}>
                                                        <FormControl sx={{ width: '25ch' }} variant="outlined">
                                                            <InputLabelGlobal htmlFor="outlined-adornment-password">Password</InputLabelGlobal>
                                                            <InputPassword
                                                                id="outlined-adornment-password"
                                                                type={showPassword ? 'text' : 'password'}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickShowPassword}
                                                                            onMouseDown={handleMouseDownPassword}
                                                                            edge="end"
                                                                        >
                                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                                label="Contraseña"
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </CardContent>
                                        <Divider />
                                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                                            <Button type='submit' style={{ background: '#4D8B55' }} variant="contained">Guardar cambios</Button>

                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>

        </>
    );
};
export default AccountProfileDetails;