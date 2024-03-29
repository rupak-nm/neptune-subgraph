import { loadTransaction } from "../initializers/Transaction";

import {
  BondClaimed,
  BondCreated,
  BondPoolSetup,
} from "../../generated/templates/IBondPool/IBondPool";
import {
  BondClaimedEvent,
  BondCreatedEvent,
  BondPoolSetupEvent,
} from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleBondClaimed(event: BondClaimed): void {
  const id = createEventID(event);
  let entity = BondClaimedEvent.load(id);

  if (!entity) {
    entity = new BondClaimedEvent(id);
  }

  entity.account = event.params.account.toHexString();
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleBondCreated(event: BondCreated): void {
  const id = createEventID(event);
  let entity = BondCreatedEvent.load(id);

  if (!entity) {
    entity = new BondCreatedEvent(id);
  }

  entity.account = event.params.account.toHexString();
  entity.lpTokens = event.params.lpTokens;
  entity.npmToVest = event.params.npmToVest;
  entity.unlockDate = event.params.unlockDate;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleBondPoolSetup(event: BondPoolSetup): void {
  const id = createEventID(event);
  let entity = BondPoolSetupEvent.load(id);

  if (!entity) {
    entity = new BondPoolSetupEvent(id);
  }

  entity.lpToken = event.params.args.lpToken.toHexString();
  entity.treasury = event.params.args.treasury.toHexString();
  entity.bondDiscountRate = event.params.args.bondDiscountRate;
  entity.maxBondAmount = event.params.args.maxBondAmount;
  entity.vestingTerm = event.params.args.vestingTerm;
  entity.npmToTopUpNow = event.params.args.npmToTopUpNow;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}
