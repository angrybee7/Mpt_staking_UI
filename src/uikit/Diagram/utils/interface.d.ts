import { CSSProperties } from 'react';

export interface IDiagramData {
    color: string;
    value: number;
    key?: string | number;
}

export type TDiagramDataArray = Array<IDiagramData>;

export interface IDiagramProps {
    data: TDiagramDataArray;
    lineWidth?: number;
    viewBoxSize?: [number, number];
    className?: string;
    style?: CSSProperties;
    totalValue?: number;
}

export type TExtendedDataEntry = IDiagramData & {
    degrees: number;
    startAngle: number;
    percentage: number;
};

export type TExtendedData = Array<TExtendedDataEntry>;
