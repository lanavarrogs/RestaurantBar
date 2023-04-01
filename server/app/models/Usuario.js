import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'gerente'],
        default: 'user'
    },
    token: {
        type: String,
    }
});

usuarioSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
