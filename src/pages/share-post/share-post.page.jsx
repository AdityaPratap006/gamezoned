import React from 'react';
import './share-post.styles.scss';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const SharePostPage = () => {

    const [year, setYear] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [developer, setDeveloper] = React.useState('');
    const [type, setType] = React.useState('');

    const handleYearChange = event => {
        setYear(event.target.value);
    };

    const handleTitleChange = event => {
        setTitle(event.target.value);
    }
    const handleDeveloperChange = event => {
        setDeveloper(event.target.value);
    }

    const handleTypeChange = event => {
        setType(event.target.value);
    }

    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 },
        (_, i) => start + (i * step));

    const yearsArray = range(new Date().getFullYear(), 1980, -1);

    const yearMenuItemsList = yearsArray.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>);

    const gameTypesArray = ['Action','Adventure','Role Playing','Simulation','Sports','Strategy','Puzzle'];

    const typeMenuItemsList = gameTypesArray.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>);

    return (
        <div className='share-post-page'>
            <h4 onClick={() => {
                if (title === '' || title === null) {
                    window.alert('All fields are required!')
                }
            }} >Share with us the Game you are playing this week!</h4>
            <Grid container spacing={3} className='share-post-container'>
                <Grid item xs={12}>
                    <Paper className='paper' >
                        <TextField
                            required
                            id="standard-required"
                            label="Title Of Game"
                            placeholder="for ex: Need For Speed: The Run"
                            className='share-post-form-textField'
                            margin="normal"
                            onChange={handleTitleChange}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Paper className='paper'>
                        <TextField
                            required
                            id="standard-required"
                            label="Developer"
                            placeholder="for ex: Electronic Arts"
                            className='share-post-form-textField'
                            margin="normal"
                            onChange={handleDeveloperChange}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={`paper`}>
                        <FormControl className={'formControl'}>
                            <InputLabel required className='share-post-form-inputLabel' id="year-select-label">Year of Release</InputLabel>
                            <Select
                                
                                labelId="year-select-label"
                                id="year-select"
                                value={year}
                                onChange={handleYearChange}
                                className='share-post-form-select'
                            >
                                {
                                    yearMenuItemsList
                                }
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={`paper`}>
                        <FormControl className={'formControl'}>
                            <InputLabel required className='share-post-form-inputLabel' id="type-select-label">Type of Game</InputLabel>
                            <Select
                                
                                labelId="type-select-label"
                                id="type-select"
                                value={type}
                                onChange={handleTypeChange}
                                className='share-post-form-select'
                            >
                                
                                {
                                    typeMenuItemsList
                                }
                                <MenuItem key='Others' value="Others">
                                    <em>Others</em>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default SharePostPage
