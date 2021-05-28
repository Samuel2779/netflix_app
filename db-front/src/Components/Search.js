import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

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
}));





//----------------------------------------

//Styled components CSS

const SearchBar = styled(TextField)({
    marginLeft: '0% !important',
    color: 'white !important',
    marginTop: '22vw !important'

})

const Dropdown = styled(TextField)({
    marginRight: '1% !important',
    marginLeft: '16vw !important',
    width: '9vw !important',
    marginTop: '22vw !important'

})

const SearchButton = styled(Button)({
    marginLeft: '1% !important',
    width: '9vw !important',
    marginTop: '22.5vw !important'

})



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
    const [categories, setCategories] = React.useState('movieTitle');

    const handleChange = (event) => {
        setCategories(event.target.value);
    };


    const category = [
        {
            value: 'movieTitle',
            label: 'Movie Title',
        },
        {
            value: 'showTitle',
            label: 'TV Show Title',
        },
        {
            value: 'actor',
            label: 'Actor',
        },
        {
            value: 'year',
            label: 'TV Show by Year',
        },
        {
            value: 'country',
            label: 'Movie by Country',
        },
    ];





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
                    value={categories}
                    onChange={handleChange}
                >
                    {category.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Dropdown>

                <SearchBar id="standard-basic" label="Search Movies & TV Shows" variant="filled" />

                <SearchButton variant="contained" >
                    Search
                </SearchButton>
            </ThemeProvider>
        </form>




    );


}

export default SearchScreen;