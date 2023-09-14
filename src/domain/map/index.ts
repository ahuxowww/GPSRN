export enum MapZoomLevel {
  level3 = 3,
  level4 = 4,
  level5 = 5,
  level10 = 10,
  fit_all = 'fit_all', // Fit all map nodes inside map area
  fit_route = 'fit_route', // Fit route from current location to active node inside map area (same as journey view)
}

export function mapZoomLevelToDistance(level: MapZoomLevel): number {
  if (level === MapZoomLevel.fit_all || level === MapZoomLevel.fit_route) {
    return 35 * 1000;
  }

  // walking speed in config is km/h
  return ((3.5 * 1000) / 60) * level;
}

// Hàm chuyển đổi từ độ sang radian
const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371; // Bán kính Trái Đất (đơn vị: km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Khoảng cách (đơn vị: km)
  return distance * 1000; // Chuyển đổi sang mét
};
