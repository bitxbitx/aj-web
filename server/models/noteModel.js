const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
            trim: true,
        },
        method: {
            type: String,
            required: true,
            trim: true,
            enums: ['cash', 'card', 'transfer']
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            trim: true,
            enums: ['pending', 'approved', 'rejected']
        },
        account: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        }
    },
    {
        timestamps: true,
    }
);

noteSchema.methods.toJSON = function () {
    const note = this;
    const noteObject = note.toObject();

    delete noteObject.__v;

    return noteObject;
}

module.exports = mongoose.model('Note', noteSchema);