import { loadTransaction } from "../initializers/Transaction";

import {
  Attested,
  Disputed,
  FirstReportingStakeSet,
  Refuted,
  Reported,
  ReporterCommissionSet,
  ReportingBurnRateSet,
} from "../../generated/templates/IGovernance/IGovernance";
import {
  AttestedEvent,
  DisputedEvent,
  FirstReportingStakeSetEvent,
  RefutedEvent,
  ReportedEvent,
  ReporterCommissionSetEvent,
  ReportingBurnRateSetEvent,
} from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleAttested(event: Attested): void {
  const id = createEventID(event);
  let entity = AttestedEvent.load(id);

  if (!entity) {
    entity = new AttestedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.witness = event.params.witness.toHexString();
  entity.incidentDate = event.params.incidentDate;
  entity.stake = event.params.stake;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleDisputed(event: Disputed): void {
  const id = createEventID(event);
  let entity = DisputedEvent.load(id);

  if (!entity) {
    entity = new DisputedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.reporter = event.params.reporter.toHexString();
  entity.incidentDate = event.params.incidentDate;
  entity.info = event.params.info;
  entity.initialStake = event.params.initialStake;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleFirstReportingStakeSet(
  event: FirstReportingStakeSet
): void {
  const id = createEventID(event);
  let entity = FirstReportingStakeSetEvent.load(id);

  if (!entity) {
    entity = new FirstReportingStakeSetEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.previous = event.params.previous;
  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleRefuted(event: Refuted): void {
  const id = createEventID(event);
  let entity = RefutedEvent.load(id);

  if (!entity) {
    entity = new RefutedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.witness = event.params.witness.toHexString();
  entity.incidentDate = event.params.incidentDate;
  entity.stake = event.params.stake;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleReported(event: Reported): void {
  const id = createEventID(event);
  let entity = ReportedEvent.load(id);

  if (!entity) {
    entity = new ReportedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.reporter = event.params.reporter.toHexString();
  entity.incidentDate = event.params.incidentDate;
  entity.info = event.params.info;
  entity.initialStake = event.params.initialStake;
  entity.resolutionTimestamp = event.params.resolutionTimestamp;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleReporterCommissionSet(
  event: ReporterCommissionSet
): void {
  const id = createEventID(event);
  let entity = ReporterCommissionSetEvent.load(id);

  if (!entity) {
    entity = new ReporterCommissionSetEvent(id);
  }

  entity.previous = event.params.previous;
  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleReportingBurnRateSet(event: ReportingBurnRateSet): void {
  const id = createEventID(event);
  let entity = ReportingBurnRateSetEvent.load(id);

  if (!entity) {
    entity = new ReportingBurnRateSetEvent(id);
  }

  entity.previous = event.params.previous;
  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}
