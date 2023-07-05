import React, {FC} from 'react';
import {Animated} from 'react-native';
import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

import Colors from './colors';

interface Props {
  active?: boolean; // only using with icon Home
  color: string;
  width?: number | null;
  height?: number | null;
  style?: any;
}

const AnimatedIcon = Animated.createAnimatedComponent(Svg);

export const IconHome: FC<Props> = ({active, style, color}) => (
  <AnimatedIcon
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    x={0}
    y={0}
    style={style}>
    <Path
      d="M5.27446 10.1262C5 10.7229 5 11.4018 5 12.7595V16.9999C5 18.8856 5 19.8284 5.58579 20.4142C6.11733 20.9457 6.94285 20.9949 8.5 20.9995V16C8.5 14.8954 9.39543 14 10.5 14H13.5C14.6046 14 15.5 14.8954 15.5 16V20.9995C17.0572 20.9949 17.8827 20.9457 18.4142 20.4142C19 19.8284 19 18.8856 19 16.9999V12.7595C19 11.4018 19 10.7229 18.7255 10.1262C18.4511 9.52943 17.9356 9.08763 16.9047 8.20401L15.9047 7.34687C14.0414 5.74974 13.1098 4.95117 12 4.95117C10.8902 4.95117 9.95857 5.74974 8.09525 7.34687L7.09525 8.20401C6.06437 9.08763 5.54892 9.52943 5.27446 10.1262ZM13.5 20.9999V16H10.5V20.9999H13.5Z"
      fill={active ? Colors.blueDarkTurquoise : color}
    />
  </AnimatedIcon>
);

export const IconHistory: FC<Props> = ({color, style, width, height}) => (
  <AnimatedIcon
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill="none"
    x={0}
    y={0}
    style={style}>
    <Path
      d="M12.398 17.804C13.881 17.0348 19 14.0163 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 14.0163 10.119 17.0348 11.602 17.804C11.8548 17.9351 12.1452 17.9351 12.398 17.804ZM12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
      fill={color}
    />
    <Path
      d="M18.0622 16.5C18.6766 16.9561 19 17.4734 19 18C19 18.5266 18.6766 19.0439 18.0622 19.5C17.4478 19.9561 16.5641 20.3348 15.5 20.5981C14.4359 20.8614 13.2288 21 12 21C10.7712 21 9.56414 20.8614 8.5 20.5981C7.43587 20.3348 6.5522 19.9561 5.93782 19.5C5.32344 19.0439 5 18.5266 5 18C5 17.4734 5.32344 16.9561 5.93782 16.5"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
    />
  </AnimatedIcon>
);

export const IconFavorite: FC<Props> = ({color, style, width, height}) => (
  <AnimatedIcon
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill="none"
    x={0}
    y={0}
    style={style}>
    <Path
      d="M12 20.9L10.6 19.6C5.60004 15.1 2.30005 12.1 2.30005 8.39998C2.30005 5.39998 4.60004 3.09998 7.60004 3.09998C9.30004 3.09998 12 4.49998 12 6.59998C12 4.59998 14.7 3.09998 16.4 3.09998C19.4 3.09998 21.7 5.39998 21.7 8.39998C21.7 12.1 18.4 15.1 13.4 19.6L12 20.9Z"
      fill={color}
    />
  </AnimatedIcon>
);

export const IconNotifications: FC<Props> = ({color, style, height, width}) => (
  <AnimatedIcon
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill="none"
    x={0}
    y={0}
    style={style}>
    <Path
      d="M24 3.5C24 5.433 22.433 7 20.5 7C18.567 7 17 5.433 17 3.5C17 1.567 18.567 0 20.5 0C22.433 0 24 1.567 24 3.5Z"
      fill={Colors.redAlizarin}
    />
    <Path
      d="M18.8907 8.7608C16.6915 8.08888 15.0777 6.07583 15.0027 3.67493C14.0928 3.24218 13.0747 3 12 3C8.13401 3 5 6.13401 5 10V16H3V19H9.17071C9.58254 20.1652 10.6938 21 12 21C13.3062 21 14.4175 20.1652 14.8293 19H21V16H19V10C19 9.57713 18.9625 9.16302 18.8907 8.7608Z"
      fill={color}
    />
  </AnimatedIcon>
);

