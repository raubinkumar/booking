import { Middleware, Store } from 'redux';
import * as batch from 'redux-batched-actions';
import * as api from '../services/api';

export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.

function actionWith(data: any, action: any) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
}

const apiMiddleware: Middleware = (store: Store<any>) => (next: any): any => (
    action: any,
): any => {
    let callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    callAPI = api.setHeaders(callAPI);

    const { types } = callAPI;

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }, action));

    return api
        .callAPI(callAPI)
        .then((response) => {
            if (
                action.actionData
                && action.actionData.successMessage
                && action.actionData.successMessage.length > 0
            ) {
                next(
                    batch.batchActions([
                        actionWith({
                            response,
                            type: successType,
                            params: action.params,
                        }, action),
                    ]),
                );
            } else {
                next(
                    actionWith({
                        response,
                        type: successType,
                        params: action.params,
                    }, action),
                );
            }
        })
        .catch((error) => {
            if (
                (error && error.response && error.response.status === 404) ||
                (error && error.response && error.response.status === 403) ||
                (error && error.response && error.response.status === 500) ||
                (error && error.response && error.response.status === 400) ||
                (error && error.response && error.response.status === 401) ||
                (error && error.response && error.response.status === 422)
            ) {
                const message =
                    (error.response && error.response.data && error.response.data.errors && error.response.data.errors[0]) ||
                    error.response.data.error ||
                    (action.actionData && action.actionData.errorMessage);
                next(
                    batch.batchActions([
                        actionWith({
                            type: failureType,
                            error: message || 'Failed To Perform Action',
                            params: action.params,
                        }, action),
                    ]),
                );
            } else {
                next(
                    actionWith({
                        error: 'Failed To Perform Action',
                        type: failureType,
                        params: action.params,
                    }, action),
                )
            }
        });
};

export default apiMiddleware;