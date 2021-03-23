import React, {useEffect, useState} from "react";
import {Subject} from "rxjs";
import {Movie} from "../../interfaces";
import Card from "./Card";

/**
Интерфейс обертки карточки
 */
interface CardWrapperProps {
    items: Movie[]
}

/**
 Создаем стрим subject$
 */
const subject$ = new Subject<Movie[]>();

/**
 Описываем методы изменения этого стрима
 */
export const movieService = {
    editMovie: (movies: Movie[]) => subject$.next(movies),  // колбек который добавляет в обработку новое значение стрима при помощи метода next
    onMovie: () => subject$.asObservable(),                 // для того что бы подписаться в нашем компоненте, необходимо использовать метод asObservable
};

/**
Обертка вывода наших карт с фильмами нужна для того что бы на этом уровне произошла
 */
const CardWrapper = (props: CardWrapperProps) => {

    /**
     Создаем стейт для удобства монипулирования данными
     */
    const [movies, setMovies] = useState<Movie[]>([]);

    /**
     В этом жизненом цикле у нас происходит подписка на наш стрим subject$,
     а в return (когда компонент умирает) происходит отписка.
     */
    useEffect(() => {
        const subscription = movieService.onMovie().subscribe(
            (movies: Movie[]) => setMovies(movies),
        );

        return subscription.unsubscribe;
    }, []);

    /**
     Проверка наличия данных, когда данные появились мы сохраняем в наш стейт
     */
    useEffect(() => {
        props.items && setMovies(props.items);
    }, [JSON.stringify(props.items)]);

    /**
     Передаем новое значение в наш стрим для обработки данных и изменения стейта обертки
     */
    function sendMessage(movie: Movie) {
        const temp: Movie[] = [];
        movies.map((item) => {
            if (item.id === movie.id) {
                temp.push(movie);
            } else {
                temp.push(item);
            }
        });
        movieService.editMovie(temp);
    }

    /**
     Мапим карточки
     */
    return <>
        {movies.map((item: Movie) => <Card key={`${item.id}`} item={item} setMovie={sendMessage}/>)}
    </>;
};

export default CardWrapper;

