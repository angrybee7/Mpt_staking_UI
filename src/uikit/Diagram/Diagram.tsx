import * as React from 'react';
import { Flex, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { CSSProperties } from 'react';
import { TExtendedData } from './utils/interface';
import { extendData } from './utils/extendData';
import { extractPercentage } from './utils/utils';
import { Path } from './utils/Path';

interface IDonutDiagramData {
    value: number;
    color: string;
}

export type TDiagram = TFlexProps & {
    dataProps: Array<IDonutDiagramData>;
    widthChart?: number;
    heightChart?: number;
    lineWidth?: number;
    viewBoxSize?: [number, number];
    className?: string;
    style?: CSSProperties;
    totalValue?: number;
};

const DiagramFC: React.FC<TDiagram> = ({
    dataProps,
    heightChart = 100,
    widthChart = 100,
    lineWidth = 16,
    viewBoxSize = [100, 100],
    totalValue,
    className,
    ...rest
}) => {
    const data = React.useMemo(() => (!dataProps || !dataProps.length) ? [{ color: '#3A4050', value: 1 }] : dataProps, [dataProps]);
    const extendedData = React.useMemo((): TExtendedData => {
        return extendData({ data, totalValue});
    }, [data, totalValue]);
    const finalLineWidth = React.useMemo(() => extractPercentage(50, lineWidth), [lineWidth]);

    return (
        <Flex
            position="relative"
            width="100px"
            height="100px"
            borderRadius="50%"
            {...rest}
        >
            <svg
                viewBox={`0 0 ${viewBoxSize[0]} ${viewBoxSize[1]}`}
                width="100%"
                height="100%"
                className={className}
                style={{
                    transform: 'rotate(-90deg)',
                    willChange: 'transform',
                    width: widthChart,
                    height: heightChart,
                }}
            >
                {extendedData.map((dataEntry, index) => (
                    <Path
                        cx={50}
                        cy={50}
                        key={index}
                        lengthAngle={dataEntry.degrees}
                        lineWidth={finalLineWidth}
                        radius={50}
                        startAngle={dataEntry.startAngle}
                        stroke={dataEntry.color}
                    />
                ))}
            </svg>
        </Flex>
    );
};

DiagramFC.displayName = 'Diagram';
export const Diagram = React.memo(DiagramFC);
