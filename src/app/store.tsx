import { configureStore } from '@reduxjs/toolkit';
import labelReducer from './Slices/labelSlice';
import layoutReducer from './Slices/layoutSlice';
import mailReducer from './Slices/mailSlice';
import signatureReducer from './Slices/signatureSlice';
import userReducer from './Slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
    labelSidebar: labelReducer,
    mail: mailReducer,
    signature: signatureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['storage.folderTree', 'storage.fileTree'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
