export default class Student {
    id: number;
    name: string;
    scores: Record<string, number>;

    constructor(id: number, name: string, scores: Record<string, number>) {
        this.id = id;
        this.name = name;
        this.scores = scores;
    }

    addScore(key: string, value: number) {

        if (this.scores[key] !== undefined) {
            throw new Error(`Scores with key ${key} are already in use`);
        }

        this.scores[key] = value;
    }
}
