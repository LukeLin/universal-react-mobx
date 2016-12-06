import CommonStore from './CommonStore';
import TimerStore from './TimerStore';
import TodoStore from './TodoStore';

export default function configureStore(state = {}){
    return {
        commonStore: new CommonStore(state.common),
        timerStore: new TimerStore(state.timer),
        todoStore: new TodoStore(state.todo)
    };
}
