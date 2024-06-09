

export const authReducer = (state={}, action) => {
    console.log(action)
    switch (action.types) {
        case 'login':
            return {
                ...state,
                user: action.payload,
                logged: true,
                isAdmin: action.isAdmin
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