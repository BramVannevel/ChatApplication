import {User} from './user.model';

export class Message {
    private _id: string;
    private _text: string;
    private _user: string;
    private _timestamp: Date;

    constructor(text: string, user: string){
        this._text = text;
        this._user = user;
        this._timestamp = new Date();
    }

    get id(){
        return this._id;
    }

    get text(){
        return this._text;
    }

    get user(){
        return this._user;
    }

    get timestamp(){
        return this._timestamp;
    }

    toJSON(){
        return {
            _id: this._id,
            text: this._text,
            timestamp: this._timestamp,
            user: this.user
        }
    }
}
