import {appRoutes} from '../../../utils/constants.ts';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {Box, List, ListItem, ListItemButton, ListItemText, useMediaQuery} from '@mui/material';

const adminLinks = [
  {
    id: 1,
    name: 'Список курсов',
    navLink: appRoutes.courses,
  },
  {
    id: 2,
    name: 'Список категорий',
    navLink: appRoutes.categories,
  },
];

const AdminNavigation = () => {
  const isSmallScreen = useMediaQuery('(max-width:760px)');

  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState<number | null>(null);

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <nav>
          <List
            sx={{
              display: isSmallScreen ? 'flex' : '',
              flexWrap: isSmallScreen ? 'wrap' : '',
            }}
          >
            {adminLinks.map((link) => (
              <ListItem key={link.id} disableGutters>
                <ListItemButton
                  selected={selectedLink === link.id}
                  onClick={() => {
                    setSelectedLink(link.id);
                    navigate(link.navLink);
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{
                      fontSize: 20,
                      color: selectedLink === link.id ? 'primary' : 'inherit',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    </>
  );
};

export default AdminNavigation;