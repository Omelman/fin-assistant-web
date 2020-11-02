import React from 'react';
import {
  Avatar,
  Box,
  Divider,
  withStyles,
  Typography
} from '@material-ui/core';

const user = {
     avatar: '/static/images/avatars/avatar_6.png',
     email:  'cr.frog03@gmail.com',
     name:   'Danila Omelchenko'
   };
   
   const WhiteTextTypography = withStyles({
     root: {
       color: "#FFFFFF"
     }
   })(Typography);

   const WhiteDiv = withStyles({
     root: {
       backgroundColor: "#4f555e"
     }
   })(Divider);

   export const content = (
        <div className="rofl">
     <Box
       height="100%"
       display="flex"
       flexDirection="column"
     >
       <Box
         alignItems="center"
         display="flex"
         flexDirection="column"
         p={2}
       >
         <Avatar
             src={user.avatar}
           />
         <WhiteTextTypography
           color="textPrimary"     
           classes = "NameText"
           variant="h5"
         >
           {user.name}
         </WhiteTextTypography>
         <WhiteTextTypography
           color="textSecondary"
           variant="body2"
         >
           {user.email}  
         </WhiteTextTypography>
       </Box>
       <WhiteDiv />
     </Box>
     </div>
   );