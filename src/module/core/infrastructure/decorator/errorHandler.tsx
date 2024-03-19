export const ErrorHandler = (
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor
) => {
	const originalMethod = descriptor.value;

	descriptor.value = async function (...args: any[]) {
		try {
			return await originalMethod.apply(this, args);
		} catch (error) {
			console.error(`Error en el método ${propertyKey}:`, error);
			throw error;
		}
	};

	return descriptor;
};
