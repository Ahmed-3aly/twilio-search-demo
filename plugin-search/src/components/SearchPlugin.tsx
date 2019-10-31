import * as Flex from '@twilio/flex-ui';
import React from 'react';
import { connect } from 'react-redux';
import { ISearchPlugin, SearchPlugins } from '../entities';
import { searchPluginActions as Actions, searchPluginNameSpace as nameSpace } from '../store';

type IFlex = typeof Flex;

interface IProps {
    flex: IFlex,
    selectedTaskId: string,
    dispatch: any,
    children?: any,
    provider?: string,
}

class SearchPluginComponent extends React.Component<IProps>
{
    provider(
        providerName = this.props.provider,
    ) {
        const list = SearchPlugins;
        if (providerName) {
            return list.find(x => x.name === providerName);
        }
        return list[0];
    }
    async selectEngine(
        providerName: string
    ) {
        this.props.dispatch(
            Actions.selectEngine(providerName)
        );
    }
    refresh() {
        const { selectedTaskId, flex } = this.props;
        const sid = selectedTaskId;
        if (sid) {
            flex.Actions.invokeAction('SelectTask', { sid: '' });
            flex.Actions.invokeAction('SelectTask', { sid });
        }
        else {
            flex.Actions.invokeAction('SelectTask', { sid: '-' });
            flex.Actions.invokeAction('SelectTask', { sid: '' });
        }
        const emit: any = 'selectedViewChanged';
        flex.Manager.getInstance().events.emit(
            emit,
            'agent-desktop',
        )
    }
    async onChange(
        provider: ISearchPlugin,
    ) {
        await this.selectEngine(provider.name);
        this.refresh();
    }
    render() {
        const provider = this.provider();
        if (!provider) {
            return null;
        }
        const list = SearchPlugins;
        return (
            <div
                style={{
                    padding: '6px',
                }}
                className='Twilio Twilio-TaskCanvasHeader'
            >
                {list.map((x, index) => (
                    <button
                        key={index}
                        style={{
                            marginRight: '6px',
                            height: '36px',
                            width: '72px',
                        }}
                        className='Twilio-Button'
                        disabled={provider.name === x.name}
                        onClick={() => this.onChange(x)}
                    >
                        {x.name}
                    </button>
                ))}
            </div>
        );
    }
};

const mapStateToProps = (
    appState: any
) => {
    let sid = '';
    if (
        appState &&
        appState.flex &&
        appState.flex.view &&
        appState.flex.view.selectedTaskSid
    ) {
        sid = appState.flex.view.selectedTaskSid;
    }
    return {
        selectedTaskId: sid,
        provider: appState[nameSpace].provider,
    }
};

export const SearchPlugin = connect(mapStateToProps)(
    SearchPluginComponent
);
