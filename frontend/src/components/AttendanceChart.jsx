import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Chip, Typography, Stack } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

import { getDaysInMonth } from '../utils/getDaysInMonth';

//TODO: swap dummy date for real data
const AreaGradient = ({ color, id }) => {
  return (
    <defs>
      <linearGradient id={id} x1='50%' y1='0%' x2='50%' y2='100%'>
        <stop offset='0%' stopColor={color} stopOpacity={0.5} />
        <stop offset='100%' stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
};

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const AttendanceChart = () => {
  const theme = useTheme();
  const data = getDaysInMonth(4, 2024);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  return (
    <Card variant='outlined' sx={{ width: '100%' }}>
      <CardContent>
        <Typography component='h2' variant='subtitle2' gutterBottom>
          Attendance
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction='row'
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant='h4' component='p'>
              13,277
            </Typography>
            <Chip size='small' color='success' label='+35%' />
          </Stack>
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            Sessions per day for the last 30 days
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
            },
          ]}
          series={[
            {
              id: 'matchday',
              label: 'matchday',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                300, 900, 600, 1200, 1500, 1800, 2400, 2100, 2700, 3000, 1800,
                3300, 3600, 3900, 4200, 4500, 3900, 4800, 5100, 5400, 4800,
                5700, 6000, 6300, 6600, 6900, 7200, 7500, 7800, 8100,
              ],
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-matchday': {
              fill: 'url(\'#matchday\')',
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.light} id='matchday' />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
