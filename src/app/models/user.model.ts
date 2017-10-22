export class User {
    private _email : string;
    private _username : string;

    constructor(name : string, email : string){
        this._email = email;
        this._username = name;
    }

    get email(){
        return this._email;
    }

    get username(){
        return this._username;
    }
}
