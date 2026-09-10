import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../../../ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../../../ui-component/cards/TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { fetchDashboardStats } from '../../../api/stats';

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';

// ==============================|| DEFAULT DASHBOARD ||============================== //

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    monthlyOrders: [],
    monthlyEarnings: [],
    popularProducts: []
  });

  useEffect(() => {
    let isMounted = true;
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        if (isMounted && data) {
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to load dashboard stats', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <EarningCard isLoading={isLoading} totalEarnings={stats.totalEarnings} />
          </Grid>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <TotalOrderLineChartCard
              isLoading={isLoading}
              totalOrders={stats.totalOrders}
              monthlyOrders={stats.monthlyOrders}
              monthlyEarnings={stats.monthlyEarnings}
            />
          </Grid>
          <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
            <Grid container spacing={gridSpacing}>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalIncomeDarkCard
                  isLoading={isLoading}
                  total={stats.totalCustomers}
                  label="Total Customers"
                  icon={<PeopleAltTwoToneIcon fontSize="inherit" />}
                />
              </Grid>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalIncomeLightCard
                  isLoading={isLoading}
                  total={stats.totalProducts}
                  label="Active Products"
                  icon={<StorefrontTwoToneIcon fontSize="inherit" />}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TotalGrowthBarChart
              isLoading={isLoading}
              totalEarnings={stats.totalEarnings}
              monthlyEarnings={stats.monthlyEarnings}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <PopularCard isLoading={isLoading} popularProducts={stats.popularProducts} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
