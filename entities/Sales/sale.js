const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    racketId: {
        type: Schema.Types.ObjectId, ref: 'Racket',
        required: true
    },
    saleDate: {
        type: String
    },
    importe: { 
        type: String
    }

});

const Sale = mongoose.model("Sale", saleSchema);
module.exports = Sale;