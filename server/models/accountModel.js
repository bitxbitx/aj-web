const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const accountSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 6
        },
        birthdate: {
            type: Date,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            required: true,
            trim: true,
            enums: ['admin', 'user']
        },
        platformAccounts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'PlatformAccount',
            }
        ]
    },
    {
        timestamps: true,
    }
);

accountSchema.methods.toJSON = function () {
    const account = this;
    const accountObject = account.toObject();

    delete accountObject.password;
    delete accountObject.__v;

    return accountObject;
}

accountSchema.pre('save', async function (next) {
    const account = this;

    if (account.isModified('password')) {
        const salt = await bcrypt.genSalt(8);
        account.password = await bcrypt.hash(account.password, salt);
    }

    next();
})

accountSchema.methods.matchPassword = async function (password) {
    const account = this;
    return await bcrypt.compare(password, account.password);
}

module.exports = mongoose.model('Account', accountSchema);