import React, { useEffect, useId, useContext, useState } from 'react';
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


const Billstable = ( {title} ) => {
  const [bills, setBills] = useState([]);
  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    const billRef = collection(db, "users", currentUser.uid, "bills");
    const q = query(billRef, orderBy('timeStamp'))
    const unsub = onSnapshot(
      q,
      snapshot => {
        let list = [];
        snapshot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBills(list);
      },
      error => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

   
   const handleDelete = async id => {
    try {
      await deleteDoc(doc(db, 'bills', id));
      setBills(bills.filter(bill => bill.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title} 
        <Link _hover={{ textDecoration: 'none' }} href="/bills/new" className='link'>
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
                    setBills(
                      bills.map(bill => {
                        bill.select = checked;
                        return bill;
                      })
                    );
                  }}
                />
              </Th>
              <Th>Date</Th>
              <Th>Payee</Th>
              <Th>Amount</Th>
              <Th>Currency</Th>
              <Th>Debiting Account</Th>
              <Th>Recurrence</Th>
              <Th>Duration</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bills.map((bill, i) => (
              <Tr key={bill.id}>
                <Td>
                  <input
                    onChange={event => {
                      let checked = event.target.checked;
                      setBills(
                        bills.map(data => {
                          if (bill.id === data.id) {
                            data.select = checked;
                          }
                          return data;
                        })
                      );
                    }}
                    type="checkbox"
                    checked={bill.select}
                  />
                </Td>
                  
                <Td fontSize='sm'>{new Date(bill.timeStamp.seconds * 1000).toLocaleDateString()}</Td>
                <Td>{bill.payee}</Td>
                <Td>{bill.amount}</Td>
                <Td fontSize='sm'>Currency</Td>
                <Td fontSize='sm'>Debited Account</Td>
                <Td fontSize='sm'>Recurrence</Td>
                <Td fontSize='sm'>Duration</Td>
                <Td >
                <Link _hover={{ textDecoration: 'none' }} >

                  <span className='view'>Edit</span>
                </Link>
                </Td>
                <Td onClick={() => handleDelete(bill.id)}>
                  <span className="delete">Delete</span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Billstable;
// checkbox in datatable
// https://www.youtube.com/watch?v=tB8k-X-_yBE
