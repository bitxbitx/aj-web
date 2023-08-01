const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const resultSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
            trim: true,
        },
        account: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },
        platform: {
            type: Schema.Types.ObjectId,
            ref: 'Platform',
            required: true
        }
    },
    {
        timestamps: true,
    }
);

resultSchema.plugin(AutoIncrement, {inc_field: 'resultNo'});

module.exports = mongoose.model('Result', resultSchema);
