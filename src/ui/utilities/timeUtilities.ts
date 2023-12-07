export const getDisplayDuration = (
  timeInterval: number,
  displaySec: boolean = true,
): string => {
  let HH = Math.floor(timeInterval / 3600);
  let mm = Math.floor((timeInterval - HH * 3600) / 60);
  let ss = Math.floor(timeInterval - HH * 3600 - mm * 60);

  let HHstr = HH < 10 ? `0${HH}`.slice(-2) : `${HH}`;
  let mmstr = `0${mm}`.slice(-2);
  let ssstr = `0${ss}`.slice(-2);

  return displaySec ? `${HHstr}:${mmstr}:${ssstr}` : `${HHstr}:${mmstr}`;
};
