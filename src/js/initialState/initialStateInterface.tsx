export interface videoReducer {
    videoList: videoItem[]
}

export interface videoItem {
    id: number,
    url: string,
    name: string,
    main: boolean,
    start?: number,
    end?: number,
    tags: string
}

export interface appReducer {
    showModal: boolean
}

export interface AppInterface {
    appReducer: appReducer,
    videoReducer: videoReducer,
    _persist:{
        [name:string]: any
    }
}
