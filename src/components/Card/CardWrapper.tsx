import React, {useEffect, useState} from "react";
import {Movie} from "../../interfaces";
import Card from "./Card";
import {movieService} from "./stream";
import axios from "axios";

/**
 Интерфейс обертки карточки
 */
interface CardWrapperProps {
    items: Movie[]
}

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

        const storeSubscription = movieService.onMovie().subscribe({
                next: async (movie: Movie) => {
                    await axios.post("/post", movie);
                },
            },
        );

        const subscription = movieService.onMovie().subscribe(
            (movie: Movie) => setMovies((movies) => movies.map(currentMovie => {
                if (currentMovie.id !== movie.id) {
                    return currentMovie;
                }
                return {...movie};
            })),
        );

        return () => {
            subscription.unsubscribe();
            storeSubscription.unsubscribe();
        }
    }, []);

    /**
     Проверка наличия данных, когда данные появились мы сохраняем в наш стейт
     */
    useEffect(() => {
        setMovies(props.items);
    }, [JSON.stringify(props.items)]);

    /**
     Мапим карточки
     */
    return <>
        {movies.map((item: Movie) => <Card key={`${item.id}`} item={item}/>)}
    </>;
};

export default CardWrapper;

