//mangoose model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;

/*
ADMIN DOCUMENT
{
    "name": "Desu Raghavendra",
    "email": "desu.raghavendra2023@vitstudent.com",
    "password": "$2b$10$g.TQ.CKgXMTD/eHFwoM4UuSUBa.zFIIcK1o.u/Rw3aP2ZDXa0G2eW", 
    "role": "admin"
}
*/