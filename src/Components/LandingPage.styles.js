import { css } from '@emotion/css'

export const cssTitle = css({
    '.cui-planet-form': {
        width: "100%",
        margin: "20px",
        'form': {
            margin: '20px',
            'label': {
                marginRight: '10px',
            },
            'select': {
                width: '320px',
                height: '35px',
                marginRight: '10px',

            },
            button: {
                width: '100px',
                height: '36px',
                background: '#002677',
                color:'#fff',
                boxShadow: 'none',
                border: 'none'
            }
        }
    },
    '.cui-resident-list': {
        display: 'inline-block',
        width: '40%',
        borderSpacing: '1px',
        border: '1px solid #ededed',
        margin: '0 auto',
        padding: '10px',
        marginBottom: '15px',
        'th':{
            padding: '15px',
            background: '#dbe1ec',
        },
        'td':{
            padding: '5px 10px',
        },
        
    },
    '.cui-resident-pagination': {
        display: 'flex',
        justifyContent: 'space-around'
    },
    '.cui-resident-row': {
        display: 'flex',
        maxWidth: 'fit-content',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        'div':{
            paddingRight: '5px'
        }
    }
})