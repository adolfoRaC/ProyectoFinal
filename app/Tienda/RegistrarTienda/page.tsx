'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';

// mapa

import L, { Icon, LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MarkerIcon from '../../../node_modules/leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/leaflet.css'

import './RegistrarTienda.css';
import { styled } from '@mui/material/styles';


const ButtonGlobal = styled(Button)({
    background: '#4D8B55',
    '&:hover': {
        backgroundColor: '#151515',
        borderColor: '#151515',
        boxShadow: 'none',
    }
})

const ButtonBack = styled(Button)({
    color: '#4D8B55',

})

const StepGlobal = styled(Step)({
    '.css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
        color: '#4D8B55',

    },
    '.css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed': {
        color: '#4D8B55'
    }
})
const InputGlobal = styled(Input)({
    '&:after': {

        borderBottom: '2px solid #4D8B55'

    }
})

const AutocompleteGlobal = styled(Autocomplete)({
    '.css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
        color: '#4D8B55',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#4D8B55',
        },
    }
})

const TextFieldGlobal = styled(TextField)({
    '.css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
        color: '#4D8B55',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#4D8B55',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#4D8B55',
        },
    }
})

// const SelectGlobal = styled(Select)({


//     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//         borderColor: '#4D8B55',
//     }
// })

// const InputLabelGlobal = styled(InputLabel)({
//     '&.Mui-focused': {
//         color: '#4D8B55'

//     },
// })

type StepData = {
    label: string;
    description: string;
    inputs?: { name: string; label: string }[];
};
//Ejemplo de datos de combobox, pero a aqui se llama AutocompleteGlobal
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
        label: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
        label: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
        label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
        label: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
        label: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
];

const steps: StepData[] = [
    {
        label: 'Registrar información de la tienda',
        description: 'Ingrese la información solicitada, no puede faltar ningún campo',

    },
    {
        label: 'Registrar dirección de la tienda',
        description: 'Ingresa la dirección de tu tienda',
    },

    {
        label: 'Finalizar',
        description: '¿Esta seguro de que los datos son correctos?',
    },
];


