const database = require('../models/index');

const productController = {
    getProducts: (req, res) => {
        database.Product.findAll(
            {
                order: [['id', 'ASC']],
                include: [{
                    model: database.ProductImages,
                    as: 'productImages',
                    required: true
                },
                {
                    model: database.ProductPromotions,
                    as: 'productPromotions',
                    required: true
                }]
            }
        ).then((data) => {
            res.status(200).render('buscar-produto', { productData: data });
        });
    },
    getSpecificProduct: (req, res) => {
        const { id } = req.params;
        database.Product.findByPk(id,
            {
                include: [{
                    model: database.ProductImages,
                    as: 'productImages',
                    required: true,
                },
                {
                    model: database.ProductPromotions,
                    as: 'productPromotions',
                    required: true
                }]
            }
        ).then((data) => {
            res.status(200).render('produto', { productData: data });
        });
    },
}

module.exports = productController;