import * as React from 'react';
import { SVGProps } from 'react';
import {
    bisectorAngle,
    degreesToRadians,
    extractPercentage,
    isNumber,
    shiftVectorAlongAngle,
    valueBetween,
} from './utils';

const partialCircle = (cx, cy, r, start, end) => {
    const length = end - start;
    if (length === 0) {
        return [];
    }

    const fromX = r * Math.cos(start) + cx;
    const fromY = r * Math.sin(start) + cy;
    const toX = r * Math.cos(end) + cx;
    const toY = r * Math.sin(end) + cy;
    const large = Math.abs(length) <= Math.PI ? '0' : '1';
    const sweep = length < 0 ? '0' : '1';

    return [
        ['M', fromX, fromY],
        ['A', r, r, 0, large, sweep, toX, toY]
    ];
};

export function makePathCommands(
    cx: number,
    cy: number,
    startAngle: number,
    lengthAngle: number,
    radius: number
): string {
    const patchedLengthAngle = valueBetween(lengthAngle, -359.999, 359.999);

    return partialCircle(
        cx,
        cy,
        radius,
        degreesToRadians(startAngle),
        degreesToRadians(startAngle + patchedLengthAngle)
    )
        .map((command) => command.join(' '))
        .join(' ');
}

type Props = SVGProps<SVGPathElement> & {
    cx: number;
    cy: number;
    lengthAngle: number;
    lineWidth: number;
    radius: number;
    reveal?: number;
    rounded?: boolean;
    shift?: number;
    startAngle: number;
};

export const Path = ({
    cx,
    cy,
    lengthAngle,
    lineWidth,
    radius,
    shift = 0,
    reveal,
    rounded,
    startAngle,
    ...props
}: Props) => {
    const pathRadius = radius - lineWidth / 2;
    const { dx, dy } = shiftVectorAlongAngle(
        bisectorAngle(startAngle, lengthAngle),
        shift
    );

    const pathCommands = makePathCommands(
        cx + dx,
        cy + dy,
        startAngle,
        lengthAngle,
        pathRadius
    );
    let strokeDasharray;
    let strokeDashoffset;

    if (isNumber(reveal)) {
        const pathLength = degreesToRadians(pathRadius) * lengthAngle;
        strokeDasharray = Math.abs(pathLength);
        strokeDashoffset = strokeDasharray - extractPercentage(strokeDasharray, reveal);
    }

    return (
        <path
            d={pathCommands}
            fill="none"
            strokeWidth={lineWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap={rounded ? 'round' : undefined}
            {...props}
        />
    );
};
