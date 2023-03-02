import { loadTransaction } from "../initializers/Transaction";

import {
  Approval,
  CoverageStartSet,
  Transfer,
} from "../../generated/templates/ICxToken/ICxToken";
import {
  ICxTokenApprovalEvent,
  CoverageStartSetEvent,
  ICxTokenTransferEvent,
} from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleApproval(event: Approval): void {
  const id = createEventID(event);
  let entity = ICxTokenApprovalEvent.load(id);

  if (!entity) {
    entity = new ICxTokenApprovalEvent(id);
  }

  entity.owner = event.params.owner.toHexString();
  entity.spender = event.params.spender.toHexString();
  entity.value = event.params.value;

  const tx = loadTransaction(event);
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
  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.account = event.params.account.toHexString();
  entity.effectiveFrom = event.params.effectiveFrom;
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleTransfer(event: Transfer): void {
  const id = createEventID(event);
  let entity = ICxTokenTransferEvent.load(id);

  if (!entity) {
    entity = new ICxTokenTransferEvent(id);
  }

  entity.from = event.params.from.toHexString();
  entity.to = event.params.to.toHexString();
  entity.value = event.params.value;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}
