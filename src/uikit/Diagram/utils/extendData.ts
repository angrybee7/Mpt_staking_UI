import { IDiagramProps, TExtendedData } from './interface';
import { extractPercentage, sumValues, valueBetween } from './utils';

export const extendData = ({
    data,
    totalValue,
}: IDiagramProps): TExtendedData => {
    const chartStartAngle = 0;
    const totalAngle = 360;
    const total = totalValue || sumValues(data);
    const normalizedTotalAngle = valueBetween(totalAngle, -360, 360);
    let lastSegmentEnd = 0;
    const extendedData = [];

    for (let i = 0; i < data.length; i++) {
        const dataEntry = data[i];
        const valueInPercentage = total === 0 ? 0 : (dataEntry.value / total) * 100;
        const degrees = extractPercentage(normalizedTotalAngle, valueInPercentage);
        const startAngle = lastSegmentEnd + chartStartAngle;
        lastSegmentEnd = lastSegmentEnd + degrees;
        extendedData.push(
            Object.assign(
                {
                    percentage: valueInPercentage,
                    startAngle,
                    degrees,
                },
                dataEntry
            )
        );
    }
    return extendedData;
};
