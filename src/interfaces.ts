export interface Movie {
    id: string,
    rate: number,
    title: string,
    image: string
}
export interface State {
    movies: Movie[],
}

export interface ActionInterface {
    type: string;
    payload: any;
}
