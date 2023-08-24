import * as React from 'react';
import AppNavigation from './src/navigation';
import {ReduxProvider} from '@src/redux';

export default function App() {
  return (
    <ReduxProvider>
      <AppNavigation />
    </ReduxProvider>
  );
}
