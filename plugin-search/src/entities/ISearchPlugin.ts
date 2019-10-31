
export interface ISearchPlugin {
    name: string,
    host: string,
    suffix: string,
}

export const SearchPlugins: ISearchPlugin[] = [
    {
        name: 'Bing',
        host: 'https://bing.com/',
        suffix: '?q=',
    },
    {
        name: 'Google',
        host: 'https://google.com/',
        suffix: 'search?igu=1&ei=&output=embed&q=',
    },
];
