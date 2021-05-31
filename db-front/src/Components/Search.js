import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

//----------------------------------------

//Material-UI CSS

//Searchbar useStyles
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50vw',

        },


    },
    table: {
        minWidth: '100%',
        marginLeft: '0% !important',
        maxHeight: '80%'
      },
      modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        width: 400,
        backgroundColor: 'rgb(44, 47, 51)',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}));

//----------------------------------------

//Styled components CSS

const SearchBar = styled(TextField)({
    marginLeft: '0% !important',
    color: 'white !important',
    //marginTop: '22vw !important'

})

const Dropdown = styled(TextField)({
    marginRight: '1% !important',
    marginLeft: '16vw !important',
    width: '9vw !important',
    //marginTop: '22vw !important'

})

const SearchButton = styled(Button)({
    marginLeft: '1% !important',
    width: '9vw !important',
    marginTop: '1vw !important'

})


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const SearchScreen = () => {


    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');



    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
                overrides: {
                    MuiFormLabel: {
                        root: {
                            "&$focused": {
                                color: "white",
                                fontWeight: "bold"
                            }
                        },

                        focused: {}
                    }
                }
            }),
        [prefersDarkMode],
    );

    const classes = useStyles();
    const [category, setCategory] = React.useState('movieTitle');
    const [search, setSearch] = React.useState('');
    const [movies,setMovies]= React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [count,setCount] = React.useState(0);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setCategory(event.target.value);
        setMovies([]);
    };
    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    };

    React.useEffect(() => {
        fetch(`http://localhost:3000/countTotal`).then(response => {
    
            return (
                response.json()            
                )

        }).then(a => { setCount(a.count);});
    },[]);

    const categories = [
        {
            value: 'findMovie',
            label: 'Movie Title',
        },
        {
            value: 'findTV',
            label: 'TV Show Title',
        },
        {
            value: 'findArtist',
            label: 'Actor',
        },
        {
            value: 'countTotalYear',
            label: 'TV Show by Year',
        },
        {
            value: 'countTotalCountry',
            label: 'Movie by Country',
        },
    ];

    const searchFunc = () =>{
        fetch(`http://localhost:3000/${category}/${encodeURIComponent(search)}`)
        .then(response => {
    
                return (
                    response.json()
                )
    
            }).then(a => { setMovies(a);
            if(category==="countTotalYear" || category==="countTotalCountry"){
                handleOpen();
            }});
    }

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title" style={{color: 'white'}}>{category==="countTotalYear" && "Año: "}{category==="countTotalCountry" && "País: "}{search}</h2>
            <h2 style={{color: 'white'}}>Peliculas: {movies.count}</h2>
            <Button onClick={() => { handleClose();}} variant="contained" color="secondary" >Cerrar</Button>
        </div>
    );





    return (

        <form className={classes.root} noValidate autoComplete="off" style={{
            backgroundColor: '#2c2f33',
            width: '100vw',
            height: '100vh'
        }}>
            

            <ThemeProvider theme={theme}>


                <Dropdown
                    id="selectCategory"
                    select
                    label="Select"
                    variant="filled"
                    value={category}
                    onChange={handleChange}
                >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Dropdown>

                <SearchBar id="standard-basic" label="Search Movies & TV Shows" variant="filled" 
                value={search}
                onChange={handleChangeSearch} />

                <SearchButton variant="contained" onClick={() => searchFunc()}>
                    Search
                </SearchButton>
                    <TableContainer component={Paper} className={classes.table}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                    {(category==="findMovie" || category==="findTV")  && 
                                        <TableRow>
                                            <TableCell style={{fontWeight: 'bold'}}>Title</TableCell>
                                            <TableCell align="right" style={{fontWeight: 'bold'}}>Director</TableCell>
                                            <TableCell align="right" style={{fontWeight: 'bold'}}>Cast</TableCell>
                                            <TableCell align="right" style={{fontWeight: 'bold'}}>Country</TableCell>
                                            <TableCell align="right" style={{fontWeight: 'bold'}}>Release Year</TableCell>
                                        </TableRow> 
                                    }
                                    {(category==="findArtist")  && 
                                        <TableRow>
                                            <TableCell style={{fontWeight: 'bold'}}>Title</TableCell>
                                        </TableRow> 
                                    }
                            </TableHead>
                            <TableBody>
                                {(category==="findMovie" || category==="findTV") && 
                                movies.map((row) => (
                                    <TableRow key={row.title}>
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="right">{row.director}</TableCell>
                                    <TableCell align="right">{row.cast}</TableCell>
                                    <TableCell align="right">{row.country}</TableCell>
                                    <TableCell align="right">{row.release_year}</TableCell>
                                    </TableRow>
                                ))}
                                {category==="findArtist" && 
                                movies.map((row) => (
                                <TableRow key={row.title}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                disableBackdropClick='true'
                className={classes.modal}
            >
                {body}
            </Modal>
            <h2 style={{color: 'white'}}>Número total de peliculas: {count}</h2>
            </ThemeProvider>
            
            
        </form>
        




    );


}

export default SearchScreen;