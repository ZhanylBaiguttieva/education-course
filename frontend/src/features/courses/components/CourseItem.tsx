
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import {apiURL} from '../../../utils/constants.ts';
import React from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  styled
} from '@mui/material';


const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});
interface Props {
  id: string;
  title: string;
  price: number;
  image: string | null;
  category: string;
}

const CourseItem: React.FC<Props> = ({title, price, id, image, category}) => {
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={title}/>
        <ImageCardMedia image={cardImage} title={title}/>
        <CardContent>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <strong>{price} KGS</strong>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <IconButton component={Link} to={'/courses/' + id}>
                <ArrowForwardIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CourseItem;