import uuidv4  from 'uuid/v4';

export const createProduct = (productsList, product ) => {
	const newProuct = {
		id: uuidv4(),
		...product
	}
	productsList = [
		...productsList,
		newProuct
	];
	return newProuct;
};