import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { ErrorBanner } from '../../lib/components';
import { Toolbar } from '../../components';
import { ContributorCard, ContributorSkeleton } from './components';
import { getContributors } from '../../lib/api/getContributors';
import { useQuery } from 'react-query';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles({
  list: {
    width: '70%',
  },
  container: {
    minHeight: '100%',
    width: '100%',
    padding: '16px',
  },
});

export const Contributor = () => {
  const classes = useStyles();
  const {data, isFetching, status, error} = useQuery('contributors', getContributors,
  {
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
    onError: (err) => {
      if (err.response.status === 404) {
        console.log(err.response);
      }
    },
  }
  );

  if (status === 'loading') {
    return (
      <Container classes={{ root: classes.container }}>
       <ContributorSkeleton />
      </Container>
    );
  }

  if (status === 'error') {
    return (
      <Container classes={{ root: classes.container }}>
        <ErrorBanner error={error} message={error.message} />
        <ContributorSkeleton />
      </Container>
    );
  }

  const sortContributors = (contributorsParam) => {
    return [...contributorsParam].sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      if(b.skill > a.skill)
      {return -1;}
      if(b.skill < a.skill)
      {return 1;}
       return -1;
    });
};

const dataSource = sortContributors(data);

  return (
    <Container classes={{ root: classes.container }}>
      <Toolbar />
      <AppBar position="relative">
          <Typography variant="h5" component="h1" color="inherit" noWrap>
            Contributor
          </Typography> 
      </AppBar>
      <GridList cellHeight={280} className={classes.gridList} cols={2}>
      {isFetching && <ContributorSkeleton />}
        {!isFetching &&
         data &&
         dataSource.map((tile) => (
          <GridListTile key={tile.name}>
           <ContributorCard contributor = {tile}/>
          </GridListTile>
        ))}
      </GridList>
      
    </Container>
  );
};
