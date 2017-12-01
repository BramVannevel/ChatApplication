import { User } from './user.model';
import { Message } from './message.model';

export class ChatRoom {
    
    //Info
    private _id: string;
    private _owner: string;
    private _moderators;
    private _image: string;
    private _name: string;
    private _tags: string[];
    private _is_public: boolean;

    private _users;
    private _messages;

    //Stats
    private _likes: number;
    private _tUsers: number;

    constructor(name: string, users?: Array<User>, messages?: Array<Message>, owner?: string){
        this._users = users || new Array<User>();
        this._messages = messages || new Array<Message>();
        this._name = name;
        this._owner = owner;
    }

    setValues(owner: string, image: string, name: string, is_public: boolean, tags: string[]){
        this._owner = owner;
        this._image = image;
        this._name = name;
        this._is_public = is_public;
        this._tags = tags;
        this._likes = 0;
        this.tUsers = 0;
    }

    get id(){
        return this._id;
    }

    get users(){
        return this._users;
    }

    get messages(){
        return this._messages;
    }

    get owner(){
        return this._owner;
    }

    get image(){
        return this._image;
    }

    get name(){
        return this._name;
    }

    get is_public(){
        return this._is_public;
    }

    get tags(){
        return this._tags;
    }

    get likes(){
        return this._likes;
    }

    set likes(likes : number){
        this._likes = likes;
    }

    set tUsers(tUsers : number){
        this._tUsers = tUsers;
    }

    static fromJSON(json): ChatRoom {
        const rec = new ChatRoom(
            json.name, 
            json.users, 
            json.messages, 
            json.owner
        );
        rec._id = json._id;
        return rec;
    }

    toJSON(){
        return {
            _id: this._id,
            name: this.name,
            owner: this.owner,
            users: this.users,
            messages: this.messages,
        }
    }

}
