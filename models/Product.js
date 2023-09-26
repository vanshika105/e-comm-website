const { model, Schema, models } = require("mongoose")

const productSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    images: {type: [String]},
})

export const Product = models.Product || model('Product', productSchema);