import db from "../models/index"
import bcrypt from 'bcryptjs'

let handleUserLogin = (email, password) => {
    return new Promise( async (resolve, reject) => {
        try {
            let userData = {};
            let isExits = await checkUserEmail(email)
            if (isExits) {
                //user is already exits
                 let user = await db.User.findOne({
                    attributes: ['email', 'password'],
                    where: {email: email},
                    raw: true
                 })
                 if (user) {
                    let check = await bcrypt.compareSync( password, user.password)
                    if (check){
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password"
                    }
                 } else {
                    userData.errCode = 2,
                    userData.errMessage = "User is not found! "
                 }
            } else {
                //return error
                userData.errCode = 1,
                userData.errMessage = "Your's Email isn't exits in your system. Plz try other email! "   
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (emailUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: emailUser}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail
}
