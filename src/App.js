import '../src/App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Single from './pages/profile/Profile';
import NewAccount from './pages/new/NewAccount';
import NewBill from './pages/new/NewBill';
import NewBud from './pages/new/NewBud';
import NewCard from './pages/new/NewCard';
import NewIncome from './pages/new/NewIncome';
import NewInvest from './pages/new/NewInvest';
import NewLoan from './pages/new/NewLoan';
import NewSaving from './pages/new/NewSaving';
import NewGoal from './pages/new/NewGoal';


import Accountslist from './pages/list/Accountslist';
import Cardslist from './pages/list/Cardslist';
import Billslist from './pages/list/Billslist';
import Loanslist from './pages/list/Loanslist';
import Incomelist from './pages/list/Incomelist';
import Budlist from './pages/list/Budlist';
import Savingslist from './pages/list/Savingslist';
import Investlist from './pages/list/Investlist';
import EditProfile from './pages/new/EditProfile';

import {
  accountInputs,
  cardInputs,
  incomeInputs,
  loanInputs,
  billsInputs,
  savingsInputs,
  budgetInputs,
  investInputs,
  profileInputs,
  signupInputs,
  goalsInputs
} from './formSource';
import Signup from './pages/signup/Signup';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import EditAccount from './pages/edit/EditAccount';
import Goalslist from './pages/list/Goalslist';

function App() {

  // protect routes from guest
  const {currentUser} = useContext(AuthContext)
  
  
  
  

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup inputs={signupInputs}/>} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="profile">
              <Route
                index
                element={
                  <RequireAuth>
                    <Accountslist />
                  </RequireAuth>
                }
              />
              <Route
                path=":profileId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="edit"
                element={
                  <RequireAuth>
                    <EditProfile
                      inputs={profileInputs}
                      title="Edit Account"
                      details="Make changes to your account below. Ensure password and confirm password are the same."
                    />
                  </RequireAuth>
                }
              />
            </Route>


            <Route path="accounts">
              <Route
                index
                element={
                  <RequireAuth>
                    <Accountslist />
                  </RequireAuth>
                }
              />
              <Route path=":accountId" />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewAccount
                      inputs={accountInputs}
                      title="Add New Account"
                      details="Use the form below to add an account, make sure that all account details are entered correctly. After succesfully adding an account, you will be prompted to add another if you want to."
                    />
                  </RequireAuth>
                }
              />
               <Route path=":accountId" />
               <Route
                path="editacct"
                element={
                  <RequireAuth>
                    <EditAccount
                      inputs={accountInputs}
                      title="Edit Account"
                      details="Make changes to your account below."
                    />
                  </RequireAuth>
                }
              />
            </Route>


            <Route path="cards">
              <Route
                index
                element={
                  <RequireAuth>
                    <Cardslist />
                  </RequireAuth>
                }
              />
              <Route
                path=":cardId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewCard
                      inputs={cardInputs}
                      title="Add New Card"
                      details="Use the form below to add a new card, make sure that all card details are entered correctly. After succesfully adding a card, you will be prompted to add another if you want to."
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="income">
              <Route index element={<Incomelist />} />
              <Route path=":incomeId" element={<Single />} />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewIncome
                      inputs={incomeInputs}
                      title="Add Income Source"
                      details="Use the form below to add an income source, make sure that all details are entered correctly. After succesfully adding an income source, you will be prompted to add another if you want to."
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="bills">
              <Route
                index
                element={
                  <RequireAuth>
                    <Billslist />
                  </RequireAuth>
                }
              />
              <Route
                path=":billId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewBill
                      inputs={billsInputs}
                      title="Add New Bill"
                      details="Use the form below to add a new bill, make sure that all card details are entered correctly. After succesfully adding a bill, you will be prompted to add another if you want to."
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="savings">
              <Route
                index
                element={
                  <RequireAuth>
                    <Savingslist />
                  </RequireAuth>
                }
              />
              <Route
                path=":savingsId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewSaving
                      inputs={savingsInputs}
                      title="Add New Savings"
                      details="Use the form below to add a new savings. After succesfully adding a savings, you will be prompted to add another if you want to."
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="investments">
              <Route
                index
                element={
                  <RequireAuth>
                    <Investlist />
                  </RequireAuth>
                }
              />
              <Route path="invest:Id" element={<Single />} />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewInvest
                      inputs={investInputs}
                      title="Add New Investment"
                      details="Use the form below to add a new card, make sure that all card details are entered correctly. After succesfully adding a card, you will be prompted to add another if you want to."
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="loans">
              <Route
                index
                element={
                  <RequireAuth>
                    <Loanslist />
                  </RequireAuth>
                }
              />
              <Route path=":budgetId" element={<Single />} />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewLoan
                      inputs={loanInputs}
                      title="Add New Loan"
                      details="Did you take a loan? Well almost everyone does. Add your loan details so you can keep up with payments, you will be prompted to add another if you want to."
                    />
                  </RequireAuth>
                }
              />
            </Route>


            <Route path="budgets">
              <Route
                index
                element={
                  <RequireAuth>
                    <Budlist />
                  </RequireAuth>
                }
              />
              <Route
                path=":budgetId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewBud
                      inputs={budgetInputs}
                      title="Add New Budget"
                      details="Use the form below to add a new card, make sure that all card details are entered correctly. After succesfully adding a card, you will be prompted to add another if you want to."
                    />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="goals">
              <Route
                index
                element={
                  <RequireAuth>
                    <Goalslist />
                  </RequireAuth>
                }
              />
              <Route
                path=":goalsId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewGoal
                      inputs={goalsInputs}
                      title="Add a New Goal"
                      details="Use the form below to add a new card, make sure that all card details are entered correctly. After succesfully adding a card, you will be prompted to add another if you want to."
                    />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
