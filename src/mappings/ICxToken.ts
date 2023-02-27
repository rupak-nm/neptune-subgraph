import { loadTransaction } from "../initializers/Transaction";

import {
  Approval,
  CoverageStartSet,
  Transfer,
} from "../../generated/templates/ICxToken/ICxToken";
import {
  CxTokenApprovalEvent,
  CoverageStartSetEvent,
  CxTokenTransferEvent,
} from "../../generated/schema";

export function handleApproval(event: Approval): void {
  let entity = CxTokenApprovalEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new CxTokenApprovalEvent(event.transaction.hash.toHexString());
  }

  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleCoverageStartSet(event: CoverageStartSet): void {
  let entity = CoverageStartSetEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new CoverageStartSetEvent(event.transaction.hash.toHexString());
  }

  entity.policyId = event.params.policyId;
  entity.coverKey = event.params.coverKey;
  entity.productKey = event.params.productKey;
  entity.account = event.params.account;
  entity.effectiveFrom = event.params.effectiveFrom;
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleTransfer(event: Transfer): void {
  let entity = CxTokenTransferEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new CxTokenTransferEvent(event.transaction.hash.toHexString());
  }

  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
