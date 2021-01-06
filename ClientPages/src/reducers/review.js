import * as types from './../constants/review';

var initialState = {
    ListReview: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_REVIEWS:
            return {
                ...state,
                ListReview: []
            }

        case types.GET_REVIEWS_SUCCESS:
            var { data } = action.payload;

            var { ListReview } = state;

            ListReview = data;
            
            return {
                ...state,
                ListReview: [...ListReview]
            }

        case types.CREATE_REVIEW_SUCCESS:
            var { data } = action.payload;

            var { ListReview } = state;

            ListReview.push({
                commentID : '',
                content : data.content,
                dateComment : data.dateComment,
                email : data.email,
                star : data.star,
                title : data.title
            });

            return {
                ...state,
                ListReview: [...ListReview]
            }
        default: return state;
    }
}

export default reducer;