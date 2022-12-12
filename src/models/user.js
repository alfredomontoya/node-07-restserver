const  { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio'],
        
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        reuired: [ true, 'La constraseña es oligatoria']
    },
    img: { type: String },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: { type: Boolean, default: true },
    google: { type: Boolean, default: false }
});

module.exports = model( 'User', UserSchema );