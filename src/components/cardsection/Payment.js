import '../cardsection/cards.scss'

const Payment = () => {
  const details = {
    number: `4444 1111 5555 5454`,
    exp: '03/23',
    type: 'debit',
    brand: 'mastercard',
  };
  return (
    <div className="creditcards">
      Cards
      <div className='cardContainer'>
        <div className="cardtop">
          <div className="topleft">
            <div className="circle">
              <div className="circle-x"></div>
              <div className="circle-y"></div>
            </div>
            {details.brand}
          </div>
          <div className="topright">
            {details.type}
          </div>
        </div>
        <div className="cardcenter">
          {details.number}
        </div>
        <div className="cardbottom">
          {details.exp}
        </div>
      </div>
    </div>
  );
};

export default Payment;
