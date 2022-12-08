
export const signupInputs = [
  {
    id: "firstname",
    label: 'First Name',
    type: 'text',
    placeholder: 'Given Name',

  },
  {
    id: "lastname",
    label: 'Last Name',
    type: 'text',
    placeholder: 'Surname',
  },
  {
    id: "email",
    label: 'Email Address',
    type: 'email',
    placeholder: 'ademiedave107@gmail.com',
  },
  {
    id: "password",
    label: 'Password',
    type: 'password',
    placeholder: 'password',
  },
  {
    id: "phone",
    label: 'Phone Number',
    type: 'number',
    placeholder: '+ 123 456 789',
  },
  {
    id: "address",
    label: 'Address',
    type: 'text',
    placeholder: 'Elt St. 204 Forteta Ave. NewYork',
  },

];

export const profileInputs = [
  {
    id: 'firstname',
    label: 'First Name',
    type: 'text',
    placeholder: 'Given Name',
  },
  {
    id: 'lastname',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Surname',
  },
  {
    id: 'emailaddress',
    label: 'Email Address',
    type: 'email',
    placeholder: 'ademiedave107@gmail.com',
  },
  {
    id: 'phonenumber',
    label: 'Phone Number',
    type: 'number',
    placeholder: '+ 123 456 789',
  },
  {
    id: 'address',
    label: 'Address',
    type: 'text',
    placeholder: 'Elt St. 204 Forteta Ave. NewYork',
  },
];


// ACCOUNTS
export const accountInputs = [
  {
    id: "bankname",
    label: 'Bank Name',
    type: 'text',
    placeholder: 'Bank Name',
    value: localStorage.getItem('boo'),

  },
  {
    id: "accountname",
    label: 'Account Name',
    type: 'text',
    placeholder: 'Account Name',
    value: 'werey2',
  },
  {
    id: "accountnumber",
    label: 'Last 4 Digits of Account Number',
    type: 'number',
    placeholder: '**** 1234',
    value: 3,
  },
  {
    id: "openingbalance",
    label: 'Opening Balance',
    type: 'number',
    placeholder: '$20,000',
    value: 4,
  },
];


// CREDIT CARDS
export const cardInputs = [

  // {
  //   id: "bankname",
  //   label: 'Bank Name',
  //   type: 'text',
  //   placeholder: 'Bank Name',
  // },
  {
    id: "cardname",
    label: 'Card Name',
    type: 'text',
    placeholder: 'Card Name',
  },
  {
    id: "cardnumber",
    label: 'Last 6 Digits of Card Number',
    type: 'number',
    placeholder: '**** 123 456',
  },
  {
    id: "apr",
    label: 'APR',
    type: 'number',
    placeholder: '0%',
  },
  {
    id: "currentbalance",
    label: 'Current Balance',
    type: 'text',
    placeholder: '$10,000',
  },
];

// CREDIT CARDS
export const incomeInputs = [

  {
    id: 'companyname',
    label: 'Company Name',
    type: 'text',
    placeholder: 'Company Name',
  },
  {
    id: 'netamount',
    label: 'Net Amount',
    type: 'number',
    placeholder: '$0.00',
    desc: 'Estimated amount after taxes'
  },
];
// LOANS
export const loanInputs = [

  {
    id: 'accountname',
    label: 'Account Name',
    type: 'text',
    placeholder: 'Account Name',
  },
  {
    id: 'loanamount',
    label: 'Loan Amount',
    type: 'number',
    placeholder: '-$20,000',
  },
  {
    id: 'accountnumber',
    label: 'Last 4 Digits of Account Number',
    type: 'number',
    placeholder: '**** 1234',
  },
  {
    id: 'apr',
    label: 'APR',
    type: 'number',
    placeholder: '0%',

  },
];
// BILLS
export const billsInputs = [

  {
    id: 'payee',
    label: 'Payee',
    type: 'text',
    placeholder: 'Payee',
  },
  {
    id: 'amount',
    label: 'Amount',
    type: 'number',
    placeholder: '$20,000',
    desc: 'Can be estimated'
  },
];
// SAVINGS
export const savingsInputs = [

  {
    id: 'savingsname',
    label: 'Savings Name',
    type: 'text',
    placeholder: 'e.g Car Purchase',
  },
  {
    id: 'amount',
    label: 'Amount',
    type: 'number',
    placeholder: '$20,000',
    desc: 'Can be estimated'
  },
];
// INVESTMENTS
export const investInputs = [

  {
    id: 'investname',
    label: 'Investment Name',
    type: 'text',
    placeholder: 'e.g Stocks Investment',
  },
  {
    id: 'amount',
    label: 'Amount',
    type: 'number',
    placeholder: '$20,000',
    desc: 'Can be estimated'
  },
];

// BUDGET
export const budgetInputs = [

  {
    id: 1,
    label: 'Payee',
    type: 'text',
    placeholder: 'Payee',
  },
  {
    id: 2,
    label: 'Amount',
    type: 'number',
    placeholder: '$20,000',
    desc: 'Can be estimated'
  },
];

// GOALS
export const goalsInputs = [

  {
    id: "title",
    label: 'Goal Title',
    type: 'text',
    placeholder: 'Payee',
  },
  {
    id: "duration",
    label: 'Duration',
    type: 'number',
    placeholder: '$20,000',
    desc: 'Can be estimated'
  },
];