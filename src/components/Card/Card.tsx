import React, {useState} from "react";
import {Movie} from "../../interfaces";
import axios from "axios";

/**
Интерфейс карточки
 */
interface CardProps {
    item: Movie
    setMovie: (item: Movie) => void
}

/**
 Компонент карточки
 */
const Card = (props: CardProps) => {

    /**
     Некий стейт для отрисовки компонента
     */
    const [titleValue, setTitleValue] = useState( props.item.title);
    const [rateValue, setRateValue] = useState(props.item.rate.toString());
    const [edit, setEdit] = useState(false);

    /**
     В этом методе мы при помощи колбека setMovie отправляем новые данные в обработку стрима,  и делаем пост запрос на сервер чтобы изменить элемент
     */
    const saveMovieRequest = async () => {
        let newMovie = {
            id: props.item.id,
            rate: Number(rateValue),
            title: titleValue,
            image: props.item.image,
        };
        props.setMovie(newMovie);
        setEdit(!edit);
        await axios.post('/post', newMovie)
    };

    /**
     Рендер карточки
     */
    return (
        <div style={{padding: 10, display: "flex", flexFlow: "column"}}>
            <h1>Title: {props.item.title}</h1>
            <h3>Rate: {props.item.rate}</h3>
            <img style={{width: 300,height:'100%'}} src={props.item.image} alt={props.item.title}/>
            {!edit && <button onClick={() => setEdit(!edit)}>Редактировать</button>}
            {edit && <>
                <div>Title:</div>
                <input type="text" value={titleValue} onChange={event => setTitleValue(event.target.value)}/>
                <div>Rate:</div>
                <input type="number" value={rateValue} onChange={event => setRateValue(event.target.value)}/>
                <button onClick={saveMovieRequest}>Сохранить</button>
            </>}
        </div>
    );
};

export default Card;

