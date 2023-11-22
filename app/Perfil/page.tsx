'use client'
import Head from 'next/head';

import { ThemeProvider } from '@mui/material/styles';
import {
    Box, Button, Card, CardActions,
    CardContent, CardHeader, Divider, TextField,
    Container, Stack, Typography, Avatar,
    Grid, FormControl, InputLabel,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';

import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import React, { useCallback, useState } from 'react';

interface StateOption {
    value: string;
    label: string;
}

const states: StateOption[] = [
    {
        value: 'alabama',
        label: 'Alabama',
    },
    {
        value: 'new-york',
        label: 'New York',
    },
    {
        value: 'san-francisco',
        label: 'San Francisco',
    },
    {
        value: 'los-angeles',
        label: 'Los Angeles',
    },
];

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    state: string;
    country: string;
}

const AccountProfileDetails: React.FC = () => {
    const [values, setValues] = useState<FormValues>({
        firstName: 'Anika',
        lastName: 'Visser',
        email: 'demo@devias.io',
        phone: '',
        state: 'los-angeles',
        country: 'USA',
    });

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setValues((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
        },
        []
    );
    const user = {
        avatar: '/assets/avatars/avatar-anika-visser.png',
        city: 'Los Angeles',
        country: 'USA',
        jobTitle: 'Senior Developer',
        name: 'Anika Visser',
        timezone: 'GTM-7'
    };

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();


    };

    return (
        <>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 6,

                    }}
                    style={{ border: '1px solid black' }}
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
                                                        src={user.avatar}
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
                                                        {user.name}
                                                    </Typography>
                                                    <Typography
                                                        color="text.secondary"
                                                        variant="body2"
                                                    >
                                                        {user.city} {user.country}
                                                    </Typography>
                                                    <Typography
                                                        color="text.secondary"
                                                        variant="body2"
                                                    >
                                                        {user.timezone}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                            <Divider />
                                            <CardActions>
                                                <Button
                                                    fullWidth
                                                    variant="text"
                                                >
                                                    Upload picture
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                        lg={8}
                                    >
                                        <Card>
                                            <CardHeader subheader="The information can be edited" title="Profile" />
                                            <CardContent sx={{}}>
                                                <Box sx={{}}>
                                                    <Grid style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10 }} spacing={10}>
                                                        <Grid xs={12} md={6} >
                                                            <TextField
                                                                fullWidth
                                                                label="Nombre"
                                                                name="nombre"
                                                                onChange={handleChange}
                                                                required
                                                                value={values.firstName}

                                                            />
                                                        </Grid>
                                                        <Grid xs={12} md={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="Apelliido paterno"
                                                                name="apePaterno"
                                                                onChange={handleChange}
                                                                required
                                                                value={values.lastName}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} md={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="Apelliido materno"
                                                                name="apeMaterno"
                                                                onChange={handleChange}
                                                                required
                                                                value={values.lastName}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} md={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="Teléfono"
                                                                name="telefono"
                                                                onChange={handleChange}
                                                                required
                                                                value={values.email}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} md={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="Usuario"
                                                                name="usuario"
                                                                onChange={handleChange}
                                                                type="text"
                                                                value={values.phone}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} md={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="Email"
                                                                name="email"
                                                                onChange={handleChange}
                                                                required
                                                                value={values.country}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} md={6}>
                                                            <FormControl fullWidth variant="outlined">
                                                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                                <OutlinedInput
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
                                                                    label="Password"
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </CardContent>
                                            <Divider />
                                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                                <Button variant="contained">Guardar cambios</Button>
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