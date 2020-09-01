import React from 'react';
// import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    height: '100%',
  },
  chip: {
    margin: '0 5px',
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
  },
  weeklyTime: {
    marginRight: '10px',
  },
}));

export const ContributorCard = ({ contributor }) => {
  const classes = useStyles();
  const {
    name,
    description,
    link,
    skill,
  } = contributor;
  var firstLetter = (typeof(skill) == "undefined") ? "" : skill.charAt(0).toUpperCase();
 
  return (
    <ListItem disableGutters>
      <Card classes={{ root: classes.card }}>
      <Avatar>{firstLetter}</Avatar>
      
      <CardActionArea>
         <CardHeader
          title={name} 
          subheader={skill}
        />
        <CardContent>
          <Typography paragraph> {description}</Typography>
          <Typography > <a href= {link}>
            {link}
          </a> </Typography>
        </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
};
