import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
 


type MenuButtonPropsType = {
    background?: string

}
export const MenuButton = styled(Button)<MenuButtonPropsType>(({background, theme}) =>  ({

    minWidth: '100px',
    fontWeight: 'bold',
    boxShadow: '0 0 0 1px #095e7a, 3px 3px 10px 3px #0a4558',
    borderRadius: '5px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '6px 18px',
    color: '#ffffff',
    background: background || theme.palette.secondary.light
}))