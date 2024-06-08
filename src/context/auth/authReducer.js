

export const authReducer = (state={}, action) => {
    switch (action.types) {
        case 'login':
            return {
                ...state,
                user: action.payload,
                logged: true,
            }
        case 'logout':
            return {
                ...state,
                user: null,
                logged: false,
            }
        default:
            return state;
    }
};