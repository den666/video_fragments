export interface videoReducer {
    videoList: videoItem[],
    videoActive: videoItem,
    videoEdit?: videoItem | null
}

export interface videoItem {
    id: number,
    url: string,
    name: string,
    main: boolean,
    start?: number,
    end?: number,
    tags: string,
    isLoad?: boolean
}

export interface appReducer {
    showModal: boolean,
    isEditing: boolean
}

export interface AppInterface {
    appReducer: appReducer,
    videoReducer: videoReducer,
    _persist:{
        [name:string]: any
    }
}
