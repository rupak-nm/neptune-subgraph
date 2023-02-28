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
import { createEventID } from "../initializers/EventId";

export function handleApproval(event: Approval): void {
  const id = createEventID(event);
  let entity = CxTokenApprovalEvent.load(id);

  if (!entity) {
    entity = new CxTokenApprovalEvent(id);
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
  const id = createEventID(event);
  let entity = CoverageStartSetEvent.load(id);

  if (!entity) {
    entity = new CoverageStartSetEvent(id);
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
  const id = createEventID(event);
  let entity = CxTokenTransferEvent.load(id);

  if (!entity) {
    entity = new CxTokenTransferEvent(id);
  }

  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
