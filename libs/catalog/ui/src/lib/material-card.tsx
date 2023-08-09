import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
} from '@mui/material';
import { Material } from '@open-screen-shop/catalog/model';
import { SlPlus } from 'react-icons/sl';

type BaseProps = {
  className?: string;
  style?: React.CSSProperties;
  material: Material;
  showAddToCart?: false;
};

export type MaterialCardProps =
  | BaseProps
  | (Omit<BaseProps, 'showAddToCart'> & {
      showAddToCart: true;
      addToCartLabel: string;
    });

export function MaterialCard(p: MaterialCardProps) {
  return (
    <Card className={p.className} style={p.style}>
      <CardHeader title={p.material.label}>
      </CardHeader>
        {p.material.imageUrl ? (
          <CardMedia image={p.material.imageUrl}></CardMedia>
        ) : null}
      {p.showAddToCart ? (
        <CardActions>
          <Button startIcon={<SlPlus />}>{p.addToCartLabel}</Button>
        </CardActions>
      ) : null}
    </Card>
  );
}
