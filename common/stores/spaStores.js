import CommonStore from './CommonStore';
import TimerStore from './TimerStore';
import TodoStore from './TodoStore';
import VoteStore from './VoteStore';

function initStore(Store, state){
    return Store.fromJS ? Store.fromJS(state) : new Store(state);
}

export default function configureStore(state = {}){
    return {
        commonStore: initStore(CommonStore, state.commonStore),
        timerStore: initStore(TimerStore, state.timerStore),
        todoStore: initStore(TodoStore, state.todoStore),
        VoteStore: initStore(VoteStore, state.VoteStore)
    };
}
