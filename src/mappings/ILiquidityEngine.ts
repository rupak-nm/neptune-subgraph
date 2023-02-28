import { loadTransaction } from "../initializers/Transaction";

import {
  LiquidityStateUpdateIntervalSet,
  MaxLendingRatioSet,
  RiskPoolingPeriodSet,
  StrategyAdded,
  StrategyDeleted,
  StrategyDisabled,
} from "../../generated/templates/ILiquidityEngine/ILiquidityEngine";
import {
  LiquidityStateUpdateIntervalSetEvent,
  MaxLendingRatioSetEvent,
  RiskPoolingPeriodSetEvent,
  StrategyAddedEvent,
  StrategyDeletedEvent,
  StrategyDisabledEvent,
} from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleLiquidityStateUpdateIntervalSet(
  event: LiquidityStateUpdateIntervalSet
): void {
  const id = createEventID(event);
  let entity = LiquidityStateUpdateIntervalSetEvent.load(id);

  if (!entity) {
    entity = new LiquidityStateUpdateIntervalSetEvent(id);
  }

  entity.duration = event.params.duration;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleMaxLendingRatioSet(event: MaxLendingRatioSet): void {
  const id = createEventID(event);
  let entity = MaxLendingRatioSetEvent.load(id);

  if (!entity) {
    entity = new MaxLendingRatioSetEvent(id);
  }

  entity.ratio = event.params.ratio;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleRiskPoolingPeriodSet(event: RiskPoolingPeriodSet): void {
  const id = createEventID(event);
  let entity = RiskPoolingPeriodSetEvent.load(id);

  if (!entity) {
    entity = new RiskPoolingPeriodSetEvent(id);
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
  const id = createEventID(event);
  let entity = StrategyAddedEvent.load(id);

  if (!entity) {
    entity = new StrategyAddedEvent(id);
  }

  entity.strategy = event.params.strategy;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleStrategyDeleted(event: StrategyDeleted): void {
  const id = createEventID(event);
  let entity = StrategyDeletedEvent.load(id);

  if (!entity) {
    entity = new StrategyDeletedEvent(id);
  }

  entity.strategy = event.params.strategy;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleStrategyDisabled(event: StrategyDisabled): void {
  const id = createEventID(event);
  let entity = StrategyDisabledEvent.load(id);

  if (!entity) {
    entity = new StrategyDisabledEvent(id);
  }

  entity.strategy = event.params.strategy;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
