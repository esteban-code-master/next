import { IProduct } from '@module/product/application/interface/product';
import { SwipeableDrawerProps } from '@mui/material';

export interface ProductDetailSwipeableProps extends SwipeableDrawerProps {
	product: IProduct;
}