export const IconProfile: FC<Props> = ({color, style, height, width}) => (
  <AnimatedIcon
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill="none"
    x={0}
    y={0}
    style={style}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.2073 1.99889C14.1963 1.67492 13.1186 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 14.8362 2.62454 17.4098 4.45207 19.2992C5.53896 16.1832 8.47176 14 12 14C15.5282 14 18.461 16.1832 19.5479 19.2992C21.3755 17.4098 22.5 14.8362 22.5 12C22.5 10.8814 22.3251 9.80368 22.0011 8.79265C21.5239 8.92772 21.0204 9 20.5 9C17.4624 9 15 6.53757 15 3.5C15 2.97958 15.0723 2.47605 15.2073 1.99889ZM21.1973 6.93053C20.2391 5.19572 18.8043 3.7609 17.0695 2.80266C17.0239 3.02801 17 3.26121 17 3.5C17 5.433 18.567 7 20.5 7C20.7388 7 20.972 6.97609 21.1973 6.93053ZM15.2 22H15.2108C14.1988 22.3247 13.1199 22.5 12 22.5C10.8801 22.5 9.80121 22.3247 8.78919 22H8.8C8.8 20.24 10.24 18.8 12 18.8C13.76 18.8 15.2 20.24 15.2 22ZM15.3333 9.33333C15.3333 11.1743 13.841 12.6667 12 12.6667C10.1591 12.6667 8.66667 11.1743 8.66667 9.33333C8.66667 7.49238 10.1591 6 12 6C13.841 6 15.3333 7.49238 15.3333 9.33333Z"
      fill={color}
    />
    <Path
      d="M20.5 7C22.433 7 24 5.433 24 3.5C24 1.567 22.433 0 20.5 0C18.567 0 17 1.567 17 3.5C17 5.433 18.567 7 20.5 7Z"
      fill={Colors.blueDarkTurquoise}
    />
  </AnimatedIcon>
);

export const IconProfileNoBag: FC<Props> = ({color, style, height, width}) => (
  <AnimatedIcon
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill="none"
    style={style}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.5479 19.2992C21.3755 17.4098 22.5 14.8362 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 14.8362 2.62454 17.4098 4.45207 19.2992C5.53896 16.1832 8.47176 14 12 14C15.5282 14 18.461 16.1832 19.5479 19.2992ZM15.1999 22.0035C15.1999 22.0023 15.1999 22.0012 15.1999 22L15.2 22C15.2 20.24 13.76 18.8 12 18.8C10.24 18.8 8.8 20.24 8.8 22L8.79991 22C8.79991 22.0011 8.79992 22.0023 8.79992 22.0034C9.80884 22.3259 10.8841 22.5 12 22.5C13.1158 22.5 14.191 22.3259 15.1999 22.0035ZM15.3333 9.33333C15.3333 11.1743 13.841 12.6667 12 12.6667C10.1591 12.6667 8.66667 11.1743 8.66667 9.33333C8.66667 7.49238 10.1591 6 12 6C13.841 6 15.3333 7.49238 15.3333 9.33333Z"
      fill={color}
      fill-opacity="0.57"
    />
  </AnimatedIcon>
);

export const IconNotificationsNoBag: FC<Props> = ({
  color,
  style,
  height,
  width,
}) => (
  <AnimatedIcon
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill="none"
    style={style}>
    <G clip-path="url(#clip0)">
      <Path
        d="M5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10V16H21V19H14.8293C14.4175 20.1652 13.3062 21 12 21C10.6938 21 9.58254 20.1652 9.17071 19H3V16H5V10Z"
        fill={color}
        fill-opacity="0.57"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width="16" height="16.9" fill="white" />
      </ClipPath>
    </Defs>
  </AnimatedIcon>
);

export const IconStar: FC<Props> = ({color, style, height, width}) => (
  <AnimatedIcon
    width={width || 23}
    height={height || 23}
    viewBox="0 0 41 40"
    fill="none"
    x={0}
    y={0}
    style={style}>
    <Path
      d="M30.0833 35L20.75 29.8333L11.4167 35L13.25 24.1667L5.75 16.5L16.0833 14.8333L20.75 5L25.4167 14.8333L35.75 16.3333L28.25 24.1667L30.0833 35Z"
      fill={color}
    />
  </AnimatedIcon>
);
