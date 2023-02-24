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

export function handleBondClaimed(event: BondClaimed): void {
  let entity = BondClaimedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new BondClaimedEvent(event.transaction.hash.toHexString());
  }

  entity.account = event.params.account;
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleBondCreated(event: BondCreated): void {
  let entity = BondCreatedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new BondCreatedEvent(event.transaction.hash.toHexString());
  }

  entity.account = event.params.account;
  entity.lpTokens = event.params.lpTokens;
  entity.npmToVest = event.params.npmToVest;
  entity.unlockDate = event.params.unlockDate;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleBondPoolSetup(event: BondPoolSetup): void {
  let entity = BondPoolSetupEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new BondPoolSetupEvent(event.transaction.hash.toHexString());
  }

  entity.lpToken = event.params.args.lpToken;
  entity.treasury = event.params.args.treasury;
  entity.bondDiscountRate = event.params.args.bondDiscountRate;
  entity.maxBondAmount = event.params.args.maxBondAmount;
  entity.vestingTerm = event.params.args.vestingTerm;
  entity.npmToTopUpNow = event.params.args.npmToTopUpNow;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
