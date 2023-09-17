export type TTranslate = {
    name: string;
    translations: {
        [key: string]: string;
    };
    locale: string;
}

type TTranslateMain = {
    [key: string]: {
        [key: string]: string;
    };
}

export as namespace COMMON;