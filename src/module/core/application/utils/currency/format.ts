export const formatCurrency = (
	amount: number,
	locale: string = 'es-MX',
	currency: string = 'MXN'
) => {
	const formattedAmount = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency
	}).format(amount);

	return formattedAmount.replace(currency, '') + ` ${currency}`;
};