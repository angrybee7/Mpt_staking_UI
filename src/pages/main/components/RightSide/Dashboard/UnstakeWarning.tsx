import * as React from 'react';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper.tsx';
import { Flex, Icon } from '@waves.exchange/wx-react-uikit';
import { warning } from '../../../../../img/icons/warning.tsx';
import { Text } from 'uikit';
import { Trans } from '@waves/ui-translator';

export const UnstakeWarning: React.FC = React.memo(() => {
    return (
        <SerifWrapper
            variant="warning"
        >
            <Flex
                flexDirection="row"
                alignItems="center"
                py={[6, 5]}
                px={23}
                bg="standard.$0"
            >
                <Icon
                    icon={warning}
                    size={24}
                    mr={14}
                />
                <Text
                    as="div"
                    color="text"
                    fontSize={15}
                    lineHeight="21px"
                    fontWeight={300}
                >
                    <Trans i18key="unstakeUnavailable" />
                </Text>
            </Flex>
        </SerifWrapper>
    );
});

UnstakeWarning.displayName = 'UnstakeWarning';
