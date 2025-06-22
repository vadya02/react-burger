import { ChangeEvent, FocusEvent, PointerEvent } from 'react';

export interface InputEventHandlers {
  onPointerEnterCapture: (event: PointerEvent<HTMLInputElement>) => void;
  onPointerLeaveCapture: (event: PointerEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const defaultInputEventHandlers: InputEventHandlers = {
  onPointerEnterCapture: () => {},
  onPointerLeaveCapture: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onChange: () => {}
}; 