import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link
} from '@chakra-ui/react';
import '../datatable/datatable.scss';

const Budtable = ( {title} ) => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    let users = [
      {
        id: 215,
        transaction: 'Investment in Crypto',
        date: '06/06/2022',
        status: 'Approved',
        view: 'View',
        delete: 'Delete'
      },
      {
        id: 225,
        transaction: 'Investment in Crypto',
        date: '06/06/2022',
        status: 'Pending',
        view: 'View',
        delete: 'Delete'
      },
      {
        id: 235,
        transaction: 'Investment in Crypto',
        date: '06/06/2022',
        status: 'Approved',
        view: 'View',
        delete: 'Delete'
      },
      {
        id: 245,
        transaction: 'Investment in Crypto',
        date: '06/06/2022',
        status: 'Approved',
        view: 'View',
        delete: 'Delete'
      },
      {
        id: 255,
        transaction: 'Investment in Crypto',
        date: '06/06/2022',
        status: 'Declined',
        view: 'View',
        delete: 'Delete'
      },
    ];

    setUsers(
      users.map(user => {
        return {
          select: false,
          id: user.id,
          transaction: user.transaction,
          date: user.date,
          status: user.status,
          view: user.view,
          delete: user.delete
        };
      })
    );
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title} 
        <Link _hover={{ textDecoration: 'none' }} href="/budgets/new" className='link'>
          Add New
        </Link>
      </div>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          
          <Thead>
            <Tr>
              <Th>
                <input
                  type="checkbox"
                  onChange={e => {
                    let checked = e.target.checked;
                    setUsers(
                      users.map(user => {
                        user.select = checked;
                        return user;
                      })
                    );
                  }}
                />
              </Th>
              <Th>id</Th>
              <Th>Transaction</Th>
              <Th isNumeric>Date</Th>
              <Th isNumeric>Status</Th>
              <Th isNumeric>View</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, i) => (
              <Tr key={user.id}>
                <Td>
                  <input
                    onChange={event => {
                      let checked = event.target.checked;
                      setUsers(
                        users.map(data => {
                          if (user.id === data.id) {
                            data.select = checked;
                          }
                          return data;
                        })
                      );
                    }}
                    type="checkbox"
                    checked={user.select}
                  />
                </Td>

                <Td>{`${user.id}`}</Td>
                <Td>{user.transaction}</Td>
                <Td isNumeric>{user.date}</Td>
                <Td isNumeric>
                  <span className={`status ${user.status}`}>{user.status}</span>
                </Td>
                <Td  isNumeric>
                <Link _hover={{ textDecoration: 'none' }} >

                  <span className='view'>{user.view}</span>
                </Link>
                </Td>
                <Td >
                  <span className="delete">{user.delete}</span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Budtable;
// checkbox in datatable
// https://www.youtube.com/watch?v=tB8k-X-_yBE
