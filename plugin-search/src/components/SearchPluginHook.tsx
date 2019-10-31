import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import { ISearchPlugin, SearchPlugins } from '../entities';
import { searchPluginNameSpace as nameSpace, SearchPluginReducer as reducer } from '../store';
import { SearchPlugin } from './SearchPlugin';

export class SearchPluginHook extends
    FlexPlugin
{
    constructor() {
        super(nameSpace);
    }
    provider(
        providerName: string,
    ) {
        const list = SearchPlugins;
        if (providerName) {
            return list.find(x => x.name === providerName);
        }
        return list[0];
    }
    init(
        flex: typeof Flex,
        manager: Flex.Manager,
    ) {
        this.registerReducers(manager);
        // 
        const options: Flex.ContentFragmentProps = {
            sortOrder: -1,
        };
        flex.CRMContainer.defaultProps.uriCallback = (
            task: any
        ) => {
            let selectedTaskName = '';
            if (
                task &&
                task.attributes &&
                task.attributes.name
            ) {
                selectedTaskName = task.attributes.name;
            }
            const appState = flex.Manager.getInstance().store.getState();
            let providerName = '';
            if (appState[nameSpace] &&
                appState[nameSpace].provider
            ) {
                providerName = appState[nameSpace].provider;
            }
            const list = SearchPlugins;
            let provider: ISearchPlugin | undefined = undefined;
            if (providerName) {
                provider = list.find(x => x.name === providerName);
            }
            if (!provider) {
                provider = list[0];
            }
            let source = provider.host;
            if (selectedTaskName) {
                source += provider.suffix + selectedTaskName;
            }
            console.group('task update from CRM');
            console.log(provider);
            console.log(task);
            console.groupEnd();
            return source;
        }
        flex.AgentDesktopView
            .Panel2
            .Content
            .add(
                <div
                    key="search-component"
                >
                    <SearchPlugin flex={flex} />
                </div>,
                options,
            );
    }

    private registerReducers(manager: Flex.Manager) {
        if (!manager.store.addReducer) {
            // tslint: disable-next-line
            console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`);
            return;
        }

        manager.store.addReducer(nameSpace, reducer);
    }
}
