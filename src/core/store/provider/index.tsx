'use client';

import { container } from '@core/inversify/inversify.config';
import { store } from '@core/store/index';
import { Provider as Test } from 'inversify-react';
import React from 'react';
import { Provider } from 'react-redux';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<Test container={container}>
			<Provider store={store}>{children}</Provider>
		</Test>
	);
};
