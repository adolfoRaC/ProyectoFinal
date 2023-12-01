'use client'
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Image } from '@nextui-org/react';

import './RegistrarProducto.css'



const steps = ['Datos del producto', 'Seleccionar tienda', 'Agregar imagen', 'Confirmar'];

const AutocompleteGlobal = styled(Autocomplete)({
    '.css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
        color: '#4D8B55',
    },
    ' .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
        borderBottomColor: 'yellow'
    },
    '.MuiOutlinedInput-root': {
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



const TextFieldGlobal = styled(TextField)({
    '.css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
        color: '#4D8B55',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#4D8B55',
    },
    ' .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
        color: '#4D8B55',
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
            color: '#4D8B55'
        },
    }
})

const InputGlobal = styled(Input)({
    '&:after': {

        borderBottom: '2px solid #4D8B55'

    }
})

const InputLabelGlobal = styled(InputLabel)({
    '&.Mui-focused': {
        color: '#4D8B55'

    },
})
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

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const ButtonBack = styled(Button)({
    color: '#4D8B55',

})

const ButtonGlobal = styled(Button)({
    background: '#4D8B55',
    '&:hover': {
        backgroundColor: '#151515',
        borderColor: '#151515',
        boxShadow: 'none',
    }
})

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Breakfast',
        author: '@bkristastucchio',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        author: '@hjrc33',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        author: '@silverdalex',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
        author: '@shelleypauls',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
        author: '@peterlaster',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        author: '@southside_customs',
    },
];

const itemData2 = [
    {
        img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Breakfast',
        author: '@bkristastucchio',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
    },


];
export default function HorizontalLinearStepper() {

    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleItemClick = (title: string) => {
        const isSelected = selectedItems.includes(title);
        if (isSelected) {
            // Si ya está seleccionado, lo eliminamos de la lista
            setSelectedItems(selectedItems.filter((item) => item !== title));
        } else {
            // Si no está seleccionado, lo agregamos a la lista
            setSelectedItems([...selectedItems, title]);
        }
    };
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

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
    const isMobileView = windowWidth < 620;
    const Width = isMobileView ? 350 : 1000;
    const Height = isMobileView ? 'auto' : 568;


    return (
        <div className="card-stipper-product">
            <Box sx={{ width: Width, height: Height, padding: 2 }} className='stepper'>
                <div className='h3-stepper'>
                    <h3>Registrar producto</h3>
                </div>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};

                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>

                        <div className='content-card-success'>
                            <div className="card-success">
                                <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }}>
                                    <i className="checkmark">✓</i>
                                </div>
                                <h1>Éxito</h1>
                                <p>Producto agregado correctamente</p>
                            </div>
                        </div>

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <ButtonGlobal variant='contained' onClick={handleReset}>Finalizar</ButtonGlobal>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment >
                        {activeStep === 0 && (
                            <div className='h4-subtitulo'>
                                <h4>Ingrese los datos solicitados</h4>
                            </div>
                        )}
                        <Box sx={{ mb: 2, display: 'flex', flexDirection: isMobileView ? 'column' : 'row' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {activeStep === 0 && (
                                        <>

                                            <Box sx={{ width: 230, marginRight: '30px', marginTop: 2 }}>
                                                <div className='step'>
                                                    <div>

                                                        <TextFieldGlobal

                                                            type='text'
                                                            label="Nombre de la tienda"
                                                            helperText="Algo"
                                                            variant="standard"
                                                            fullWidth
                                                        />
                                                    </div>
                                                    <div>

                                                        <TextFieldGlobal
                                                            sx={{ marginTop: 4 }}
                                                            type='text'
                                                            label="Descripción"
                                                            multiline
                                                            fullWidth
                                                            rows={4}

                                                        />
                                                    </div>
                                                    <div>
                                                        <FormControlLabel
                                                            control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                                                            label="Visualizar"
                                                            labelPlacement="start"
                                                        />
                                                    </div>
                                                </div>
                                            </Box>
                                            <Box sx={{ width: 200, marginRight: '30px', marginTop: 2 }}>
                                                <div className='step'>
                                                    <div>

                                                        <FormControl fullWidth variant="standard">
                                                            <InputLabelGlobal htmlFor="standard-adornment-amount">Precio</InputLabelGlobal>
                                                            <InputGlobal
                                                                id="standard-adornment-amount"
                                                                type='number'
                                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}

                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <div>

                                                        <FormControl sx={{ marginTop: 3 }} fullWidth variant="standard">
                                                            <InputLabelGlobal htmlFor="stock">Stock</InputLabelGlobal>
                                                            <InputGlobal
                                                                id="stock"
                                                                type='number'

                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <div>

                                                        <AutocompleteGlobal
                                                            disablePortal
                                                            options={top100Films}
                                                            renderInput={(params) => <TextField {...params} label='Categorías' />}
                                                            sx={{ marginTop: 3 }}
                                                        />

                                                    </div>
                                                </div>
                                            </Box>
                                        </>
                                    )}
                                    {activeStep === 1 && (
                                        <>
                                            <Box sx={{ marginTop: 2 }}>
                                                <div className='step'>
                                                    <div className='h4-subtitulo'>
                                                        <h4>¿A qué tienda desea asociarlo?</h4>
                                                    </div>
                                                    <div className="content-img-tienda-global">
                                                        {itemData.map((item) => (
                                                            <div
                                                                key={item.img}
                                                                className={`card-img-tienda
                                                                ${selectedItems.includes(item.title) ? 'selected' : ''}`}
                                                                onClick={() => handleItemClick(item.title)}
                                                            >
                                                                <div>

                                                                    <img
                                                                        className='img-tienda'
                                                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                                                        alt={item.title}
                                                                    />
                                                                <div className="title-img">
                                                                    <p>{item.title}</p>
                                                                    <span>by: {item.author}</span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Box>
                                        </>
                                    )}
                                    {activeStep === 2 && (
                                        <>
                                            <Box sx={{ marginTop: 2 }}>
                                                <div className='step'>
                                                    <div className='h4-subtitulo'>
                                                        <h4>Agregar images del producto</h4>
                                                    </div>
                                                    <div className='upload'>
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
                                                    </div>
                                                    <div className="content-img-product">
                                                        {itemData2.map((item) => (

                                                            <img
                                                                className='img-producto'
                                                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                                                alt={item.title}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </Box>
                                        </>
                                    )}
                                    {activeStep === 3 && (
                                        <div className='step'>
                                            <section className="section-content" id="main">
                                                <div id="tagline">
                                                    <h1>¿Esta seguro de registrar el producto?</h1>
                                                </div>
                                            </section>

                                            {/* <div className='pregunta'>
                                        ¿Esta seguro de registrar el producto?
                                    </div> */}
                                        </div>
                                    )}
                                </div>

                            </div>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <ButtonBack
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Regresar
                            </ButtonBack>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <ButtonGlobal variant='contained' onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Confirmar' : 'Siguiente'}
                            </ButtonGlobal>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </div >
    );
}