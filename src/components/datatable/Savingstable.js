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


const Savingstable = ( {title} ) => {
  const [savings, setSavings] = useState([]);
  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    const savingRef = collection(db, "users", currentUser.uid, "savings");
    const q = query(savingRef, orderBy('timeStamp'))
    const unsub = onSnapshot(
      q,
      snapshot => {
        let list = [];
        snapshot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setSavings(list);
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
      await deleteDoc(doc(db, 'savings', id));
      setSavings(savings.filter(saving => saving.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title} 
        <Link _hover={{ textDecoration: 'none' }} href="/savings/new" className='link'>
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
                    setSavings(
                      savings.map(saving => {
                        saving.select = checked;
                        return saving;
                      })
                    );
                  }}
                />
              </Th>
              <Th>Date</Th>
              <Th>Name</Th>
              <Th>Amount</Th>
              <Th>Credited Account</Th>
              <Th>Savings Type</Th>
              <Th>Duration</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {savings.map((saving, i) => (
              <Tr key={saving.id}>
                <Td>
                  <input
                    onChange={event => {
                      let checked = event.target.checked;
                      setSavings(
                        savings.map(data => {
                          if (saving.id === data.id) {
                            data.select = checked;
                          }
                          return data;
                        })
                      );
                    }}
                    type="checkbox"
                    checked={saving.select}
                  />
                </Td>
                  
                <Td fontSize='sm'>{new Date(saving.timeStamp.seconds * 1000).toLocaleDateString()}</Td>
                <Td>{saving.savingsname}</Td>
                <Td>{saving.amount}</Td>
                <Td fontSize='sm'>Credited</Td>
                <Td fontSize='sm'>Typee</Td>
                <Td fontSize='sm'>Duration</Td>
                <Td >
                <Link _hover={{ textDecoration: 'none' }} >

                  <span className='view'>Edit</span>
                </Link>
                </Td>
                <Td >
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

export default Savingstable;
// checkbox in datatable
// https://www.youtube.com/watch?v=tB8k-X-_yBE
