const mongoose = require('mongoose');
const { Schema } = mongoose;

const platformSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        icon: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

platformSchema.methods.toJSON = function () {
    const platform = this;
    const platformObject = platform.toObject();

    delete platformObject.__v;

    return platformObject;
}

module.exports = mongoose.model('Platform', platformSchema);