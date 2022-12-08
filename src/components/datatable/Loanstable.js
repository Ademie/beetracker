import React, { useEffect, useContext, useState } from 'react';
import '../datatable/datatable.scss';
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
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';

const Loanstable = ( {title} ) => {
  const [loans, setLoans] = useState([]);
  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    const loanRef = collection(db, "users", currentUser.uid, "loans");
    const q = query(loanRef, orderBy('timeStamp'))
    const unsub = onSnapshot(
      q,
      snapshot => {
        let list = [];
        snapshot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setLoans(list);
      },
      error => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);



   // DELETE LOAN
   const handleDelete = async id => {
    try {
      await deleteDoc(doc(db, 'loans', id));
      setLoans(loans.filter(loan => loan.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title} 
        <Link _hover={{ textDecoration: 'none' }} href="/loans/new" className='link'>
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
                    setLoans(
                      loans.map(user => {
                        user.select = checked;
                        return user;
                      })
                    );
                  }}
                />
              </Th>
              <Th>Date</Th>
              <Th>Account Name</Th>
              <Th>Account Number</Th>
              <Th>APR</Th>
              <Th>Loan Amount</Th>
              <Th>Date Range</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loans.map((loan, i) => (
              <Tr key={loan.id}>
                <Td>
                  <input
                    onChange={event => {
                      let checked = event.target.checked;
                      setLoans(
                        loans.map(data => {
                          if (loan.id === data.id) {
                            data.select = checked;
                          }
                          return data;
                        })
                      );
                    }}
                    type="checkbox"
                    checked={loan.select}
                  />
                </Td>

                <Td fontSize='sm'>{new Date(loan.timeStamp.seconds * 1000).toLocaleDateString()}
                </Td>
                <Td>{loan.accountname}</Td>
                <Td>{loan.accountnumber}</Td>
                <Td fontSize='sm'>{loan.apr}</Td>
                <Td>{loan.loanamount}</Td>
                <Td fontSize='sm'>period</Td>
                <Td fontSize='sm'>
                  <Link _hover={{ textDecoration: 'none' }} href="/cards/editcard">
                    <span className="view">edit</span>
                  </Link>
                </Td>
                <Td fontSize='sm' onClick={() => handleDelete(loan.id)}>
                  <span className="delete">delete</span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Loanstable;

