export class Message {
    private _text: string;
    private _sender: string;

    constructor(text: string, sender: string){
        this._text = text;
        this._sender = sender;
    }

    get text(){
        return this._text;
    }

    get sender(){
        return this._sender;
    }
}
