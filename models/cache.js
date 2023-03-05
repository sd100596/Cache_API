const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    createdAt: { type: Date, expires: 3600, default: Date.now }
}
);

module.exports = mongoose.model('Cache', cacheSchema);