export const variants = {
    primary: {
        "bg": '#1F5AF6',
        "color": '#FFFFFF',
        "outline": 'none',
        ':hover:not(:disabled)': {
            opacity: '.8',
        },
        ':active': {
            bg: '#0031B2',
        },
        ':disabled': {
            bg: '#092C62',
            color: '#B0BAC7',
        },
    },
    transparent: {
        "bg": 'transparent',
        "color": 'text',
        "border": '1px solid',
        "borderColor": '#1F5AF6',
        "outline": 'none',
        ':hover:not(:disabled)': {
            border: '1px solid',
            borderColor: '#1F5AF6',
            color: 'text',
            opacity: '.8',
        },
        ':active:not(:disabled)': {
            border: '1px solid',
            borderColor: '#0031B2',
        },
    },
    success: {
        "bg": '#03A500',
        "color": '#FFFFFF',
        "outline": 'none',
        ':hover:not(:disabled)': {
            opacity: '.8',
        },
        ':active:not(:disabled)': {
            bg: '#049001',
        },
    },
};

export const sizes = {
    default: {
        fontSize: '14px',
        lineHeight: '20px',
        height: '38px',
        paddingLeft: '50px',
        paddingRight: '50px',
    },
    large: {
        fontSize: '14px',
        lineHeight: '38px',
        height: '48px',
        paddingLeft: '50px',
        paddingRight: '50px',
    },
};
