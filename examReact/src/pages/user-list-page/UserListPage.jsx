import { useEffect } from 'react';
import { useState } from 'react';
import { fetchUsers } from '../../api/v1';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';

const UserListPage = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserList = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetchUsers();
      setUserList(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return <h1>{isLoading && 'Is loading'}</h1>;
};
//   return (
//     <div>
//       <h1>{isLoading ? 'Is loading' : ''}</h1>
//       <TableContainer component={Paper}>
//         {/* Ваша таблица для пользователей */}
//       </TableContainer>
//     </div>
//   );
// };

export default UserListPage;
