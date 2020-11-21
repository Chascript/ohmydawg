import { Button, Checkbox, FormControlLabel, FormLabel, Grid, makeStyles, MenuItem, Paper, TextField, Typography } from '@material-ui/core'
import {Spring} from 'react-spring/renderprops'
import { Favorite, FavoriteBorder, Pets } from '@material-ui/icons'
import MultilineTextBox from './inputs/multiline-text-input';
import {MuiPickersUtilsProvider ,KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { FormHelperText, InputLabel, FormControl, Select, } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

import React,{useState, useEffect} from 'react'
import TextBox from './inputs/text-input';
import FileUploadButton from './inputs/file-upload-button';
import ReviewDogForm from './review-dog-form';
import { withStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  imageNotSelected:{
    display: 'flex',
    justifyContent: 'center',
    height: 300,
    width: 200,
  },
  imageSelected:{
    height: 300,
    width: 200,
    borderRadius: '50%',
    boxShadow: '0 1px 10px #404040'
  },
  button: {
    margin: theme.spacing(3, 0, 5),
  },  
  formControl: {
    width: 300,
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export default function DogForm(props) {
  const classes = useStyles()
  const [reviewDog, setReviewDog] = useState(false)
  const [allBreeds, setAllBreeds] = useState([]);
  const [imagePreview, setImagePreview] = useState(true)
  const [errorMessage, setErrorMessage] = useState(false)
  const [dogDetailsForm,setDogDetailsForm] = useState({
    dogName: 'heeeeeeeeelo',
    dogBreed: true,
    dogDateOfBirth: true,
    dogShortBio: true,
    dogPunchLine: true,
    dogPersonality: true,
    file: true,
  })
const [date, setDate] = useState(null)

  const handleFileChange = (e) => { 
    const types = ['image/png', 'image/jpeg'];
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setDogDetailsForm({...dogDetailsForm, file: selected})
      setImagePreview(URL.createObjectURL(selected))
    } else {
      setDogDetailsForm({...dogDetailsForm, file: false})
      setImagePreview(false)
    }
  }

  const handleDateChange = (date) => {
    setDate(Date(date).toLocaleString())

    setDogDetailsForm({...dogDetailsForm, dogDateOfBirth: date })
  }

  const fetchBreeds = async () => {
    try{
      const response = await (await fetch('http://localhost:5000/dogs/breeds')).json()
      setAllBreeds(response)
      }
    catch(error){
      console.error(error)
    }
  }
  useEffect(() => {
    fetchBreeds()
    }, []);

  const saveDog = () => {         
      const form = new FormData();
      form.append('usernameValue', props.usernameValue)
      form.set('dogName', dogDetailsForm.dogName)
      form.set('dogBreed', dogDetailsForm.dogBreed)
      form.set('dogDateOfBirth', dogDetailsForm.dogDateOfBirth)
      form.set('dogPersonality', dogDetailsForm.dogPersonality)
      form.set('dogPunchLine', dogDetailsForm.dogPunchLine)
      form.append('photo', dogDetailsForm.file, dogDetailsForm.file.name)

      fetch('http://localhost:5000/signup/newdog', {
        method: 'POST',
        body: form,
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error))
  }

const closeReviewDog=() => {
  setReviewDog(false)
}

const addAnotherDog = async () => {
  await saveDog()
  document.getElementById('form').reset()
  setImagePreview(true)
  setDogDetailsForm({...dogDetailsForm, file: false})
  document.getElementById("button-file").value = ""
  closeReviewDog()
}

const saveDogNoNewDog = () => {
  saveDog()
}

 const openModal =() => {
  setErrorMessage(false)
  const formValues = Object.values(dogDetailsForm)
  const formError = [formValues.includes(false), formValues.includes(null), formValues.includes('Invalid Date')]
  console.log(formValues)
  console.log(formError)
  // need to fix error on datepicker
  if(formError[0] || formError[1]||formError[2]){
    setErrorMessage(true)
    console.log('error')
  } else{
      setReviewDog(true)
  }
}


  
  return(
    <Grid container component={Paper} spacing={4} sm={9} justify='center'   alignItems='center' >
      <Grid container item sm={12}  > 
         <form id='form' >
            <Grid container sm={12} justify='center' alignItems='center'>
              <Grid container item sm={4} >
                <Grid item justify='center' sm={10}>
                  {imagePreview ?(
                    <img className={classes.imageSelected} src={imagePreview} alt={dogDetailsForm.file.name} />
                    ):(
                    <img className={classes.imageNotSelected} src={require('./dog-not-chosen-default.png')} alt="default"/>
                  )}
                </Grid>
                <Grid item sm={10}>
                  <FileUploadButton
                    className={classes.button}
                    inputAccept='image/'
                    buttonText='Upload a photo of yourself'
                    errorMessage='Please Select a jpeg or png file'
                    fileName={imagePreview && dogDetailsForm.file.name}
                    multiple={false}
                    handleChange={handleFileChange}
                    isFileSelected={imagePreview}
                    size='small'
                  />
                </Grid>
              </Grid>
              <Grid container sm={8} spacing={2}>
                <Grid container item sm={12} alignItems='center' justify='flex-start'>
                  <Grid item >
                    <Typography component="h1" variant="h4">
                      {props.title} 
                    </Typography>
                  </Grid>
                  <Grid item justify='center' >
                    <Pets className={classes.avatar}/>
                  </Grid>    
                </Grid>  
                <Grid item>
                {errorMessage && <Typography color='error'>All Fields Are Required</Typography>}
                </Grid>
                <Grid container sm={12} spacing={2}>
                  <Grid item sm={5}>
                    <TextBox 
                      label='What do your humans call you?'
                      id='dogName'
                      placeholder='Dogs Name'
                      type='text'
                      required={true}
                      errorFunc={dogDetailsForm.dogName.length < 1}
                      errorMessage='name is required'
                      handleChange={e => setDogDetailsForm({...dogDetailsForm, dogName: e.target.value})}
                    />
                  </Grid>
                  <Grid item sm={5} >
                    <TextField
                      fullWidth
                      id="breed"
                      label="What Breed Are You..." 
                      variant='outlined'
                      value={dogDetailsForm.dogBreed}
                      error={dogDetailsForm.dogBreed.length < 1}
                      name= 'breed'
                      onChange={e => setDogDetailsForm({...dogDetailsForm, dogBreed: e.target.value})}
                      select
                      >
                      
                      {allBreeds.map(allBreeds => 
                        <MenuItem value={allBreeds}>{allBreeds}</MenuItem>
                      )}
                    </TextField>
                  </Grid>
                  <Grid item sm={5}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        invalidDateMessage='A Complete Date Is Required dd/mm/yyyy'
                        required
                        fullWidth
                        disableFuture={true}
                        value={dogDetailsForm.dogDateOfBirth}
                        inputVariant = "outlined"
                        label='Date Of Birth'
                        format="dd/mm/yyyy"
                        onChange={handleDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item sm={5} >
                  <TextField
                    fullWidth
                    id="punchline"
                    label="Punchline..." 
                    variant='outlined'
                    value={dogDetailsForm.dogPunchLine}
                    onChange={e=> setDogDetailsForm({...dogDetailsForm, dogPunchLine: e.target.value})} 
                    select>
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                      <MenuItem value={`Hey! I'm ${dogDetailsForm.dogName} and I love cuddles with my human`}>{`Hey! I'm ${dogDetailsForm.dogName} and I love cuddles with my human`}</MenuItem>
                      <MenuItem value={`Off out on an Adventure! It's ${dogDetailsForm.dogName} by the way`}>{`Off out on an Adventure! It's ${dogDetailsForm.dogName} by the way`}</MenuItem>
                      <MenuItem value={`I'm ${dogDetailsForm.dogName} and I like to sniff dog butts`}>{`I'm ${dogDetailsForm.dogName} and I like to sniff dog butts`}</MenuItem>
                      <MenuItem value={`What's up! It's ${dogDetailsForm.dogName} Chilling here`}>{`What's up! It's ${dogDetailsForm.dogName} Chilling here`}</MenuItem>
                  </TextField>
                </Grid>
                  <Grid item sm={5}>
                    <MultilineTextBox 
                      label='About Me*'
                      id='about-me'
                      numOfRows='3'
                      placeholder='A bit about you!'
                      required={false}
                      error={dogDetailsForm.dogShortBio.length > 1}
                      handleChange={e => setDogDetailsForm({...dogDetailsForm, dogShortBio: e.target.value})}
                    />
                    {dogDetailsForm.dogShortBio.length < 1 && <FormHelperText error >About Me Is Required</FormHelperText> }
                  </Grid>     
                  <Grid item >
                    <FormControl required >
                    <FormLabel component="legend">Your Personality! (Can Pick Multiple!)</FormLabel>
                      <FormControlLabel
                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                        label="Custom icon"
                      />      
                      <FormControlLabel
                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                        label="Custom icon"
                      />      
                      <FormControlLabel
                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                        label="Custom icon"
                      />    
                      <FormControlLabel
                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                        label="Custom icon"
                        />
                    </FormControl>
                  </Grid>   
                  <Grid item container sm={12} justify='center' alignItems='center'>
                    <Grid item  sm={4}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => openModal()}
                      >
                      Create Dawg!
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
        </form>

      </Grid>
      <Grid container justify='center' alignItems='center' sm={12} >
        {reviewDog &&
          <ReviewDogForm 
            dogName={dogDetailsForm.dogName} 
            dogBreed={dogDetailsForm.dogBreed} 
            dogDateOfBirth={date}
            dogShortBio={dogDetailsForm.dogShortBio}
            dogPunchline={dogDetailsForm.dogPunchLine}
            dogPersonality={dogDetailsForm.dogPersonality}
            dogPhoto={imagePreview}
            handleAddNewDogClick={()=> addAnotherDog()}
            handleSaveDogNoNewDog={()=> saveDogNoNewDog()}
            handleClose={()=> closeReviewDog()}
            review={reviewDog}
          />
        }
      </Grid>
    </Grid>
  )
}