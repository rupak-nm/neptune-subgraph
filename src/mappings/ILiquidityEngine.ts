import { loadTransaction } from "../initializers/Transaction";

import {
  LiquidityStateUpdateIntervalSet,
  MaxLendingRatioSet,
  RiskPoolingPeriodSet,
  StrategyAdded,
  StrategyDeleted,
  StrategyDisabled,
} from "../../generated/ILiquidityEngine/ILiquidityEngine";
import {
  LiquidityStateUpdateIntervalSetEvent,
  MaxLendingRatioSetEvent,
  RiskPoolingPeriodSetEvent,
  StrategyAddedEvent,
  StrategyDeletedEvent,
  StrategyDisabledEvent,
} from "../../generated/schema";

export function handleLiquidityStateUpdateIntervalSet(
  event: LiquidityStateUpdateIntervalSet
): void {
  let entity = LiquidityStateUpdateIntervalSetEvent.load(
    event.transaction.hash.toString()
  );

  if (!entity) {
    entity = new LiquidityStateUpdateIntervalSetEvent(
      event.transaction.hash.toString()
    );
  }

  entity.duration = event.params.duration;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleMaxLendingRatioSet(event: MaxLendingRatioSet): void {
  let entity = MaxLendingRatioSetEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new MaxLendingRatioSetEvent(event.transaction.hash.toString());
  }

  entity.ratio = event.params.ratio;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleRiskPoolingPeriodSet(event: RiskPoolingPeriodSet): void {
  let entity = RiskPoolingPeriodSetEvent.load(
    event.transaction.hash.toString()
  );

  if (!entity) {
    entity = new RiskPoolingPeriodSetEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;

  entity.lendingPeriod = event.params.lendingPeriod;

  entity.withdrawalWindow = event.params.withdrawalWindow;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleStrategyAdded(event: StrategyAdded): void {
  let entity = StrategyAddedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new StrategyAddedEvent(event.transaction.hash.toString());
  }

  entity.strategy = event.params.strategy;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleStrategyDeleted(event: StrategyDeleted): void {
  let entity = StrategyDeletedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new StrategyDeletedEvent(event.transaction.hash.toString());
  }

  entity.strategy = event.params.strategy;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleStrategyDisabled(event: StrategyDisabled): void {
  let entity = StrategyDisabledEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new StrategyDisabledEvent(event.transaction.hash.toString());
  }

  entity.strategy = event.params.strategy;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
