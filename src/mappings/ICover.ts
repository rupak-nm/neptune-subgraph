import { loadTransaction } from "../initializers/Transaction";

import {
  CoverCreated,
  CoverCreationFeeSet,
  CoverCreatorWhitelistUpdated,
  CoverInitialized,
  CoverUpdated,
  CoverUserWhitelistUpdated,
  MinCoverCreationStakeSet,
  MinStakeToAddLiquiditySet,
  ProductCreated,
  ProductStateUpdated,
  ProductUpdated,
} from "../../generated/templates/ICover/ICover";
import {
  CoverCreatedEvent,
  CoverCreationFeeSetEvent,
  CoverCreatorWhitelistUpdatedEvent,
  CoverInitializedEvent,
  CoverUpdatedEvent,
  CoverUserWhitelistUpdatedEvent,
  MinCoverCreationStakeSetEvent,
  MinStakeToAddLiquiditySetEvent,
  ProductCreatedEvent,
  ProductStateUpdatedEvent,
  ProductUpdatedEvent,
} from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleCoverCreated(event: CoverCreated): void {
  const id = createEventID(event);
  let entity = CoverCreatedEvent.load(id);

  if (!entity) {
    entity = new CoverCreatedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.info = event.params.info;
  entity.tokenName = event.params.tokenName;
  entity.tokenSymbol = event.params.tokenSymbol;
  entity.supportsProducts = event.params.supportsProducts;
  entity.requiresWhitelist = event.params.requiresWhitelist;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleCoverCreationFeeSet(event: CoverCreationFeeSet): void {
  const id = createEventID(event);
  let entity = CoverCreationFeeSetEvent.load(id);

  if (!entity) {
    entity = new CoverCreationFeeSetEvent(id);
  }

  entity.previous = event.params.previous;
  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleCoverCreatorWhitelistUpdated(
  event: CoverCreatorWhitelistUpdated
): void {
  const id = createEventID(event);
  let entity = CoverCreatorWhitelistUpdatedEvent.load(id);

  if (!entity) {
    entity = new CoverCreatorWhitelistUpdatedEvent(id);
  }

  entity.account = event.params.account.toHexString();
  entity.status = event.params.status;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleCoverInitialized(event: CoverInitialized): void {
  const id = createEventID(event);
  let entity = CoverInitializedEvent.load(id);

  if (!entity) {
    entity = new CoverInitializedEvent(id);
  }

  entity.stablecoin = event.params.stablecoin.toHexString();
  entity.withName = event.params.withName.toHexString();

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleCoverUpdated(event: CoverUpdated): void {
  const id = createEventID(event);
  let entity = CoverUpdatedEvent.load(id);

  if (!entity) {
    entity = new CoverUpdatedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.info = event.params.info;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleCoverUserWhitelistUpdated(
  event: CoverUserWhitelistUpdated
): void {
  const id = event.transaction.hash
    .toHexString()
    .concat("-")
    .concat(event.params.account.toHex());

  let entity = CoverUserWhitelistUpdatedEvent.load(id);

  if (!entity) {
    entity = new CoverUserWhitelistUpdatedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.account = event.params.account.toHexString();
  entity.status = event.params.status;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleMinCoverCreationStakeSet(
  event: MinCoverCreationStakeSet
): void {
  const id = createEventID(event);
  let entity = MinCoverCreationStakeSetEvent.load(id);

  if (!entity) {
    entity = new MinCoverCreationStakeSetEvent(id);
  }

  entity.previous = event.params.previous;
  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleMinStakeToAddLiquiditySet(
  event: MinStakeToAddLiquiditySet
): void {
  const id = createEventID(event);
  let entity = MinStakeToAddLiquiditySetEvent.load(id);

  if (!entity) {
    entity = new MinStakeToAddLiquiditySetEvent(id);
  }

  entity.previous = event.params.previous;
  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleProductCreated(event: ProductCreated): void {
  const id = event.params.coverKey
    .toHexString()
    .concat("-")
    .concat(event.params.productKey.toHexString());

  let entity = ProductCreatedEvent.load(id);

  if (!entity) {
    entity = new ProductCreatedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.info = event.params.info;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleProductStateUpdated(event: ProductStateUpdated): void {
  const id = createEventID(event);
  let entity = ProductStateUpdatedEvent.load(id);

  if (!entity) {
    entity = new ProductStateUpdatedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.updatedBy = event.params.updatedBy.toHexString();
  entity.status = event.params.status;
  entity.reason = event.params.reason;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleProductUpdated(event: ProductUpdated): void {
  const id = createEventID(event);
  let entity = ProductUpdatedEvent.load(id);

  if (!entity) {
    entity = new ProductUpdatedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.info = event.params.info;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}
