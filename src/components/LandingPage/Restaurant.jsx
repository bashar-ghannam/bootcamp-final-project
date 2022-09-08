import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';

export default function Restaurant({ restaurant }) {
  const [showMore, setShowMore] = React.useState(false);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        style={{ objectFit: 'cover' }}
        image={require(`../../assets/${restaurant.img}`)}
        alt="green iguana"
      />
      <CardContent sx={{ p: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ m: 0 }}>
          {restaurant.name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} my={1}>
          <span>
            <QueryBuilderIcon />
          </span>
          <span>Working hours : {restaurant.workHours}</span>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {restaurant.description}
          {showMore
            ? restaurant.description
            : `${restaurant.description.substring(0, 20)}`}
          <span onClick={() => setShowMore(!showMore)} style={{ color: 'red' }}>
            {showMore ? ' Show less' : ' Show more...'}
          </span>
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to={`/restaurants/${restaurant._id}`}
          style={{
            textDecoration: 'none',
            color: '#e65100',
            fontWeight: 'bolder',
          }}
        >
          Show all meals
        </Link>
      </CardActions>
    </Card>
  );
}
