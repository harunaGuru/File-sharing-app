const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const fileScheme = new Scheme({
    fileName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: false
    },
    sender: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("file", fileScheme)