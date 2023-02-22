import { loadTransaction } from "../initializers/Transaction";

import {
  Attested,
  Disputed,
  FirstReportingStakeSet,
  Refuted,
  Reported,
  ReporterCommissionSet,
  ReportingBurnRateSet,
} from "../../generated/IGovernance/IGovernance";
import {
  AttestedEvent,
  DisputedEvent,
  FirstReportingStakeSetEvent,
  RefutedEvent,
  ReportedEvent,
  ReporterCommissionSetEvent,
  ReportingBurnRateSetEvent,
} from "../../generated/schema";

export function handleAttested(event: Attested): void {
  let entity = AttestedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new AttestedEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;

  entity.productKey = event.params.productKey;

  entity.witness = event.params.witness;

  entity.incidentDate = event.params.incidentDate;

  entity.stake = event.params.stake;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleDisputed(event: Disputed): void {
  let entity = DisputedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new DisputedEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;

  entity.productKey = event.params.productKey;

  entity.reporter = event.params.reporter;

  entity.incidentDate = event.params.incidentDate;

  entity.info = event.params.info;

  entity.initialStake = event.params.initialStake;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleFirstReportingStakeSet(
  event: FirstReportingStakeSet
): void {
  let entity = FirstReportingStakeSetEvent.load(
    event.transaction.hash.toString()
  );

  if (!entity) {
    entity = new FirstReportingStakeSetEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;

  entity.previous = event.params.previous;

  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleRefuted(event: Refuted): void {
  let entity = RefutedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new RefutedEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;

  entity.productKey = event.params.productKey;

  entity.witness = event.params.witness;

  entity.incidentDate = event.params.incidentDate;

  entity.stake = event.params.stake;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleReported(event: Reported): void {
  let entity = ReportedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new ReportedEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;

  entity.productKey = event.params.productKey;

  entity.reporter = event.params.reporter;

  entity.incidentDate = event.params.incidentDate;

  entity.info = event.params.info;

  entity.initialStake = event.params.initialStake;

  entity.resolutionTimestamp = event.params.resolutionTimestamp;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleReporterCommissionSet(
  event: ReporterCommissionSet
): void {
  let entity = ReporterCommissionSetEvent.load(
    event.transaction.hash.toString()
  );

  if (!entity) {
    entity = new ReporterCommissionSetEvent(event.transaction.hash.toString());
  }

  entity.previous = event.params.previous;

  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleReportingBurnRateSet(event: ReportingBurnRateSet): void {
  let entity = ReportingBurnRateSetEvent.load(
    event.transaction.hash.toString()
  );

  if (!entity) {
    entity = new ReportingBurnRateSetEvent(event.transaction.hash.toString());
  }

  entity.previous = event.params.previous;

  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
