import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { areaElementClasses } from '@mui/x-charts/LineChart';

import { getDaysInMonth } from '../utils/getDaysInMonth';

const AreaGradient = ({ color, id }) => (
  <defs>
    <linearGradient id={id} x1='50%' y1='0%' x2='50%' y2='100%'>
      <stop offset='0%' stopColor={color} stopOpacity={0.3} />
      <stop offset='100%' stopColor={color} stopOpacity={0} />
    </linearGradient>
  </defs>
);

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const StatCard = ({ title, value, interval, trend, data }) => {
  const theme = useTheme();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const daysInWeek = getDaysInMonth(currentMonth, currentYear);
  
  StatCard.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    interval: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trend: PropTypes.oneOf(['down', 'neutral', 'up']).isRequired,
    value: PropTypes.string.isRequired,
  };

  const trendColors = {
    up: theme.palette.success.main,
    down: theme.palette.error.main,
    neutral: theme.palette.text.tertiary,
  };

  const labelColors = {
    up: 'success',
    down: 'error',
    neutral: 'grey',
  };

  const color = labelColors[trend];
  const chartColor = trendColors[trend];
  const trendValues = { up: '+25%', down: '-25%', neutral: '+5%' };

  return (
    <Card variant='outlined' sx={{ height: '100%', flexGrow: 1 }}>
      <CardContent>
        <Typography component='h2' variant='subtitle2' gutterBottom>
          {title}
        </Typography>
        <Stack direction='column' sx={{ justifyContent: 'space-between', flexGrow: 1, gap: 1 }}>
          <Stack sx={{ justifyContent: 'space-between' }}>
            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }} >
              <Typography variant='h4'>
                {value}
              </Typography>
              <Chip size='small' color={color} label={trendValues[trend]} />
            </Stack>
            <Typography variant='caption'>
              {interval}
            </Typography>
          </Stack>
          <Box sx={{ width: '100%', height: 50 }}>
            <SparkLineChart
              colors={[chartColor]}
              data={data}
              area
              showHighlight
              showTooltip
              xAxis={{ scaleType: 'band', data: daysInWeek }}
              sx={{ [`& .${areaElementClasses.root}`]: { fill: `url(#area-gradient-${value})` } }}
            >
              <AreaGradient color={chartColor} id={`area-gradient-${value}`} />
            </SparkLineChart>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};


export default memo(StatCard);
