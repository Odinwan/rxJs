import React, {useEffect, useState} from "react";
import reducer from "./reducer";
import axios from "axios";
import CardWrapper from "./components/Card/CardWrapper";
import SimpleExample from "./components/FirstExamples/SimpleExample";
import RxExample from "./components/FirstExamples/RxExample";
import AnyButton from "./components/FirstExamples/anyButton";

const App = () => {

     const [A, setA] = useState<string>("");
     const [B, setB] = useState<string>("");
     const [C, setC] = useState<string>("");

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
    return <>
        <div style={{display:'block'}}>
            <SimpleExample/>
            {/*<SimpleExample*/}
            {/*    A={A}*/}
            {/*    B={B}*/}
            {/*    C={C}*/}
            {/*    setA={setA}*/}
            {/*    setC={setC}*/}
            {/*    setB={setB}*/}
            {/*/>*/}
            <RxExample/>
            <AnyButton setA={setA} A={A} />
        </div>
        <div style={{display: "flex",justifyContent: "space-evenly", padding: 20, alignItems: "flex-start",marginTop:1000}}>
            <CardWrapper items={state.movies}/>
        </div>
    </>;

};

export default App;
