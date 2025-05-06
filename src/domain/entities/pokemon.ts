

export interface Pokemon {
    id: number;
    name: string;
    types:[];
    avatar: string;
    sprites: string[];

    //Todo
    color: string;

    games:string[];
    stats: Stat[];
    abilities: string[];
    moves: Move[];
}

export interface Stat{
    name: string;
    value: number;
}

export interface Move {
    name: string;
    level: number;
}
