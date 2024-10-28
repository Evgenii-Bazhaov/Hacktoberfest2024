import { configureStore } from '@reduxjs/toolkit';

import * as allReducers from './slice';

export default configureStore({
    reducer: { ...allReducers },
});