function checkCashRegister(price, cash, cid) {
  let transaction = {
    status: "",
    change: []
  }

  // let cidValues = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  let change = cash - price;
  let cidValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let totalOnHand = cid.reduce((acc, current) => acc + current[1], 0);
  cid.reverse();//easier processing for reversed cid

  let amountsOnHand = [];
  for(let i in cid){
    amountsOnHand.push(parseInt((cid[i][1]/cidValues[i]).toFixed(2)));
  }

  totalOnHand = parseFloat(totalOnHand.toFixed(2));
  if (totalOnHand < change) {
    transaction.status = "INSUFFICIENT_FUNDS";
    transaction.change = [];
    return transaction;
  }

  let c = change;
  for (let i in cid) {
    c = parseFloat(c.toFixed(2));
    if(cid[i][1]){
      let amountNeeded = Math.floor(c / cidValues[i]);
      if (amountNeeded > amountsOnHand[i]) {
        c -= amountsOnHand[i] * cidValues[i];
        transaction.change.push([cid[i][0], amountsOnHand[i] * cidValues[i]]);
      } else if (amountNeeded) {
        c -= amountNeeded * cidValues[i];
        transaction.change.push([cid[i][0], amountNeeded * cidValues[i]]);
      }
    }
  }

  cid.reverse();
  if (c !== 0) {
    transaction.status = "INSUFFICIENT_FUNDS";
    transaction.change = [];
  } else if (totalOnHand == change) {
    transaction.status = "CLOSED";
    transaction.change = cid;
  } else {
    transaction.status = "OPEN";
  }

  return transaction;
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
