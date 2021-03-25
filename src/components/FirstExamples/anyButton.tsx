import React from "react";
import {valueService} from "./stream";

interface AnyButtonProps {
    A:string,
    setA: (val:string) => void
}

/**
 Компонент карточки
 */
const AnyButton = (props:AnyButtonProps) => {

    const changeValues = () => {
        const value = valueService.getValue()
        valueService.storeValue({
            a : (Number(value.a) + 10).toString(),
            b : value.b
        })
    }

    return (
        <div style={{display: "flex",justifyContent:"space-evenly"}}>
            <button onClick={() => props.setA((Number(props.A) + 10).toString())}>Изменяем A на 10 без Rx JS</button>
            <button onClick={() => changeValues()}>Изменяем A на 10 с Rx JS</button>
        </div>
    );
};

export default AnyButton;

