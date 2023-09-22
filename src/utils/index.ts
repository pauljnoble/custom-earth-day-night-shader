import { MS_PER_DAY, PX_PER_DAY } from "src/constants";
import { LatLngLiteral } from "src/types";
import SunCalc from "suncalc";

const LATITUDE_PRECISION = 1;
const LONGITUDE_PRECISION = 1;

export const getSunCoords = (date: Date): LatLngLiteral => {
    let coords, lng, peak, result, lat;

    result = { lat: 0, lng: 0 };
    lng = -180;
    lat = -90;
    coords = {};
    peak = { altitude: 0, azimuth: 0 };

    while (lng < 180) {
        lat = -90;

        while (lat < 90) {
            coords = SunCalc.getPosition(date, lat, lng);
            if (coords.altitude > peak.altitude) {
                peak = coords;
                result = { lat, lng };
            }
            lat += LATITUDE_PRECISION;
        }

        lng += LONGITUDE_PRECISION;
    }

    return result;
};

export const pxToMs = (px: number) => {
    return (px / PX_PER_DAY) * MS_PER_DAY;
};

export const msToPx = (ms: number) => {
    return (ms / MS_PER_DAY) * PX_PER_DAY;
};

export const timeStampToTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    return { hours, minutes, amOrPm };
}