export default class StudentDto{
    private _id:number;
    private _name:string;
    private _scores:object;


    constructor(id: number, name: string, scores: object) {
        this._id = id;
        this._name = name;
        this._scores = scores;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get scores(): object {
        return this._scores;
    }
}