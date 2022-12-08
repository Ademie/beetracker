import { extendTheme } from '@chakra-ui/react';

export const myTheme = extendTheme({
  colors: {
    primary: 'rgb(46,82,176)',
    secondary: '#a0a0a0',
    tert: 'rgb(220,178,77)',
  },
  fonts: {
    heading: 'lato',
    body: 'lato',
  },
  components: {
     
    Input: {
      sizes: {
        md: {
          field: {
            borderRadius: 'none',
          },
        },
      },
    },

    Button:{
        sizes:{
            custom:{
              fontSize: '1.6em'  
            }
        },

        variants:{
            solid:{
                bg: 'none',
                color: 'secondary',
                _hover:{
                    bg: 'none'
                },
                _active:{
                    bg: 'none'
                }
                
            }
        }
    }
  },
});
