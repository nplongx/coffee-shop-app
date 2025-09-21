const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
    body: {
        name: Joi.string().required(),
        description: Joi.string().optional(),
        price: Joi.number().required().min(0),
        category: Joi.string().optional(),
        stock: Joi.number().optional().min(0),
    },
};
const getProducts = {
    query: {
        name: Joi.string().optional(),
        category: Joi.string().optional(),
        priceMin: Joi.number().optional().min(0),
        priceMax: Joi.number().optional().min(0),
        sortBy: Joi.string().optional(),
        limit: Joi.number().integer().min(1).optional(),
        page: Joi.number().integer().min(1).optional(),
    },
};
const getProduct = {
    params: {
        productId: Joi.string().custom(objectId),
    },
};
const updateProduct = {
    params: {
        productId: Joi.required().custom(objectId),
    },
    body: Joi.object()
        .keys({
            name: Joi.string(),
            description: Joi.string(),
            price: Joi.number().min(0),
            category: Joi.string(),
            stock: Joi.number().min(0),
        })
        .min(1),
};
const deleteProduct = {
    params: {
        productId: Joi.string().custom(objectId),
    },
};
module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};

