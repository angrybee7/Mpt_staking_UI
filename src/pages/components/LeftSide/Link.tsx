import * as React from 'react';
import { ExternalLink } from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';

export type LinkProps = {
    href: string;
    text: string;
}

export const Link: React.FC<LinkProps> = ({ href, text }) => {
    return (
        <ExternalLink
            href={href}
            rel="noopener noreferrer"
        >
            <Text
                as="div"
                variant="heading4"
                color="main"
                ml="4px"
                fontWeight={700}
                sx={{
                    wordBreak: 'break-all'
                }}
            >
                {text}
            </Text>
        </ExternalLink>
    );
};

Link.displayName = 'Link';