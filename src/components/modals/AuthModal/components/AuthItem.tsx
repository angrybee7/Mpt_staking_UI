import * as React from 'react';
import { IIcon } from '@waves.exchange/wx-react-uikit/dist/esm/components/Icon/Icon';
import { BoxProps, Flex, Icon } from '@waves.exchange/wx-react-uikit';
import { Text } from './../../../../uikit/Text/Text';
import { ITransProps, Trans } from '@waves/ui-translator';

interface AuthItemProps {
    text: ITransProps;
    icon: IIcon;
    onSelect: () => void;
}

export const AuthItem: React.FC<AuthItemProps & BoxProps> = ({
    onSelect,
    text,
    icon,
    ...rest
}) => {
    const { sx, ...otherRest } = rest;
    return (
        <Flex
            onClick={onSelect}
            maxWidth={340}
            width="100%"
            p={16}
            mb="6px"
            bg="wdBlackButton"
            border="1px solid transparent"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            sx={{
                '&:hover, &.selected': {
                    bg: '#010F2C',
                    borderColor: 'wdmain',
                    span: {
                        color: 'standard.$0',
                    },
                },
                ...(sx as Record<string, any>),
            }}
            {...otherRest}
        >
            <Icon icon={icon} size={28} mr="12px" />
            <Text variant="text1" color="wdtextsec">
                <Trans {...text} />
            </Text>
        </Flex>
    );
};

AuthItem.displayName = 'AuthItem';
