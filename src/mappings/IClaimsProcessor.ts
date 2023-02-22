import { loadTransaction } from "../initializers/Transaction";

import {
  BlacklistSet,
  ClaimPeriodSet,
  Claimed,
} from "../../generated/IClaimsProcessor/IClaimsProcessor";
import {
  BlacklistSetEvent,
  ClaimPeriodSetEvent,
  ClaimedEvent,
} from "../../generated/schema";

export function handleBlacklistSet(event: BlacklistSet): void {
  let entity = BlacklistSetEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new BlacklistSetEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;

  entity.productKey = event.params.productKey;

  entity.incidentDate = event.params.incidentDate;

  entity.account = event.params.account;

  entity.status = event.params.status;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleClaimPeriodSet(event: ClaimPeriodSet): void {
  let entity = ClaimPeriodSetEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new ClaimPeriodSetEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;

  entity.previous = event.params.previous;

  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleClaimed(event: Claimed): void {
  let entity = ClaimedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new ClaimedEvent(event.transaction.hash.toString());
  }

  entity.cxToken = event.params.cxToken;

  entity.coverKey = event.params.coverKey;

  entity.productKey = event.params.productKey;

  entity.incidentDate = event.params.incidentDate;

  entity.account = event.params.account;

  entity.reporter = event.params.reporter;

  entity.amount = event.params.amount;

  entity.reporterFee = event.params.reporterFee;

  entity.platformFee = event.params.platformFee;

  entity.claimed = event.params.claimed;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
