export type Point = {
    x: number;
    y: number;
};

export type Point3D = {
    x: number;
    y: number;
    z: number;
};

export type DayNightPath = {
    points: Point[];
    isNorthSun: boolean;
};

export type LatLngLiteral = {
    lat: number;
    lng: number;
};

export type Location = {
    id: number;
    name: string;
    asciiName: string;
    timeZone: string;
    country: string;
    location: LatLngLiteral;
    dateTime: any;
    dateTimeRounded: any;
    isLate: boolean;
    isDark: boolean;
    isIPLocation?: boolean;
    isZone?: boolean;
    region?: string;
    regionCode?: string; // ISO 3166-2
};

export type LocationData = {
    id: number;
    name: string;
    lat: number;
    lng: number;
    population: number;
    country: string;
    tz: string;
    offset: Point;
};

export type DateUnits = {
    day: number;
    month: number;
    year: number;
};

export type LocationArrData = [
    string, // 0 name
    string, // 1 ascii name
    number, // 2 longitude
    number, // 3 latitude
    string, // 4 ISO country code (e.g. 'AU')
    string, // 5 feature type (e.g. PPLC, see http://www.geonames.org/statistics/total.html)
    number, // 6 population
    string, // 7 timezone
    string, // 8 id
    string?, // 9 region
    string? // 10 ISO region code
];

export enum MenuTab {
    PREFERENCES,
    ABOUT,
}

export type MotionValues = {
    xOffset: any;
};

export type ConditionCode =
    | "Clear"
    | "Cloudy"
    | "Dust"
    | "Fog"
    | "Haze"
    | "MostlyClear"
    | "MostlyCloudy"
    | "PartlyCloudy"
    | "ScatteredThunderstorms"
    | "Smoke"
    | "Breezy"
    | "Windy"
    | "Drizzle"
    | "HeavyRain"
    | "Rain"
    | "Showers"
    | "Flurries"
    | "HeavySnow"
    | "MixedRainAndSleet"
    | "MixedRainAndSnow"
    | "MixedRainfall"
    | "MixedSnowAndSleet"
    | "ScatteredShowers"
    | "ScatteredSnowShowers"
    | "Sleet"
    | "Snow"
    | "SnowShowers"
    | "Blizzard"
    | "BlowingSnow"
    | "FreezingDrizzle"
    | "FreezingRain"
    | "Frigid"
    | "Hail"
    | "Hot"
    | "Hurricane"
    | "IsolatedThunderstorms"
    | "SevereThunderstorm"
    | "Thunderstorm"
    | "Tornado"
    | "TropicalStorm";

export type HolidaysApi = {
    holidays: Holiday[];
    expires: number;
    isLoading: boolean;
    error?: string;
};

export type Holiday = {
    date: {
        iso: string; // yyyy-mm-dd
    };
    name: string;
    description: string;
    country: {
        id: string;
        name: string;
    };
    dateTime: {
        year: number;
        month: number;
        day: number;
    };
    type: string[];
    primary_type: string;
    canonical_url: string;
    urlid: string;
    locations: string;
    states: {
        id: string;
        name: string;
        abbrev: string;
        exception: null | string;
        iso: string;
    }[];
    id: string;
};

export type Range = [number, number];

export type WorkdayOverlap = {
    otherRange: Range;
    localRange: Range;
    hasOverlap: boolean;
    dayOffset: number;
    closestHours: Range;
};
