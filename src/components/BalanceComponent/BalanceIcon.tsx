import * as React from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { getIconSize } from './helpers';
import { TBalanceContentSize } from './BalanceContent';

export const BalanceIcon: React.FC<{
    iconUrl?: string;
    variantsArray: Array<TBalanceContentSize>;
}> = ({ iconUrl, variantsArray }) => {
    if (!iconUrl) {
        return null;
    }

    return (
        <Flex mr="6px">
            <img
                src={iconUrl}
                width={getIconSize(variantsArray)[0]}
                height={getIconSize(variantsArray)[0]}
            />
        </Flex>
    );
};

BalanceIcon.displayName = 'BalanceIcon';
