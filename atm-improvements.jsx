const ATMDeposit = ({ onChange, isDeposit, validation }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    let alertM=""
    if ( (isDeposit) || (isDeposit && validation) ){
        alertM = ""
    }
    else { 
        if(!isDeposit && !validation){ alertM = "Entered cash back amount is invalid or graterthan your account balance!"}
        else{ alertM = ""}
    }
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <h5> {alertM}</h5>
        <input id="number-input" type="number" width="200" min="1"onChange={onChange}></input>
        <input type="submit" disabled={!validation} width="200" value="Submit" id="submit-input"></input>
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState('')
    const [validTransaction, setValidTransaction] = React.useState(false);
  
    let status = `Account Balance: $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);

    const handleChange = (event) => {
      console.log(`handleChange ${event.target.value}`);
      let inputVal = Number(event.target.value) 
      if((inputVal <= 0)){
         return setValidTransaction(false)
      }
      if((atmMode === "Cash Back" && inputVal > totalState)){
         setValidTransaction(false)
      }
      else{
         setValidTransaction(true)
      }
      setDeposit(Number(event.target.value));
    };
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      //setValidTransaction(false);
      //setDeposit(0)
      event.preventDefault();
    };
  
     const handleModeSelect = (event) => {
       setAtmMode(event.target.value)
       console.log("atmMode")
       console.log(atmMode)
       event.target.value === "Deposit" ? setIsDeposit(true) : setIsDeposit(false)
       console.log("isDeposit")
       console.log(isDeposit)
       console.log(event.target.value)
       event.preventDefault();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        {
          atmMode && (
            <ATMDeposit onChange={handleChange} isDeposit={isDeposit} validation={validTransaction}></ATMDeposit>
          )
        }
        
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
  