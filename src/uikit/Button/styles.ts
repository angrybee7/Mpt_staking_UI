export const variants = {
    primary: {
        'bg': '#1F5AF6',
        'color': '#FFFFFF',
        'outline': 'none',
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
        'bg': 'transparent',
        'color': '#1E1E1E',
        'border': '1px solid',
        'borderColor': 'transparent',
        'outline': 'none',
        ':hover:not(:disabled)': {
            border: '1px solid',
            borderColor: 'transparent',
            backgroundColor: '#EBF5FF'
        },
        ':active:not(:disabled)': {
            border: '1px solid',
            borderColor: 'transparent',
            backgroundColor: '#EBF5FF'
        },
        ':disabled': {
            border: '1px solid',
            borderColor: 'transparent',
            color: 'rgba(151, 168, 178, 1)',
            opacity: '.5',
        },
    },
    error: { // заменить потом стили на нужные
        'bg': '#03A500',
        'color': '#FFFFFF',
        'outline': 'none',
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
        paddingLeft: '24px',
        paddingRight: '24px',
    },
    large: {
        fontSize: '14px',
        lineHeight: '38px',
        height: '48px',
        paddingLeft: '50px',
        paddingRight: '50px',
    },
};
