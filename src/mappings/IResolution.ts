import { loadTransaction } from "../initializers/Transaction";

import {
  CooldownPeriodConfigured,
  Finalized,
  GovernanceBurned,
  ReportClosed,
  ReporterRewardDistributed,
  Resolved,
  Unstaken,
} from "../../generated/templates/IResolution/IResolution";
import {
  CooldownPeriodConfiguredEvent,
  FinalizedEvent,
  GovernanceBurnedEvent,
  ReportClosedEvent,
  ReporterRewardDistributedEvent,
  ResolvedEvent,
  UnstakenEvent,
} from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleCooldownPeriodConfigured(
  event: CooldownPeriodConfigured
): void {
  const id = createEventID(event);
  let entity = CooldownPeriodConfiguredEvent.load(id);

  if (!entity) {
    entity = new CooldownPeriodConfiguredEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.period = event.params.period;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleFinalized(event: Finalized): void {
  const id = createEventID(event);
  let entity = FinalizedEvent.load(id);

  if (!entity) {
    entity = new FinalizedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.finalizer = event.params.finalizer.toHexString();
  entity.incidentDate = event.params.incidentDate;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleGovernanceBurned(event: GovernanceBurned): void {
  const id = createEventID(event);
  let entity = GovernanceBurnedEvent.load(id);

  if (!entity) {
    entity = new GovernanceBurnedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.caller = event.params.caller.toHexString();
  entity.burner = event.params.burner.toHexString();
  entity.originalReward = event.params.originalReward;
  entity.burnedAmount = event.params.burnedAmount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleReportClosed(event: ReportClosed): void {
  const id = createEventID(event);
  let entity = ReportClosedEvent.load(id);

  if (!entity) {
    entity = new ReportClosedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.closedBy = event.params.closedBy.toHexString();
  entity.incidentDate = event.params.incidentDate;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleReporterRewardDistributed(
  event: ReporterRewardDistributed
): void {
  const id = createEventID(event);
  let entity = ReporterRewardDistributedEvent.load(id);

  if (!entity) {
    entity = new ReporterRewardDistributedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.caller = event.params.caller.toHexString();
  entity.reporter = event.params.reporter.toHexString();
  entity.originalReward = event.params.originalReward;
  entity.reporterReward = event.params.reporterReward;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleResolved(event: Resolved): void {
  const id = createEventID(event);
  let entity = ResolvedEvent.load(id);

  if (!entity) {
    entity = new ResolvedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.incidentDate = event.params.incidentDate;
  entity.resolutionDeadline = event.params.resolutionDeadline;
  entity.decision = event.params.decision;
  entity.emergency = event.params.emergency;
  entity.claimBeginsFrom = event.params.claimBeginsFrom;
  entity.claimExpiresAt = event.params.claimExpiresAt;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleUnstaken(event: Unstaken): void {
  const id = createEventID(event);
  let entity = UnstakenEvent.load(id);

  if (!entity) {
    entity = new UnstakenEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.caller = event.params.caller.toHexString();
  entity.originalStake = event.params.originalStake;
  entity.reward = event.params.reward;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}
