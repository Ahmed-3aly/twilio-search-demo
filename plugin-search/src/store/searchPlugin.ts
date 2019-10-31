import { Action as ReduxAction } from 'redux';

export const searchPluginNameSpace = 'searchPlugin';

export interface IAction<T> extends ReduxAction {
    payload?: T,
}

export function createAction<T>(
    key: string,
    payload?: T,
): IAction<T> {
    return {
        type: key,
        payload,
    };
}

const searchPluginKeys = {
    provider: 'SEARCH_PLUGIN_PROVIDER',
}

export const searchPluginActions = {
    selectEngine: (
        searchProvider: string,
    ) => createAction(
        searchPluginKeys.provider,
        searchProvider,
    ),
}

export interface ISearchPluginState {
    provider?: string,
}

export function SearchPluginReducer(
    state: ISearchPluginState = {},
    e: IAction<any>,
) {
    const KEYs = searchPluginKeys;
    let payload: any = e.payload;
    switch (e.type) {
        case KEYs.provider:
            state = {
                ...state,
                provider: payload,
            };
            return state;
        default:
            return state
    }
}
