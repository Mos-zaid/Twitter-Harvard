const bcrypt = require('bcrypt');
const validator = require("validator")
const usersCollection = require('../db').db().collection("users")



let User = function (data) {
    this.data = data
    this.errors = []
}


// 1. Sanitize
// 2. Validate
// 3. Store Sanitized and Validated data

// ..................................................................................
// @ Takes 2 arrays,
// @ one contain the required Fields,
// @ the other contains the list of fields that should not be trimed and lowecased
// ..................................................................................
User.prototype.cleanUp = function(reqField, dontChange) {
    temp = {}
    // Make sure only fields in reqField are returned
    if(reqField){
        for (let field of reqField) {
            if (this.data.hasOwnProperty(field)){
                temp[field]= this.data[field]
            }
        }
        // Update the data
        this.data = temp
    }

    // Clean Up data by removing whitespace and making it lowercase
    if(dontChange){
        for (const [key, value] of Object.entries(this.data)) {
            if (!dontChange.includes(key)){
                this.data[key] = value.trim().toLowerCase()
            }
        }
    }else{
        for (const [key, value] of Object.entries(this.data)) {
            this.data[key] = value.trim().toLowerCase()
        }
    }
}

User.prototype.cleanUpLogin = function() {

    if (typeof(this.data.username) != "string") {this.data.username = ""}
    if (typeof(this.data.email) != "string") {this.data.email = ""}

    this.data = {
        username: this.data.username.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.validateReg = function() {
    return new Promise(async (resolve, reject) => {
        if (typeof(this.data.fullname) != "string") {this.data.fullname = ""}
        if (typeof(this.data.email) != "string") {this.data.email = ""}
        if (typeof(this.data.twitterUsername) != "string") {this.data.twitterUsername = ""}

        var regex = /^[\w\-\s]+$/
        if (this.data.fullname == "") {this.errors.push("You must provide your full name.")}
        if (this.data.fullname != "" && !regex.test(this.data.fullname)) {this.errors.push("Name can only contain letters and numbers.")}
        if (this.data.twitterUsername == "") {this.errors.push("You must provide your Twitter Username.")}
        // if (this.data.email == "") {this.errors.push("You must provide your email.")}
        if (!validator.isEmail(this.data.email)) {this.errors.push("You must provide a valid email address.")}

        // Only if email is valid then check to see if it's already taken
        if (validator.isEmail(this.data.email)) {
            let emailExists = await usersCollection.findOne({email: this.data.email})
            if (emailExists) {this.errors.push("That email is already being used.")}
        }

        resolve()
    })
}

User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        let reqField = ['username', 'password']
        let dontChange = ['password']

        // Remove extra Fields that were not requested, strip and lowecase input
        this.cleanUp(reqField, dontChange)

        usersCollection.findOne({username: this.data.username}).then((attemptedUser) => {
            // if (attemptedUser && this.data.password == attemptedUser.password) {
            if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
                this.data = attemptedUser
                resolve("Congrats!")
            } else {
                reject("Invalid username / password.")
            }
        }).catch(function() {
            reject("Please try again later.")
        })
    })

}

User.prototype.register = function() {

    return new Promise(async (resolve, reject) => {
        let reqField = ['fullname', 'twitterUsername', 'email']
        let dontChange = ['fullname']

        // Remove extra Fields that were not requested, strip and lowecase input
        this.cleanUp(reqField, dontChange)

        // Validate User Input
        await this.validateReg()

        // Save in DB
        if(!this.errors.length){
            await usersCollection.insertOne(this.data)
            resolve('Congrats, We will send you an email once we have started beta testing')
        } else {
            reject(this.errors)
        }

        resolve()
    })
}

module.exports = User