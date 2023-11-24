import * as React from 'react';

export const AppnavigationRef = React.createRef();
export const AppisReadyRef = React.createRef();
export function Appnavigate(name, params) {
  AppnavigationRef.current?.navigate(name, params);
}