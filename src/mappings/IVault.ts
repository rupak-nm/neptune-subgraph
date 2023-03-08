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
} from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleApproval(event: Approval): void {}

export function handleEntered(event: Entered): void {
  const id = createEventID(event);
  let entity = EnteredEvent.load(id);

  if (!entity) {
    entity = new EnteredEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.account = event.params.account.toHexString();

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleExited(event: Exited): void {
  const id = createEventID(event);
  let entity = ExitedEvent.load(id);

  if (!entity) {
    entity = new ExitedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.account = event.params.account.toHexString();

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleFlashLoanBorrowed(event: FlashLoanBorrowed): void {
  const id = createEventID(event);
  let entity = FlashLoanBorrowedEvent.load(id);

  if (!entity) {
    entity = new FlashLoanBorrowedEvent(id);
  }

  entity.lender = event.params.lender.toHexString();
  entity.borrower = event.params.borrower.toHexString();
  entity.stablecoin = event.params.stablecoin.toHexString();
  entity.amount = event.params.amount;
  entity.fee = event.params.fee;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleGovernanceTransfer(event: GovernanceTransfer): void {
  const id = createEventID(event);
  let entity = GovernanceTransferEvent.load(id);

  if (!entity) {
    entity = new GovernanceTransferEvent(id);
  }

  entity.to = event.params.to.toHexString();
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleInterestAccrued(event: InterestAccrued): void {
  const id = createEventID(event);
  let entity = InterestAccruedEvent.load(id);

  if (!entity) {
    entity = new InterestAccruedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleNpmStaken(event: NpmStaken): void {
  const id = createEventID(event);
  let entity = NpmStakenEvent.load(id);

  if (!entity) {
    entity = new NpmStakenEvent(id);
  }

  entity.account = event.params.account.toHexString();
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleNpmUnstaken(event: NpmUnstaken): void {
  const id = createEventID(event);
  let entity = NpmUnstakenEvent.load(id);

  if (!entity) {
    entity = new NpmUnstakenEvent(id);
  }

  entity.account = event.params.account.toHexString();
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handlePodsIssued(event: PodsIssued): void {
  const id = createEventID(event);
  let entity = PodsIssuedEvent.load(id);

  if (!entity) {
    entity = new PodsIssuedEvent(id);
  }

  entity.account = event.params.account.toHexString();
  entity.issued = event.params.issued;
  entity.liquidityAdded = event.params.liquidityAdded;
  entity.referralCode = event.params.referralCode.toHexString();

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handlePodsRedeemed(event: PodsRedeemed): void {
  const id = createEventID(event);
  let entity = PodsRedeemedEvent.load(id);

  if (!entity) {
    entity = new PodsRedeemedEvent(id);
  }

  entity.account = event.params.account.toHexString();
  entity.redeemed = event.params.redeemed;
  entity.liquidityReleased = event.params.liquidityReleased;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleStrategyReceipt(event: StrategyReceipt): void {
  const id = createEventID(event);
  let entity = StrategyReceiptEvent.load(id);

  if (!entity) {
    entity = new StrategyReceiptEvent(id);
  }

  entity.token = event.params.token.toHexString();
  entity.strategy = event.params.strategy.toHexString();
  entity.name = event.params.name.toHexString();
  entity.amount = event.params.amount;
  entity.income = event.params.income;
  entity.loss = event.params.loss;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleStrategyTransfer(event: StrategyTransfer): void {
  const id = createEventID(event);
  let entity = StrategyTransferEvent.load(id);

  if (!entity) {
    entity = new StrategyTransferEvent(id);
  }

  entity.token = event.params.token.toHexString();
  entity.strategy = event.params.strategy.toHexString();
  entity.name = event.params.name.toHexString();
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleTransfer(event: Transfer): void {}
