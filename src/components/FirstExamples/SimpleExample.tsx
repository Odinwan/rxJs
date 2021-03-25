import React, {useState} from "react";

interface SimpleExampleProps {
    A:string,
    B:string,
    C:string,
    setA: (val:string) => void
    setB: (val:string) => void
    setC: (val:string) => void
}
/**
 Компонент карточки
 */
const SimpleExample = () => {
// const SimpleExample = (props:SimpleExampleProps) => {
//     const {A,B,C,setA,setB,setC} = props
//
    const [A, setA] = useState<string>("");
    const [B, setB] = useState<string>("");
    const [C, setC] = useState<string>("");

    const checkC = (key?: "a" | "b", val?: string) => {
        if ((key === "a" ? val : A) !== "" && (key === "b" ? val : B) !== "") {
            const res = Number(key === "a" ? val : A) + Number(key === "b" ? val : B);
            setC(res.toString());
        }
    };

    const changeValue = (val: string, key: "a" | "b") => {
        key === "a" && setA(val);
        key === "b" && setB(val);
        checkC(key, val);
    };

    console.log("render SimpleExample");

    return (
        <>
            <div style={{display: "flex",justifyContent: "center",fontSize: 25,fontWeight: "bold",marginTop: 200,marginBottom: 20}}>Excel пример: Чистый Реакт</div>
            <div style={{display: "flex", justifyContent: "space-evenly",marginBottom: 200}}>
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

export default SimpleExample;

