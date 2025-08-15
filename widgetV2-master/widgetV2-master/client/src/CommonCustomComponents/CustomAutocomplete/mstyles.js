export const styles = {
    base: {
        '& label.Mui-focused': {
            color: '#000000',
        },
        '& .MuiInputBase-input': {
            fontSize: '14px',
            width: '70%',
            padding: '6px 6px !important'
        },
        '& .MuiInputLabel-formControl': {
            top: '-4px',
            fontSize: '14px'
        },
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            '& fieldset': {
                border: '1.5px solid #dedfdf',
            },
            '&:hover fieldset': {
                border: '1.5px solid #dedfdf',
            },
            '&.Mui-focused fieldset': {
                border: '1.5px solid #f29112',
            },
        },
        '& .MuiOutlinedInput-root.Mui-disabled': {
            backgroundColor: 'transparent',
            '& fieldset': {
                border: '1.5px solid #dedfdf',
            },
            '&:hover fieldset': {
                border: '1.5px solid #dedfdf',
            },
            '&.Mui-focused fieldset': {
                border: '1.5px solid #f29112',
            },
        }
    },

    error: {
        marginBottom: '15px',
        '& label.Mui-focused': {
            color: '#dd200c !important',
        },
        '& .MuiInputBase-input': {
            width: '70%',
            fontSize: '14px',
            padding: '6px 6px !important'
        },
        '& .MuiInputLabel-formControl': {
            top: '-4px',
            fontSize: '14px',
        },
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            '& fieldset': {
                border: '1.5px solid #dd200c',
            },
            '&:hover fieldset': {
                border: '1.5px solid #dd200c',
            },
            '&.Mui-focused fieldset': {
                border: '1.5px solid #dd200c',
            },
        },
        '& .MuiOutlinedInput-root.Mui-disabled': {
            backgroundColor: 'transparent',
            '& fieldset': {
                border: '1.5px solid #dd200c',
            },
            '&:hover fieldset': {
                border: '1.5px solid #dd200c',
            },
            '&.Mui-focused fieldset': {
                border: '1.5px solid #dd200c',
            },
        },
    }
};
