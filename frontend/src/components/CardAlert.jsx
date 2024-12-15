import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const CardAlert = () => {
  const theme = useTheme();

  return (<Card variant="outlined" sx={{ mx: 2, my: 1, p: 1, borderRadius: 3 }}>
    <CardContent>
      <Typography gutterBottom sx={{ fontWeight: 600 }}>
        Upgrade to Premium for live score updates and more
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.primary }}>
        Get two weeks for free!
      </Typography>
      <Button variant="contained" size="small" fullWidth>
        Upgrade
      </Button>
    </CardContent>
  </Card>
  );
};

export default CardAlert;
