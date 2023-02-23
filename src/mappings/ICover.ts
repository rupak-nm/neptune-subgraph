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

export function handleCoverCreated(event: CoverCreated): void {
  let entity = CoverCreatedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new CoverCreatedEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;
  entity.info = event.params.info;
  entity.tokenName = event.params.tokenName;
  entity.tokenSymbol = event.params.tokenSymbol;
  entity.supportsProducts = event.params.supportsProducts;
  entity.requiresWhitelist = event.params.requiresWhitelist;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleCoverCreationFeeSet(event: CoverCreationFeeSet): void {
  let entity = CoverCreationFeeSetEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new CoverCreationFeeSetEvent(event.transaction.hash.toString());
  }

  entity.previous = event.params.previous;
  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleCoverCreatorWhitelistUpdated(
  event: CoverCreatorWhitelistUpdated
): void {
  let entity = CoverCreatorWhitelistUpdatedEvent.load(
    event.transaction.hash.toString()
  );

  if (!entity) {
    entity = new CoverCreatorWhitelistUpdatedEvent(
      event.transaction.hash.toString()
    );
  }

  entity.account = event.params.account;
  entity.status = event.params.status;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleCoverInitialized(event: CoverInitialized): void {
  let entity = CoverInitializedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new CoverInitializedEvent(event.transaction.hash.toString());
  }

  entity.stablecoin = event.params.stablecoin;
  entity.withName = event.params.withName;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleCoverUpdated(event: CoverUpdated): void {
  let entity = CoverUpdatedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new CoverUpdatedEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;
  entity.info = event.params.info;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleCoverUserWhitelistUpdated(
  event: CoverUserWhitelistUpdated
): void {
  let entity = CoverUserWhitelistUpdatedEvent.load(
    event.transaction.hash.toString()
  );

  if (!entity) {
    entity = new CoverUserWhitelistUpdatedEvent(
      event.transaction.hash.toString()
    );
  }

  entity.coverKey = event.params.coverKey;
  entity.productKey = event.params.productKey;
  entity.account = event.params.account;
  entity.status = event.params.status;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleMinCoverCreationStakeSet(
  event: MinCoverCreationStakeSet
): void {
  let entity = MinCoverCreationStakeSetEvent.load(
    event.transaction.hash.toString()
  );

  if (!entity) {
    entity = new MinCoverCreationStakeSetEvent(
      event.transaction.hash.toString()
    );
  }

  entity.previous = event.params.previous;
  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleMinStakeToAddLiquiditySet(
  event: MinStakeToAddLiquiditySet
): void {
  let entity = MinStakeToAddLiquiditySetEvent.load(
    event.transaction.hash.toString()
  );

  if (!entity) {
    entity = new MinStakeToAddLiquiditySetEvent(
      event.transaction.hash.toString()
    );
  }

  entity.previous = event.params.previous;
  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleProductCreated(event: ProductCreated): void {
  let entity = ProductCreatedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new ProductCreatedEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;
  entity.productKey = event.params.productKey;
  entity.info = event.params.info;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleProductStateUpdated(event: ProductStateUpdated): void {
  let entity = ProductStateUpdatedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new ProductStateUpdatedEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;
  entity.productKey = event.params.productKey;
  entity.updatedBy = event.params.updatedBy;
  entity.status = event.params.status;
  entity.reason = event.params.reason;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleProductUpdated(event: ProductUpdated): void {
  let entity = ProductUpdatedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new ProductUpdatedEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;
  entity.productKey = event.params.productKey;
  entity.info = event.params.info;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
