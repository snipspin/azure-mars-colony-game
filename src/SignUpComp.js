import React, {useEffect, useState} from 'react'
import {Box, FormControl, Input, InputLabel, Button} from '@material-ui/core'
import {Redirect} from 'react-router-dom'
import Snackbar, {SnackbarOrigin} from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const SignUpCom = (props) => {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [sendHome, setSendHome] = useState(false)
    const [open, setOpen] = useState(false)
    const [passwordInfo, setPasswordInfo] = useState(false)
    const position = {
        vertical: 'top',
        horizontal: 'center'
    }
    useEffect(() => {
        setMessage('')
    }, [user, email, password])
    
    const handleOpen = ()=> {
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }
        setOpen(false);
    }
    
    const checkLength = (event,minLen)=> {
        let target = event.target
            if (target.value.length < minLen ) {
                setMessage('Password has to be 12 characters long')
            handleOpen();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            email,
            user,
            password
        }
        fetch(`http://localhost:8080/api/signup`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then ((response) => {
            response.json().then(result => {
                if(response.ok) {
                    props.updateUser(result)
                    props.setSignedIn(true)
                //props.updateUser(result.token)
                } else {
                    setMessage(`${response.status} ${response.statusText}: ${result.message}`)
                }
            }).catch( (err) => console.log(err))
        }).catch( (err) => {
            console.log('Error', err)
            setMessage(`Error: ${err.toString()}`)
        })
    }
    const handleRedirect = (e) => {
        e.preventDefault()
        setRedirect(true)
    }
    const handleHome = (e) => {
        e.preventDefault()
        setSendHome(true)
    }
    if(sendHome) {
        return <Redirect to="/" />
    }
    if(props.signedIn){
        return <Redirect to="/" />
    }

    return(
        <Box style={{"margin": "0 auto", "textAlign":"center"}}>
            <h2 className="signup">Create an Account:</h2>
            <FormControl>
                <InputLabel htmlFor="firstname">user:</InputLabel>
                <Input id="first-name" name="firstname" aria-describedby="first-name-form" 
                onChange={(e) => setUser(e.currentTarget.value)} required />
            </FormControl>              
            <FormControl>
                <InputLabel htmlFor="email">Email:</InputLabel>
                <Input id="email" name="email" aria-describedby="email-form" 
                onChange={(e) => setEmail(e.currentTarget.value)} required />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">Password:</InputLabel>
                <Input type="password" name="password" aria-describedby="password-form" 
                onBlur={(e) =>{
                    checkLength(e, 12)
                    setPasswordInfo(false)
                }}
                onFocus={(e) => setPasswordInfo(true)}
                onChange={(e) => setPassword(e.currentTarget.value)} required/>
            </FormControl>
            <Box className="password-info">
            <span>{passwordInfo ? 'Password is required to be 12 characters long':''}</span>
            </Box>
            <Button style={{marginTop: "20px"}} onClick={e => handleSubmit(e)} variant="outlined" className="submit-button">Sign Up</Button>
            <Box>
                <p className="login">Cancel: &nbsp;
                    <Button onClick={(e) => handleHome(e)} variant="outlined">Go Home</Button>
                </p>
            </Box>
        <Snackbar anchorOrigin={position} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      </Box>
    )
}
export default SignUpCom