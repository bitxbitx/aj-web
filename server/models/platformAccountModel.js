const mongoose = require('mongoose');
const { Schema } = mongoose;

const platformAccountSchema = new Schema(
    {
        balance: {
            type: Number,
            required: true,
            trim: true,
            default: 0
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

platformAccountSchema.methods.toJSON = function () {
    const platformAccount = this;
    const platformAccountObject = platformAccount.toObject();

    delete platformAccountObject.__v;

    return platformAccountObject;
}

platformAccountSchema.post('populate', function (doc, next) {
    doc.populate('platform', function (err, doc) {
        if (err) return next(err);
        doc.populate('account', function (err, doc) {
            next();
        });
    });
});


const PlatformAccount = mongoose.model('PlatformAccount', platformAccountSchema);