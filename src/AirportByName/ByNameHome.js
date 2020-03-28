import React, { useContext, useState } from 'react'
import { Context } from './../context/Context';
import { useForm } from './../hooks/useForm';
import DisplayMap from './../layout/DisplayMap';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Typography,
    Box,
    FormControl,
    Input,
    FormHelperText,
    Button,


} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      height: `calc(30vh - ${theme.appBar.height}px)`,
    },
    inputBox: {
  
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      margin: theme.spacing(4),
    },
  }));

const ByNameHome = () => {
    const {lat, lng} = useContext(Context);
    const [airportData, setAirportData] = useState([]);
    const classes = useStyles();
    const [ name, nameHandler] = useForm('');

    const fetchAirports = async() => {
        const res = await fetch(`https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-text?text=${name}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
                "x-rapidapi-key": "53205daddemsh34fc06c1c791bf0p142a44jsn13f8d34be766"
            }
        })
        const data = await res.json()
        setAirportData(data);
      }

    return (
        <div className={classes.root}>
            <Typography
                variant="h4"
                component="h4"
                align="center"
            >
                Find airport by city:
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl className={clsx(classes.margin, classes.textField)}>
            <Input
              type="text"
              value={name}
              onChange={nameHandler}
            />
            <FormHelperText>City name</FormHelperText>
          </FormControl>
          <Button 
            className={clsx(classes.margin )}
            variant="contained" 
            color="primary"
            onClick={()=> fetchAirports()}
          >
            Find 
          </Button>
          </Box>
          <hr />
          {airportData.length>0 ? <DisplayMap lat={lat} lng={lng} airportData={airportData} /> : null }
        </div>
    )
}

export default ByNameHome;