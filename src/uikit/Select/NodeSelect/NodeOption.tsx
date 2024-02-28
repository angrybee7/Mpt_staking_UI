import * as React from 'react';
import { AddressAvatar, Box, Flex, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';
import { shortAddress } from '../../../utils';
import { INode } from '../../../stores/utils/fetchNodeList.ts';
import edit from '../../../img/edit.svg';
import { Trans } from '@waves/ui-translator';

interface INodeOption {
	node?: INode;
	isManually?: boolean;
	onClick?: (node?: INode) => void;
}

const getAddress = (address: string): string => {
    const elem = document.getElementById(`node-option-container-${address}`);
    if (!elem) {
        return address;
    }
    const children = elem.children;
    const containerWidth = elem.getBoundingClientRect().width;
    const innerWidth = [...children].reduce((acc, child) => {
        const width = child.getBoundingClientRect().width;
        return acc + width;
    }, 0);
    if (innerWidth > containerWidth) {
        return shortAddress(address);
    } else {
        return address;
    }
};

export const NodeOption: React.FC<INodeOption & Omit<TFlexProps, 'onClick'>> = ({
    node,
    isManually,
    onClick,
    ...flexProps
}) => {
    const handleClick = React.useCallback((): void => {
        if (typeof onClick === 'function') {
            onClick(node);
        }
    }, [onClick, node]);

    const [_address, setAddress] = React.useState<string>('');

    React.useEffect((): void => {
        setAddress(getAddress(node?.address));
    }, [node?.address]);

    return (
        <Flex
            id={`node-option-container-${node?.address}`}
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            width="100%"
            onClick={handleClick}
            sx={
                onClick ?
                    {
                        '&:hover': {
                            bg: 'bg'
                        },
                        'cursor': 'pointer'
                    } : {}
            }
            {...flexProps}
        >
            {node?.address &&
                <AddressAvatar
                    address={node.address}
                    variantSize="small"
                    tooltipLabels={{ scriptText: '', keepertText: '', ledgerText: '' }}
                    display="block"
                    width={24}
                    height={24}
                    mr={8}
                />
            }
            {isManually &&
                <Box
                    width="24px"
                    height="24px"
                    minWidth="24px"
                    borderRadius="50%"
                    overflow="hidden"
                    backgroundImage={`url(${edit})`}
                    mr={8}
                />
            }
            <Text
                variant="text1"
                color="textsec"
                fontFamily="Sfmono"
            >
                {_address || node?.address || ''}
                {isManually ?
                    <Flex>
					    <Text
                            variant="heading4"
                            mr={[null, '4px']}
                            color="text"
                            display={['block', 'inline']}
                        >
					        <Trans i18key="enterManually" />
					    </Text>
					    <Trans i18key="enterManuallyDesc" />
                    </Flex> :
                    null
                }
            </Text>
        </Flex>
    );
};

NodeOption.displayName = 'NodeOption';
