
import conn from '../config/config.js';

export async function fetchUserData(email) {
    // returns user with given email or undefined if doesn't exist, accepts optional connection to db, for use in transactions
    let user = await conn('users').select().where('email', email);
    return user[0];
}

export async function createUserData(user, db=conn) {
    // creates new user with the user data and returns the data, if user already exists it returns the user
    let newUser = await db('users').insert(user).onConflict('email').ignore().returning(['*']);

    if(! newUser[0]) {
        newUser = await fetchUserData(user.email);
        return newUser;
    }
    return newUser[0];
    
}

