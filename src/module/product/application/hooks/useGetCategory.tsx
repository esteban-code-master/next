import { CategoryApi } from '@module/product/infrastructure/api/category';
import { useContainer } from 'inversify-react';
import { useEffect, useState } from 'react';
import { Category } from '../interface/category';

export const useGetCategory = () => {
	const [category, setCategory] = useState<Category[]>([]);
	const container = useContainer();
	const categoryApi = container.get<CategoryApi>('CategoryApi');

	useEffect(() => {
		categoryApi.get().then((response) => {
			setCategory(response);
		});
	}, []);

	return category;
};
