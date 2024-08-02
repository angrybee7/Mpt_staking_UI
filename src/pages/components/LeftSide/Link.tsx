import * as React from 'react';
import { ExternalLink } from '@waves.exchange/wx-react-uikit';
import { Text, TextProps } from 'uikit';

export type LinkProps = TextProps & {
    href: string;
    text: string;
}

export const Link: React.FC<LinkProps> = ({ href, text, ...rest }) => {
    return (
        <ExternalLink
            href={href}
            rel="noopener noreferrer"
        >
            <Text
                as="div"
                variant="heading4"
                color="main"
                fontWeight={700}
                {...rest}
                sx={{
                    wordBreak: 'break-all',
                }}
            >
                {text}
            </Text>
        </ExternalLink>
    );
};

Link.displayName = 'Link';