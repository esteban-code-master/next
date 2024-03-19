import { SvgIcon } from '@mui/material';
import FilterSvg from '/public/icons/filter.svg';
import HomeSvg from '/public/icons/toolbar/home.svg';
import QrSvg from '/public/icons/toolbar/qr.svg';
import ShopCartSvg from '/public/icons/toolbar/shop-cart.svg';
import TicketSvg from '/public/icons/toolbar/ticket.svg';

export const HomeIcon = () => <SvgIcon component={HomeSvg} />;
export const QrIcon = () => <SvgIcon component={QrSvg} />;
export const ShopCartIcon = () => <SvgIcon component={ShopCartSvg} />;
export const TicketIcon = () => <SvgIcon component={TicketSvg} />;
export const FilterIcon = (props: any) => (
	<SvgIcon component={FilterSvg} {...props} />
);
