import { ethereum } from "@graphprotocol/graph-ts";
import { Transaction } from "../../generated/schema";

export function loadTransaction(event: ethereum.Event): Transaction {
  const id = event.transaction.hash.toHexString();

  let transaction = Transaction.load(id);
  if (transaction === null) {
    transaction = new Transaction(id);
  }

  transaction.transactionHash = event.transaction.hash.toHexString();
  transaction.blockNumber = event.block.number;
  transaction.timestamp = event.block.timestamp;
  transaction.gasPrice = event.transaction.gasPrice;
  transaction.gasUsed = event.transaction.gasLimit;
  transaction.from = event.transaction.from.toHexString();
  transaction.to = event.transaction.to;

  transaction.save();

  return transaction as Transaction;
}
