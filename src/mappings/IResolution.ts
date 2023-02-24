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

export function handleCooldownPeriodConfigured(
  event: CooldownPeriodConfigured
): void {
  let entity = CooldownPeriodConfiguredEvent.load(
    event.transaction.hash.toHexString()
  );

  if (!entity) {
    entity = new CooldownPeriodConfiguredEvent(
      event.transaction.hash.toHexString()
    );
  }

  entity.coverKey = event.params.coverKey;
  entity.period = event.params.period;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleFinalized(event: Finalized): void {
  let entity = FinalizedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new FinalizedEvent(event.transaction.hash.toHexString());
  }

  entity.coverKey = event.params.coverKey;
  entity.productKey = event.params.productKey;
  entity.finalizer = event.params.finalizer;
  entity.incidentDate = event.params.incidentDate;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleGovernanceBurned(event: GovernanceBurned): void {
  let entity = GovernanceBurnedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new GovernanceBurnedEvent(event.transaction.hash.toHexString());
  }

  entity.coverKey = event.params.coverKey;
  entity.productKey = event.params.productKey;
  entity.caller = event.params.caller;
  entity.burner = event.params.burner;
  entity.originalReward = event.params.originalReward;
  entity.burnedAmount = event.params.burnedAmount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleReportClosed(event: ReportClosed): void {
  let entity = ReportClosedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new ReportClosedEvent(event.transaction.hash.toHexString());
  }

  entity.coverKey = event.params.coverKey;
  entity.productKey = event.params.productKey;
  entity.closedBy = event.params.closedBy;
  entity.incidentDate = event.params.incidentDate;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleReporterRewardDistributed(
  event: ReporterRewardDistributed
): void {
  let entity = ReporterRewardDistributedEvent.load(
    event.transaction.hash.toHexString()
  );

  if (!entity) {
    entity = new ReporterRewardDistributedEvent(
      event.transaction.hash.toHexString()
    );
  }

  entity.coverKey = event.params.coverKey;
  entity.productKey = event.params.productKey;
  entity.caller = event.params.caller;
  entity.reporter = event.params.reporter;
  entity.originalReward = event.params.originalReward;
  entity.reporterReward = event.params.reporterReward;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleResolved(event: Resolved): void {
  let entity = ResolvedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new ResolvedEvent(event.transaction.hash.toHexString());
  }

  entity.coverKey = event.params.coverKey;
  entity.productKey = event.params.productKey;
  entity.incidentDate = event.params.incidentDate;
  entity.resolutionDeadline = event.params.resolutionDeadline;
  entity.decision = event.params.decision;
  entity.emergency = event.params.emergency;
  entity.claimBeginsFrom = event.params.claimBeginsFrom;
  entity.claimExpiresAt = event.params.claimExpiresAt;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleUnstaken(event: Unstaken): void {
  let entity = UnstakenEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new UnstakenEvent(event.transaction.hash.toHexString());
  }

  entity.coverKey = event.params.coverKey;
  entity.productKey = event.params.productKey;
  entity.caller = event.params.caller;
  entity.originalStake = event.params.originalStake;
  entity.reward = event.params.reward;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
