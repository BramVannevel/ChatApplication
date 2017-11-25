import { ChatRoom } from './chat-room.model';

export class User {
    private _id: String;
    private _email : string;
    private _username : string;
    private _country: string;
    private _likedCR: [String];
    private _friends: User[];
    private _privateCH;
    private _groupCH;

    constructor(name : string, email : string, country: string, friends?: Array<User>, privateCH?: Array<ChatRoom>, groupCH?: Array<ChatRoom>){
        this._email = email;
        this._username = name;
        this._country = country;
        this._friends = friends || new Array<User>();
        this._privateCH = privateCH || new Array<ChatRoom>();
        this._groupCH = groupCH || new Array<ChatRoom>();
    }

    get id(){
        return this._id;
    }

    get friends(){
        return this._friends;
    }

    get email(){
        return this._email;
    }

    get username(){
        return this._username;
    }

    get country(){
        return this._country;
    }

    get privateCH(){
        return this._privateCH;
    }

    get groupCH(){
        return this._groupCH;
    }

    static fromJSON(json): User {
        const rec = new User(json.username, json.email, json.country, json.friends, json.privateCH, json.groupCH);
        rec._id = json._id;
        return rec;
    }

    toJSON(){
        return {
            _id: this._id,
            email: this._email,
            username: this._username,
            country: this._country,
            friends: this._friends,
            privateCH: this._privateCH,
            groupCH: this._groupCH
        }
    }
}
