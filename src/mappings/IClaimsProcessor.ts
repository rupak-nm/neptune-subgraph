import { loadTransaction } from "../initializers/Transaction";

import {
  BlacklistSet,
  ClaimPeriodSet,
  Claimed,
} from "../../generated/templates/IClaimsProcessor/IClaimsProcessor";
import {
  BlacklistSetEvent,
  ClaimPeriodSetEvent,
  ClaimedEvent,
} from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleBlacklistSet(event: BlacklistSet): void {
  const id = createEventID(event);
  let entity = BlacklistSetEvent.load(id);

  if (!entity) {
    entity = new BlacklistSetEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.incidentDate = event.params.incidentDate;
  entity.account = event.params.account.toHexString();
  entity.status = event.params.status;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleClaimPeriodSet(event: ClaimPeriodSet): void {
  const id = createEventID(event);
  let entity = ClaimPeriodSetEvent.load(id);

  if (!entity) {
    entity = new ClaimPeriodSetEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.previous = event.params.previous;
  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleClaimed(event: Claimed): void {
  const id = createEventID(event);
  let entity = ClaimedEvent.load(id);

  if (!entity) {
    entity = new ClaimedEvent(id);
  }

  entity.cxToken = event.params.cxToken.toHexString();
  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.incidentDate = event.params.incidentDate;
  entity.account = event.params.account.toHexString();
  entity.reporter = event.params.reporter.toHexString();
  entity.amount = event.params.amount;
  entity.reporterFee = event.params.reporterFee;
  entity.platformFee = event.params.platformFee;
  entity.claimed = event.params.claimed;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}
