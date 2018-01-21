const params = window.location.search;
const initialState = JSON.parse(localStorage.getItem('persist:root')) ;
const videoReducer = initialState && initialState.videoReducer ? JSON.parse(initialState.videoReducer) : null;

const defaultState = {
    appReducer: {
        showModal: false,
        isEditing: !(params && params === '?edit=false')
    },
    videoReducer: {
        videoList: videoReducer
                    ? videoReducer.videoList
                    : [
                        {
                            id: 1000,
                            url: 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4',
                            name: 'Main Video',
                            main: true,
                            tags: 'video, main, principal, primary'
                        }
                    ],
        videoActive: {
            id: 1000,
            url: 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4',
            name: 'Main Video',
            main: true,
            tags: 'video, main, principal, primary'
        }
    }
};

console.log();

export default defaultState;