function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', marginTop: '20px' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function VerticalLinearStepper() {
    // circulo de progreso
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);


    //mapa
    const coordenadasTec = [19.882814, -97.3930258] as LatLngExpression

    const [activeStep, setActiveStep] = React.useState(0);
    const [inputValues, setInputValues] = React.useState<{ [key: string]: string }>({});
    
    //responsive
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isMobileView = windowWidth < 800;
    const Width = isMobileView ? 450 : 1000;

    //steps
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setInputValues({});
    };



    return (
        <div className='stepperContent'>
            <Box style={{ width: Width }} className='card-stepper'>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <StepGlobal key={step.label}>
                            <StepLabel
                                optional={
                                    index === 2 ? (
                                        <Typography variant="caption">Ultimo paso</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box sx={{ mb: 2, display: 'flex', flexDirection: isMobileView ? 'column' : 'row' }}>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            {index === 0 && (
                                                <>
                                                    <Box sx={{ width: 200, marginRight: '30px', marginTop: 2 }}>
                                                        <div className='inputs'>
                                                            <TextFieldGlobal
                                                                type='text'
                                                                label="Calle"
                                                                helperText="Algo"
                                                                variant="standard"
                                                            />
                                                        </div>
                                                        <div className='inputs' style={{ marginTop: 30 }}>
                                                            <TextFieldGlobal
                                                                type='text'
                                                                label="Número"
                                                                helperText="Algo"
                                                                variant="standard"
                                                            />
                                                        </div>
                                                    </Box>
                                                    <Box sx={{ width: 200, marginRight: '30px', marginTop: 2 }}>

                                                        <TextFieldGlobal
                                                            type='text'
                                                            label="Colonia"
                                                            helperText="Algo"
                                                            variant="standard"
                                                        />
                                                    </Box>
                                                </>
                                            )}
                                            {index === 1 && (
                                                <>
                                                    <Box sx={{ width: 200, marginRight: '30px', marginTop: 2 }}>
                                                        <div className='inputs'>
                                                            <TextFieldGlobal
                                                                type='text'
                                                                label="CP"
                                                                helperText="Algo"
                                                                variant="standard"
                                                            />
                                                        </div>
                                                        <div className='inputs' style={{ marginTop: 30 }}>
                                                            <TextFieldGlobal
                                                                type='text'
                                                                label="Nombre de la tienda"
                                                                helperText="Algo"
                                                                variant="standard"
                                                            />
                                                        </div>
                                                        <div className='inputs' style={{ marginTop: 30 }}>
                                                            <TextFieldGlobal
                                                                type='text'
                                                                label="Nombre de la tienda"
                                                                helperText="Algo"
                                                                variant="standard"
                                                            />
                                                        </div>
                                                    </Box>
                                                    <Box sx={{ width: 200, marginRight: '30px', marginTop: 2 }}>

                                                        <TextFieldGlobal
                                                            type='text'
                                                            label="Nombre de la tienda"
                                                            helperText="Algo"
                                                            variant="standard"
                                                        />

                                                        <div className='inputs' style={{ marginTop: 30 }}>
                                                            <AutocompleteGlobal
                                                                disablePortal
                                                                options={top100Films}
                                                                renderInput={(params) => <TextField {...params} label='Estados' />}
                                                            />
                                                        </div>
                                                        <div className='inputs' style={{ marginTop: 30 }}>
                                                            <AutocompleteGlobal
                                                                disablePortal
                                                                options={top100Films}
                                                                renderInput={(params) => <TextField {...params} label='Municipios' />}
                                                            />
                                                        </div>
                                                    </Box>
                                                </>
                                            )}
                                        </div>
                                        {!isMobileView && (
                                            <div>
                                                <ButtonGlobal
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    sx={{ mt: 1, mr: 1 }}
                                                    className='btnNext'
                                                >
                                                    {index === steps.length - 1 ? 'Sí, finalizar' : 'Continuar'}
                                                </ButtonGlobal>
                                                <ButtonBack
                                                    className='btnBefore'
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Regresar
                                                </ButtonBack>
                                            </div>
                                        )}
                                    </div>
                                    {/* Columna del Mapa */}
                                    {index === 1 && (
                                        <div className='mapa' style={{ flex: 1 }}>
                                            <MapContainer style={{ width: '100%', height: '200px', marginTop: 30 }}
                                                center={coordenadasTec} zoom={13} scrollWheelZoom={false}>
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Marker position={coordenadasTec}
                                                    icon={new Icon({ iconUrl: MarkerIcon.src, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                                    <Popup>
                                                        A pretty CSS3 popup. <br /> Easily customizable.
                                                    </Popup>
                                                </Marker>
                                            </MapContainer>
                                        </div>
                                    )}
                                    {
                                        index === 0 && (

                                            <div className="img" style={{ flex: 1, padding: '20px' }}>
                                                <Button
                                                    className='input'
                                                    variant="contained"
                                                    sx={{ background: '#4D8B55', '&:hover': { background: '#151515' } }}
                                                    component="label"
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Subir imagen de la tienda
                                                    <input
                                                        type="file"
                                                        hidden
                                                    />
                                                </Button>
                                                <CircularProgressWithLabel value={progress} />
                                                <img src="/images/Tienda.png" alt="" style={{ width: '70%', height: '200px', justifyContent: 'center', alignItems: 'center' }} />
                                            </div>

                                        )
                                    }
                                    {/* 
                                    //////////////////////////////
                                    Nota: estos botones son los mismos ue de arriba, solo que 
                                    se agrego para la responsividad, asi que si le agregas una función que 
                                    los de arriba tendrás que darle la misma función, tambien cambio el orden
                                    de los botones
                                    //////////////////
                                     */}
                                    {isMobileView && (
                                        <div style={{ marginLeft: 'auto', marginTop: '1rem' }}>
                                            <ButtonBack
                                                className='btnBefore'
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Regresar
                                            </ButtonBack>
                                            <ButtonGlobal
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                                className='btnNext'
                                            >
                                                {index === steps.length - 1 ? 'Sí, finalizar' : 'Continuar'}
                                            </ButtonGlobal>
                                        </div>
                                    )}
                                </Box>
                            </StepContent>
                        </StepGlobal>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Alert className='msg-finalizar' variant="outlined" severity="success">
                        <Paper square elevation={0}>
                            <Typography>Tienda registrada con éxito</Typography>
                            <ButtonGlobal variant="contained" className='btnFinalizar' onClick={handleReset}>
                                Aceptar
                            </ButtonGlobal>
                        </Paper>
                    </Alert>
                )}
            </Box>
        </div >
    );
}
