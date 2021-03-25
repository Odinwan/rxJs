import { BehaviorSubject, } from "rxjs";
import {Values} from "./RxExample";

const values$ = new BehaviorSubject<Values>({
    a:'',
    b:'',
});

/**
 Описываем методы изменения этого стрима
 */
export const valueService = {
    storeValue: (value:Values) => values$.next(value),          // колбек который добавляет в обработку новое значение стрима при помощи метода next
    onValues: () => values$.asObservable(),                     // для того что бы подписаться в нашем компоненте, необходимо использовать метод asObservable
    getValue: () => values$.getValue(),                         // для того что бы подписаться в нашем компоненте, необходимо использовать метод asObservable
};
