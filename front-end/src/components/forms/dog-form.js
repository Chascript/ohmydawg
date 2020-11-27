import { Button, Checkbox, FormControlLabel, FormLabel, Grid, Hidden, InputLabel, makeStyles, MenuItem, Paper, Select, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import {Spring} from 'react-spring/renderprops'
import { Favorite, FavoriteBorder, Pets } from '@material-ui/icons'
import MultilineTextBox from './inputs/multiline-text-input';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { FormHelperText, FormControl, } from '@material-ui/core';
import  dogDefault from './dog-not-chosen-default.png'

import React,{useState, useEffect} from 'react'
import TextBox from './inputs/text-input';
import FileUploadButton from './inputs/file-upload-button';
import ReviewDogForm from './review-dog-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  imageNotSelected:{
    display: 'flex',
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
  container:{
    paddingTop: 20
  },
  menuPaper: {
    maxHeight: 100
  },
}))



export default function DogForm(props) {
  const classes = useStyles()
  const [personality, setPersonality] = useState({
    intelligent: false,
    social: false,
    adventurous: false,
    loving: false,
    playful: false
  })
  const [breed, setBreed] = useState('')
  const [punchLine, setPunchLine] = useState('')
  const [reviewDog, setReviewDog] = useState(true)
  const [allBreeds, setAllBreeds] = useState([]);
  const [imagePreview, setImagePreview] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [dogDetailsForm,setDogDetailsForm] = useState({
    dogName: 'Manson',
    dogBreed: 'Poodle',
    dogDateOfBirth: null,
    dogShortBio: 'I love e a and eever hello dogs food cats',
    dogPunchLine: 'dwdwdw dw dw d w dw dw dwwdwdw dwdw ',
    dogPersonality: ['helll', 'efdeded', 'dedede', 'ededed'],
    file: true,
  })
  const [date, setDate] = useState(null)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
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
    setDate( new Date(date).toLocaleString())
    setDogDetailsForm({...dogDetailsForm, dogDateOfBirth:  new Date(date) })
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
      form.set('dogShortBio' , dogDetailsForm.dogShortBio)
      form.append('photo', dogDetailsForm.file, dogDetailsForm.file.name)

      fetch('http://localhost:5000/signup/newdog', {
        method: 'POST',
        body: form,
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(error => console.error(error))
  }

const closeReviewDog=() => {
  setReviewDog(false)
}

const addAnotherDog = () => {
  saveDog()
  document.getElementById('form').reset()
  setImagePreview(false)
  setPunchLine('')
  setBreed('')
  document.getElementById("button-file").value = ""
  setDogDetailsForm({...dogDetailsForm, 
    dogDateOfBirth: null,
    dogBreed: [false],
    dogPunchLine: false
  })
  closeReviewDog()
}

const saveDogNoNewDog = () => {
  saveDog()
}

 const openModal = () => {
  setErrorMessage(false)
  const formValues = Object.values(dogDetailsForm)
  const formError = [formValues.includes(false), formValues.includes(null)]
  if(formError[0] || formError[1] || formError[2]){
    setErrorMessage(true)
    console.error('not all fields are filled')
  } else{
      setReviewDog(true)
  }
}

const handleCheckboxChange = event => {
  setPersonality({...personality, [event.target.name]: event.target.checked})
  setDogDetailsForm({...dogDetailsForm, dogPersonality: true})
}
  
  return(    
  <Spring
    from={{ opacity: 0, marginTop: -16 }}
    to={{ opacity:1, marginTop:0 }}
    config={{duration:2000}}
    >
      {transition=> (
    <Grid container  style={transition} component={Paper} className={classes.container} justify='center'   alignItems='center' >
         <form id='form' >
         <Hidden smUp>   
            <Grid container  item xs={12} alignItems='center' justify='center' >
              <Grid item >
                <Typography component="h1" variant="h4">
                  {props.title} 
                </Typography>
              </Grid>
              <Grid item >
                <Pets className={classes.avatar}/>
              </Grid>    
            </Grid>  
          </Hidden>
            <Grid container item xs={12} sm={12} className={classes.container} justify='center' alignItems='center' >
              <Grid item sm={3}>
                <Grid container justify='center'>
                  {imagePreview ?(
                    <img className={classes.imageSelected} src={imagePreview} alt={dogDetailsForm.file.name} />
                    ):(
                    <img className={classes.imageNotSelected} src={dogDefault} alt="default"/>
                  )}
                </Grid>
                <Grid item  sm={10}>
                  <FileUploadButton
                    className={classes.button}
                    inputAccept='image/'
                    buttonText='Upload a photo of yourself'
                    errorMessage= {imagePreview && 'Please Select a jpeg or png file'}
                    fileName={imagePreview && dogDetailsForm.file.name}
                    multiple={false}
                    handleChange={handleFileChange}
                    isFileSelected={imagePreview}
                    size='small'
                  />
                </Grid>
              </Grid>
              <Grid container xs={10} item sm={8} spacing={2}>
              <Hidden xsDown>   
                <Grid container item sm={12} alignItems='center' justify='flex-start' >
                  <Grid item >
                    <Typography component="h1" variant="h4">
                      {props.title} 
                    </Typography>
                  </Grid>
                  <Grid item >
                    <Pets className={classes.avatar}/>
                  </Grid>    
                </Grid>  
                </Hidden>
                <Grid item>
                {errorMessage && <Typography color='error'>All Fields Are Required</Typography>}
                </Grid>
                <Grid container item justify={matches && 'center'} sm={12} spacing={2}>
                  <Grid item xs={10} sm={5}>
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
                  <Grid item xs={10} sm={5}>
                  <FormControl variant='outlined' fullWidth>
                  <InputLabel id="breed">What Breed Are You...?</InputLabel>
                      <Select
                        labelId="breed"
                        id="breed"
                        value={breed}
                        onChange={e => {
                          setBreed(e.target.value)
                          setDogDetailsForm({...dogDetailsForm, dogBreed: e.target.value})
                        }} 
                        MenuProps={MenuProps}
                        displayEmpty
                        >
                        {allBreeds.map(allBreeds => 
                          <MenuItem key={allBreeds} value={allBreeds}>{allBreeds}</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                      <DatePicker
                        invalidDateMessage='A Complete Date Is Required dd/mm/yyyy'
                        required
                        fullWidth
                        disableFuture={true}
                        value={dogDetailsForm.dogDateOfBirth}
                        inputVariant = "outlined"
                        label='Date Of Birth'
                        format="dd/MM/yyyy"
                        onChange={handleDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={10} sm={5} >
                  <TextField
                    fullWidth
                    id="punchline"
                    label="Punchline..." 
                    variant='outlined'
                    value={punchLine}
                    onChange={e=> {
                      setPunchLine(e.target.value)
                      setDogDetailsForm({...dogDetailsForm, dogPunchLine: e.target.value})
                    }} 
                    select>
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                      <MenuItem key='punchline1' value={`Hey! I'm ${dogDetailsForm.dogName} and I love cuddles with my human`}>{`Hey! I'm ${dogDetailsForm.dogName} and I love cuddles with my human`}</MenuItem>
                      <MenuItem key='punchline2' value={`Off out on an Adventure! It's ${dogDetailsForm.dogName} by the way`}>{`Off out on an Adventure! It's ${dogDetailsForm.dogName} by the way`}</MenuItem>
                      <MenuItem key='punchline3' value={`I'm ${dogDetailsForm.dogName} and I like to sniff dog butts`}>{`I'm ${dogDetailsForm.dogName} and I like to sniff dog butts`}</MenuItem>
                      <MenuItem key='punchline4' value={`What's up! It's ${dogDetailsForm.dogName} Chilling here`}>{`What's up! It's ${dogDetailsForm.dogName} Chilling here`}</MenuItem>
                  </TextField>
                </Grid>
                  <Grid item xs={10} sm={5}>
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
                          control={
                            <Checkbox 
                              icon={<FavoriteBorder color='secondary' />} 
                              onChange={handleCheckboxChange}
                              checked={personality.intelligent}
                              checkedIcon={<Favorite />} 
                              name="intelligent"
                            />
                          }
                          label="Intelligent"
                        />      
                      <FormControlLabel
                          control={
                            <Checkbox 
                              icon={<FavoriteBorder />} 
                              onChange={handleCheckboxChange}
                              checked={personality.loving}
                              checkedIcon={<Favorite />} 
                              name="loving"
                            />
                          }
                         label="Loving"
                        />      
                      <FormControlLabel
                          control={
                            <Checkbox 
                              icon={<FavoriteBorder />} 
                              onChange={handleCheckboxChange}
                              checked={personality.adventurous}
                              checkedIcon={<Favorite />} 
                              name="adventurous"
                            />
                          }
                          label="Adventurous"
                        />      
                      <FormControlLabel
                          control={
                            <Checkbox 
                              icon={<FavoriteBorder />} 
                              onChange={handleCheckboxChange}
                              checked={personality.social}
                              checkedIcon={<Favorite />} 
                              name="social"
                            />
                          }
                          label="Social"
                        />                          
                        <FormControlLabel
                        control={
                          <Checkbox 
                            icon={<FavoriteBorder />} 
                            onChange={handleCheckboxChange}
                            checked={personality.playful}
                            checkedIcon={<Favorite />} 
                            name="playful"
                          />
                        }
                        label="Playful"
                      />      
                    </FormControl>
                  </Grid>   
                  </Grid>
                  </Grid>                 
                   <Grid item container sm={12} justify='center' alignItems='center'>
                    <Grid item  sm={2}>
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
        </form>
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
      )}
</Spring>
  )
}
