import CommonStore from './CommonStore';
import TimerStore from './TimerStore';
import TodoStore from './TodoStore';
import VoteStore from './VoteStore';

export default function configureStore(state = {}){
    return {
        commonStore: new CommonStore(state.common),
        timerStore: new TimerStore(state.timer),
        todoStore: new TodoStore(state.todo),
        VoteStore: new VoteStore(state.vote)
    };
}

export let stores = process.browser ? configureStore(window.__INITIAL_STATE__) : {};
