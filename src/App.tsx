import React, {useEffect} from "react";
import reducer from "./reducer";
import axios from "axios";
import CardWrapper from "./components/Card/CardWrapper";

const App = () => {

    /**
     Создаем центральный стор в котором мы будем хранить фильмы которые получили при первом заходе на страницу
     тот же редакс только при помощи хуков, на это не обращаем внимания
     */
    const [state, dispatch] = React.useReducer(reducer, {
        movies: [],
    });

    /**
    Получаем данные с сервера перед первым рендером приложения
     */
    useEffect(() => {
        getData();
    }, []);

    /**
     Запрос на получение фильмов с сервера
     */
    const getData = async () => {
        try {
            const res = await axios.get(`/post`);
            dispatch({
                type: "SET_MOVIES",
                payload: res.data,
            });
        } catch (error) {
            console.error(error.data);
        }
    };

    /**
     Рендер карточек через обертку
     */
    return <div style={{display: "flex", justifyContent: "space-evenly", padding: 20,alignItems: "flex-start"}}>
        <CardWrapper items={state.movies}/>
    </div>;
};

export default App;
