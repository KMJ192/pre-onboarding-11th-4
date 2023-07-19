import React, { useRef, useEffect, cloneElement, HTMLAttributes } from 'react';

type FocusEvents = 'focusin' | 'focusout';
type MouseEvents = 'click' | 'mousedown' | 'mouseup';
type TouchEvents = 'touchstart' | 'touchend';
type Events = FocusEvent | MouseEvent | TouchEvent;

interface Props extends HTMLAttributes<HTMLElement> {
  onClickAway: (event: Events) => void;
  focusEvent?: FocusEvents;
  mouseEvent?: MouseEvents;
  touchEvent?: TouchEvents;
  children: JSX.Element;
}

const eventTypeMapping = {
  click: 'onClick',
  focusin: 'onFocus',
  focusout: 'onFocus',
  mousedown: 'onMouseDown',
  mouseup: 'onMouseUp',
  touchstart: 'onTouchStart',
  touchend: 'onTouchEnd',
};

function ClickAwayListener({
  children,
  onClickAway,
  focusEvent = 'focusin',
  mouseEvent = 'click',
  touchEvent = 'touchend',
}: Props): JSX.Element {
  const node = useRef<HTMLElement | null>(null);
  const bubbledEventTarget = useRef<EventTarget | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      mountedRef.current = true;
    }, 0);

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleBubbledEvents =
    (type: string) =>
    (event: Events): void => {
      bubbledEventTarget.current = event.target;

      const handler = children?.props[type];

      if (handler) {
        handler(event);
      }
    };

  useEffect(() => {
    const nodeDocument = node.current?.ownerDocument ?? document;

    const handleEvents = (event: Events): void => {
      if (!mountedRef.current) return;

      if (
        (node.current && node.current.contains(event.target as Node)) ||
        bubbledEventTarget.current === event.target ||
        !nodeDocument.contains(event.target as Node)
      ) {
        return;
      }

      onClickAway(event);
    };

    nodeDocument.addEventListener(mouseEvent, handleEvents);
    nodeDocument.addEventListener(touchEvent, handleEvents);
    nodeDocument.addEventListener(focusEvent, handleEvents);

    return () => {
      nodeDocument.removeEventListener(mouseEvent, handleEvents);
      nodeDocument.removeEventListener(touchEvent, handleEvents);
      nodeDocument.removeEventListener(focusEvent, handleEvents);
    };
  }, [focusEvent, mouseEvent, onClickAway, touchEvent]);

  const mappedMouseEvent = eventTypeMapping[mouseEvent];
  const mappedTouchEvent = eventTypeMapping[touchEvent];
  const mappedFocusEvent = eventTypeMapping[focusEvent];

  return React.Children.only(
    cloneElement(children, {
      // eref: handleChildRef,
      [mappedFocusEvent]: handleBubbledEvents(mappedFocusEvent),
      [mappedMouseEvent]: handleBubbledEvents(mappedMouseEvent),
      [mappedTouchEvent]: handleBubbledEvents(mappedTouchEvent),
    }),
  );
}

ClickAwayListener.displayName = 'ClickAwayListener';

export default ClickAwayListener;
