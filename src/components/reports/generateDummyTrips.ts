import { format, addMinutes, setHours, setMinutes, setSeconds } from "date-fns";

export interface FormattedTrip {
  id: string;
  date: string; // yyyy-MM-dd
  duration: string; // e.g., "2h 15m"
  distance: string; // e.g., "120 km"
  avgFatigue: number; // 0-100
  alerts: number; // 0-10
  route_name?: string;
  start_time?: string; // ISO string
  end_time?: string;   // ISO string
}

const ROUTES = [
  "I-80 Eastbound",
  "US-101 North",
  "I-5 Corridor",
  "Coastal Route",
  "Mountain Pass",
  "City Loop",
  "Suburban Express",
  "Rural Scenic Byway",
];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals = 1) {
  const n = Math.random() * (max - min) + min;
  return parseFloat(n.toFixed(decimals));
}

export function generateDummyTrips(from: Date, to: Date): FormattedTrip[] {
  const trips: FormattedTrip[] = [];
  const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  for (let d = 0; d < days; d++) {
    const dayDate = new Date(from.getTime());
    dayDate.setDate(from.getDate() + d);

    // 0-3 trips per day, with higher chance of 1-2
    const roll = Math.random();
    const tripsToday = roll < 0.15 ? 0 : roll < 0.65 ? 1 : roll < 0.9 ? 2 : 3;

    for (let i = 0; i < tripsToday; i++) {
      // Start time between 5:00 and 20:00
      const startHour = randomBetween(5, 20);
      const startMinute = randomBetween(0, 59);
      const start = setSeconds(setMinutes(setHours(dayDate, startHour), startMinute), 0);

      // Duration between 30 and 360 minutes
      const durationMin = randomBetween(30, 360);
      const end = addMinutes(start, durationMin);

      // Distance roughly proportional to duration with some variance
      const baseSpeed = randomFloat(40, 90); // km/h
      const distance = Math.max(5, Math.round((durationMin / 60) * baseSpeed + randomBetween(-10, 15)));

      // Alerts based on distance and fatigue later
      const baseAlerts = Math.max(0, Math.round(distance / 120 + (Math.random() < 0.2 ? 1 : 0)));

      // Fatigue influenced by duration and alerts
      let fatigue = Math.round(
        Math.min(
          95,
          Math.max(35, 40 + durationMin / 6 + baseAlerts * 5 + randomBetween(-10, 10))
        )
      );

      // Route name
      const route_name = ROUTES[randomBetween(0, ROUTES.length - 1)];

      const hours = Math.floor(durationMin / 60);
      const minutes = durationMin % 60;

      trips.push({
        id: `dummy-${format(dayDate, "yyyyMMdd")}-${i}`,
        date: format(dayDate, "yyyy-MM-dd"),
        duration: `${hours}h ${minutes}m`,
        distance: `${distance} km`,
        avgFatigue: fatigue,
        alerts: Math.min(8, baseAlerts),
        route_name,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
      });
    }
  }

  // Guarantee at least one trip in the range
  if (trips.length === 0) {
    const dayDate = new Date(from.getTime());
    const start = setSeconds(setMinutes(setHours(dayDate, 9), 15), 0);
    const durationMin = 75;
    const end = addMinutes(start, durationMin);
    const distance = 90;
    trips.push({
      id: `dummy-${format(dayDate, "yyyyMMdd")}-0`,
      date: format(dayDate, "yyyy-MM-dd"),
      duration: `1h 15m`,
      distance: `${distance} km`,
      avgFatigue: 62,
      alerts: 1,
      route_name: ROUTES[0],
      start_time: start.toISOString(),
      end_time: end.toISOString(),
    });
  }

  // Sort newest first
  trips.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return trips;
}
