const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name : {type: String, required: true},
        email : {type: String, required: true, unique: true},
        password : {type: String, required: true},
        isAdmin : {
            type: Boolean, 
            // required: true, 
            default: false},
    },
    {
        timestamps: true
    }
);

//validate password match
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//register password hash and store
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) { // kiểm tra xem mk có thay đổi k , nếu k thì next
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // băm mk hiện tại kết hợp với salt , sau khi băm lưu lại
});

module.exports = mongoose.model("User", userSchema);