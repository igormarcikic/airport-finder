import React, { useState, useContext } from 'react';
import { Context } from './../context/Context';
import DisplayMap from './../layout/DisplayMap';
import { useForm } from './../hooks/useForm';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography,
  Box,
  FormControl,
  InputAdornment,
  Input,
  FormHelperText, 
  Button
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

const ByRadiusHome = () => {
    const classes = useStyles();
    const [airportData, setAirportData] = useState([]);
    const { location } = useContext(Context);
    const [radius, radiusHandler] = useForm('');

    
      // Fetch airport JSON
      const fetchAirports = async() => {
        const res = await fetch(`https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=${radius}&lng=${location.lng}&lat=${location.lat}`, {
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
            Find a nearby airport:
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl className={clsx(classes.margin, classes.textField)}>
            <Input
              type="number"
              value={radius}
              onChange={radiusHandler}
              endAdornment={<InputAdornment position="end">km</InputAdornment>}
            />
            <FormHelperText>Radius</FormHelperText>
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
          {airportData.length > 0 ? <DisplayMap airportData={airportData} /> : null }
        </div>
    )
}

export default ByRadiusHome;