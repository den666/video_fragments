import {ActionsObservable} from 'redux-observable';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {ACTIVE_VIDEO_CHANGE, ACTIVE_VIDEO} from '../actions/videoActions';

export const changeVideo = (action$: ActionsObservable<any>) =>
    action$.ofType(ACTIVE_VIDEO_CHANGE)
        .flatMap(action =>
            Observable.concat(
                Observable.of({
                    type: ACTIVE_VIDEO,
                    payload: {...action.payload, isLoad:true}
                }),
                Observable.of({
                    type: ACTIVE_VIDEO,
                    payload: {...action.payload, isLoad:false}
                }).delay(3000)
            )
        );