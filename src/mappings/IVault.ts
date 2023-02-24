import { loadTransaction } from "../initializers/Transaction";

import {
  Approval,
  Entered,
  Exited,
  FlashLoanBorrowed,
  GovernanceTransfer,
  InterestAccrued,
  NpmStaken,
  NpmUnstaken,
  PodsIssued,
  PodsRedeemed,
  StrategyReceipt,
  StrategyTransfer,
  Transfer,
} from "../../generated/templates/IVault/IVault";
import {
  ApprovalEvent,
  EnteredEvent,
  ExitedEvent,
  FlashLoanBorrowedEvent,
  GovernanceTransferEvent,
  InterestAccruedEvent,
  NpmStakenEvent,
  NpmUnstakenEvent,
  PodsIssuedEvent,
  PodsRedeemedEvent,
  StrategyReceiptEvent,
  StrategyTransferEvent,
  TransferEvent,
} from "../../generated/schema";

export function handleApproval(event: Approval): void {
  let entity = ApprovalEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new ApprovalEvent(event.transaction.hash.toHexString());
  }

  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleEntered(event: Entered): void {
  let entity = EnteredEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new EnteredEvent(event.transaction.hash.toHexString());
  }

  entity.coverKey = event.params.coverKey;
  entity.account = event.params.account;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleExited(event: Exited): void {
  let entity = ExitedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new ExitedEvent(event.transaction.hash.toHexString());
  }

  entity.coverKey = event.params.coverKey;
  entity.account = event.params.account;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleFlashLoanBorrowed(event: FlashLoanBorrowed): void {
  let entity = FlashLoanBorrowedEvent.load(
    event.transaction.hash.toHexString()
  );

  if (!entity) {
    entity = new FlashLoanBorrowedEvent(event.transaction.hash.toHexString());
  }

  entity.lender = event.params.lender;
  entity.borrower = event.params.borrower;
  entity.stablecoin = event.params.stablecoin;
  entity.amount = event.params.amount;
  entity.fee = event.params.fee;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleGovernanceTransfer(event: GovernanceTransfer): void {
  let entity = GovernanceTransferEvent.load(
    event.transaction.hash.toHexString()
  );

  if (!entity) {
    entity = new GovernanceTransferEvent(event.transaction.hash.toHexString());
  }

  entity.to = event.params.to;
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleInterestAccrued(event: InterestAccrued): void {
  let entity = InterestAccruedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new InterestAccruedEvent(event.transaction.hash.toHexString());
  }

  entity.coverKey = event.params.coverKey;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleNpmStaken(event: NpmStaken): void {
  let entity = NpmStakenEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new NpmStakenEvent(event.transaction.hash.toHexString());
  }

  entity.account = event.params.account;
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleNpmUnstaken(event: NpmUnstaken): void {
  let entity = NpmUnstakenEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new NpmUnstakenEvent(event.transaction.hash.toHexString());
  }

  entity.account = event.params.account;
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handlePodsIssued(event: PodsIssued): void {
  let entity = PodsIssuedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new PodsIssuedEvent(event.transaction.hash.toHexString());
  }

  entity.account = event.params.account;
  entity.issued = event.params.issued;
  entity.liquidityAdded = event.params.liquidityAdded;
  entity.referralCode = event.params.referralCode;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handlePodsRedeemed(event: PodsRedeemed): void {
  let entity = PodsRedeemedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new PodsRedeemedEvent(event.transaction.hash.toHexString());
  }

  entity.account = event.params.account;
  entity.redeemed = event.params.redeemed;
  entity.liquidityReleased = event.params.liquidityReleased;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleStrategyReceipt(event: StrategyReceipt): void {
  let entity = StrategyReceiptEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new StrategyReceiptEvent(event.transaction.hash.toHexString());
  }

  entity.token = event.params.token;
  entity.strategy = event.params.strategy;
  entity.name = event.params.name;
  entity.amount = event.params.amount;
  entity.income = event.params.income;
  entity.loss = event.params.loss;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleStrategyTransfer(event: StrategyTransfer): void {
  let entity = StrategyTransferEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new StrategyTransferEvent(event.transaction.hash.toHexString());
  }

  entity.token = event.params.token;
  entity.strategy = event.params.strategy;
  entity.name = event.params.name;
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleTransfer(event: Transfer): void {
  let entity = TransferEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new TransferEvent(event.transaction.hash.toHexString());
  }

  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
