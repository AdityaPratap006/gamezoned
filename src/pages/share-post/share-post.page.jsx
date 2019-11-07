import React from 'react';
import './share-post.styles.scss';

import { connect } from 'react-redux';


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const sharePost = async (userId, userName, title, year, developedBy, type)=>{

   return fetch('/.netlify/functions/post-create',{
        method:"POST",
        body:JSON.stringify({
            postedByUserId: userId,
            postedByUserName: userName,
            title: title,
            year: year,
            developedBy: developedBy,
            type: type,
            createdAt: new Date().toLocaleString(),
            likeCount: 0
        })
    })
    .then(res => res.json())
}


const SharePostPage = ({userId, userName}) => {

    console.log(userId, userName);

    const [year, setYear] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [developer, setDeveloper] = React.useState('');
    const [type, setType] = React.useState('');

    React.useEffect(() => {

    },[userId, userName])

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

    const isSubmissionValid = () => {
        if (title === '' ||  title === null || title === undefined) {
            return false;
        }
        if (developer === '' || developer === null || developer === undefined) {
            return false;
        }
        if (year === '' || year === null || year === undefined) {
            return false;
        }
        if (type === '' || type === null || type === undefined) {
            return false;
        }

        return true;
    }

    const handleSubmit = () => {

        if(isSubmissionValid()){
            
            sharePost(userId, userName, title, year, developer, type)
            .then(response => {

                console.log('posted!', response)
                window.alert('Post Shared! :)')
            })
            .catch(err => console.log(err))

        }else{
            window.alert('Please fill all the fields!')
        }
    }

    return (
        <div className='share-post-page'>
            <h4>Share with us the Game you are playing this week!</h4>
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
            <div className='submit-post-btn'  onClick={handleSubmit} >
                POST
            </div>
        </div>
    )
}

const mapStateToProps = state =>({
    userId: state.user.currentUser.faunadbUserId,
    userName: state.user.currentUser.data.name,
})


export default connect(
    mapStateToProps,
    null
)( SharePostPage )
