export const icon_map = new Map();

function completeMap(values, icon) {
  values.forEach((value) => {
    icon_map.set(value, icon);
  });
}

completeMap([0], "clear-sky-sunny");
completeMap([1, 2, 3], "clear-cloudy");
completeMap([45, 48], "cloud-fog");
completeMap([51, 53, 55, 56, 57], "drizzle");
completeMap([61, 63, 65, 66, 67, 80, 81, 82], "heavy-rain");
completeMap([71, 73, 75, 77], "snow");
completeMap([71, 73, 75, 77, 85, 86], "snow");
completeMap([95, 96, 99], "snow");
