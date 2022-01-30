export default class User {
    constructor (firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.id = Date.now().toString();
    }
}