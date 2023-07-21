import { TDiagramDataArray } from './interface';

export const sumValues = (data: TDiagramDataArray): number => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i].value;
    }
    return sum;
};

export const valueBetween = (value: number, min: number, max: number): number => {
    if (value > max) {
        return max;
    }
    if (value < min) {
        return min;
    }
    return value;
};

export const extractPercentage = (value: number, percentage: number): number => {
    return (percentage / 100) * value;
};

export const bisectorAngle = (startAngle: number, lengthAngle: number) => {
    return startAngle + lengthAngle / 2;
};

export const degreesToRadians = (degrees: number) => {
    return (degrees * Math.PI) / 180;
};

export const shiftVectorAlongAngle = (angle: number, distance: number) => {
    const angleRadians = degreesToRadians(angle);
    return {
        dx: distance * Math.cos(angleRadians),
        dy: distance * Math.sin(angleRadians),
    };
};

export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}
