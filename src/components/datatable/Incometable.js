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
  Link,
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

const Incometable = ({ title }) => {
  const [income, setIncome] = useState([]);
  const { currentUser } = useContext(AuthContext)
  useEffect(() => {
    const incomRef = collection(db, "users", currentUser.uid, "income");
    const q = query(incomRef, orderBy('timeStamp'))
    const unsub = onSnapshot(
      q,
      snapshot => {
        let list = [];
        snapshot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setIncome(list);
      },
      error => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  // DELETE ACCOUNT
  const handleDelete = async id => {
    try {
      await deleteDoc(doc(db, 'income', id));

      // await deleteDoc(doc(db, 'users', /*localUid,*/ 'income', id));
      setIncome(income.filter(incom => incom.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        <Link
          _hover={{ textDecoration: 'none' }}
          href="/income/new"
          className="link"
        >
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
                    setIncome(
                      income.map(incom => {
                        incom.select = checked;
                        return incom;
                      })
                    );
                  }}
                />
              </Th>
              <Th>Date</Th>
              <Th>Company Name</Th>
              <Th>Deposit Account</Th>
              <Th>Net Amount</Th>
              <Th>Recurrence</Th>
              <Td>Date range</Td>
              {/* <Td>Notes....</Td> */}
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {income.map(incom => (
              <Tr key={incom.id}>
                <Td>
                  <input
                    onChange={event => {
                      let checked = event.target.checked;
                      setIncome(
                        income.map(data => {
                          if (incom.id === data.id) {
                            data.select = checked;
                          }
                          return data;
                        })
                      );
                    }}
                    type="checkbox"
                    checked={incom.select}
                  />
                </Td>


                <Td>{new Date(incom.timeStamp.seconds * 1000).toLocaleDateString()}</Td>
                <Td>{incom.companyname}</Td>
                <Td>deposit account</Td>
                <Td>{`${incom.netamount}`}</Td>
                <Td>Recurrence</Td>
                <Td>Date range</Td>
                {/* <Td>Notes....</Td> */}
                <Td>
                  <Link _hover={{ textDecoration: 'none' }} href="/income/editincom">
                    <span className="view">edit</span>
                  </Link>
                </Td>
                <Td onClick={() => handleDelete(incom.id)}>
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

export default Incometable;
