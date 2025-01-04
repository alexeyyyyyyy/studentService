export default class StudentDto {
    private _id: number;
    private _name: string;
    private _scores: Record<string, number>;

    constructor(id: number, name: string, scores: Record<string, number>) {
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

    get scores(): Record<string, number> {
        return this._scores;
    }


    set name(name: string) {
        this._name = name;
    }

    set scores(scores: Record<string, number>) {
        this._scores = scores;
    }
}
