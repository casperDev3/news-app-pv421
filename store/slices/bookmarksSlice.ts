import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Article {
    id: number | string;
    title: string;
    country: string;
}

interface BookmarkState {
    savedArticles: Article[];
}

// init
const initialState: BookmarkState = {
    savedArticles: [],
}

const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {
        toggleBookmark: (state, action: PayloadAction<Article>) => {
            const index = state.savedArticles.findIndex(
                (article) => article.id === action.payload.id
            );

            // if exist remove
            if (index >= 0) {
                state.savedArticles.splice(index, 1);
            } else {
                state.savedArticles.push(action.payload);
            }
        }
    },

})

export const {toggleBookmark} = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
