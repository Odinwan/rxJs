import React, {useEffect, useState} from "react";
import {valueService} from "./stream";

export interface Values {
    a: string,
    b: string
}

/**
 Компонент карточки
 */
const RxExample = () => {

    const [A, setA] = useState<string>("");
    const [B, setB] = useState<string>("");
    const [C, setC] = useState<string>("");

    const changeValue = (inputValue: string, key: "a" | "b") => {
        if (key === "a") {
            valueService.storeValue({
                a: inputValue,
                b: B,
            });
        }
        else {
            valueService.storeValue({
                a: A,
                b: inputValue,
            });
        }
    };

    useEffect(() => {
        const subscription = valueService.onValues().subscribe({
            next: (value: Values) => {
                setA(value.a);
                setB(value.b);
                if (value.a !== "" && value.b !== "") {
                    const res = Number(value.a) + Number(value.b);
                    setC(res.toString());
                }
                else {
                    setC("");
                }
            },
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    console.log("render RxExample");

    return (
        <>
            <div style={{display: "flex", justifyContent: "center", fontSize: 25, fontWeight: "bold",marginBottom: 20}}>Excel пример: При помощи RX js</div>
            <div style={{display: "flex", justifyContent: "space-evenly",marginBottom: 100}}>
                <div style={{display: "flex", flexFlow: "column"}}>
                    <label>A</label>
                    <input type="number" value={A} onChange={event => changeValue(event.target.value, "a")}/>
                </div>
                <div style={{display: "flex", flexFlow: "column"}}>
                    <label>B</label>
                    <input type="number" value={B} onChange={event => changeValue(event.target.value, "b")}/>
                </div>
                <div style={{display: "flex", flexFlow: "column"}}>
                    <label>C</label>
                    <input type="number" value={C}/>
                </div>
            </div>
        </>
    );
};

export default RxExample;

