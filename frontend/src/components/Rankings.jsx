import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

const Rankings = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async ()  => {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/api/football/competitions/2003/standings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
      console.log(result);
      setResult(result.standings[0].table);
    };
    fetchData();
  }, []); 


  const rows = result.map((team) => ({
    id: team.position,
    teamName: team.team.name,
    points: team.points,
    matchesWon: team.won,
    matchesDrawn: team.draw,
    matchesLost: team.lost,
    goalsFor: team.goalsFor,
    goalsAgainst: team.goalsAgainst,
    goalDifference: team.goalDifference,
    teamLogo: team.team.crest,
  }));

  const columns = [
    { 
      field: 'teamLogo', 
      headerName: 'Logo', 
      sortable: false,
      renderCell: (params) => <img src={params.value} alt="team logo" style={{ width: '30px', height: '30px' }} />,
    },
    { 
      field: 'id', 
      headerName: 'Position', 
      flex: 1, 
    },
    { 
      field: 'teamName', 
      headerName: 'Team Name', 
      flex: 2,  
    },
    { 
      field: 'matchesWon', 
      headerName: 'M+', 
      headerAlign: 'left', 
      align: 'left', 
      flex: 1, 
    },
    { 
      field: 'matchesDrawn', 
      headerName: 'M=', 
      headerAlign: 'left', 
      align: 'left', 
      flex: 1, 
    },
    { 
      field: 'matchesLost', 
      headerName: 'M-', 
      headerAlign: 'left', 
      align: 'left', 
      flex: 1, 
    },
    { 
      field: 'goalsFor', 
      headerName: 'Goals Scored', 
      headerAlign: 'left', 
      align: 'left', 
      flex: 1, 
    },
    { 
      field: 'goalsAgainst', 
      headerName: 'Goals Conceded', 
      headerAlign: 'left', 
      align: 'left', 
      flex: 1, 
    },
    { 
      field: 'goalDifference', 
      headerName: 'Goal Difference', 
      headerAlign: 'left', 
      align: 'left', 
      flex: 1, 
    },
    { 
      field: 'points', 
      headerName: 'Points', 
      headerAlign: 'left', 
      align: 'left', 
      flex: 1, 
    },
  ];

  

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
    />
  );
};

export default Rankings;
