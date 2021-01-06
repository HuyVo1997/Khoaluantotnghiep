import * as types from '../constants/filter';

const initialState = {
    RAM: 0,
    Memory: 0,
    Battery: 0
}

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILTER:
            var { filterObject } = action.payload;
            var { RAM, Memory, Battery } = state;
            RAM = filterObject.RAM;
            Memory = filterObject.Memory;
            Battery = filterObject.Battery
            return {
                ...state,
                RAM: parseInt(RAM, 10),
                Memory: parseInt(Memory, 10),
                Battery: parseInt(Battery, 10)
            };
        default: return state;
    }
}

export default reducer;