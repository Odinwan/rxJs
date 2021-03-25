import {Movie} from "../../interfaces";
import {Subject} from "rxjs";

/**
 Создаем стрим subject$
 */
const subject$ = new Subject<Movie>();

/**
 Описываем методы изменения этого стрима
 */
export const movieService = {
    storeMovie: (movie: Movie) => subject$.next(movie),     // колбек который добавляет в обработку новое значение стрима при помощи метода next
    onMovie: () => subject$.asObservable(),                 // для того что бы подписаться в нашем компоненте, необходимо использовать метод asObservable
};