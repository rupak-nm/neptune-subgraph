import { loadTransaction } from "../initializers/Transaction";

import {
  ContractAdded,
  ContractUpgraded,
  Initialized,
  MemberAdded,
  MemberRemoved,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
} from "../../generated/IProtocol/IProtocol";
import {
  ContractAddedEvent,
  ContractUpgradedEvent,
  InitializedEvent,
  MemberAddedEvent,
  MemberRemovedEvent,
  RoleAdminChangedEvent,
  RoleGrantedEvent,
  RoleRevokedEvent,
} from "../../generated/schema";

export function handleContractAdded(event: ContractAdded): void {
  let entity = ContractAddedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new ContractAddedEvent(event.transaction.hash.toString());
  }

  entity.namespace = event.params.namespace;

  entity.key = event.params.key;

  entity.contractAddress = event.params.contractAddress;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleContractUpgraded(event: ContractUpgraded): void {
  let entity = ContractUpgradedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new ContractUpgradedEvent(event.transaction.hash.toString());
  }

  entity.namespace = event.params.namespace;

  entity.key = event.params.key;

  entity.previous = event.params.previous;

  entity.current = event.params.current;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleInitialized(event: Initialized): void {
  let entity = InitializedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new InitializedEvent(event.transaction.hash.toString());
  }

  entity.burner = event.params.args.burner;

  entity.uniswapV2RouterLike = event.params.args.uniswapV2RouterLike;

  entity.uniswapV2FactoryLike = event.params.args.uniswapV2FactoryLike;

  entity.npm = event.params.args.npm;

  entity.treasury = event.params.args.treasury;

  entity.priceOracle = event.params.args.priceOracle;

  entity.coverCreationFee = event.params.args.coverCreationFee;

  entity.minCoverCreationStake = event.params.args.minCoverCreationStake;

  entity.minStakeToAddLiquidity = event.params.args.minStakeToAddLiquidity;

  entity.firstReportingStake = event.params.args.firstReportingStake;

  entity.claimPeriod = event.params.args.claimPeriod;

  entity.reportingBurnRate = event.params.args.reportingBurnRate;

  entity.governanceReporterCommission =
    event.params.args.governanceReporterCommission;

  entity.claimPlatformFee = event.params.args.claimPlatformFee;

  entity.claimReporterCommission = event.params.args.claimReporterCommission;

  entity.flashLoanFee = event.params.args.flashLoanFee;

  entity.flashLoanFeeProtocol = event.params.args.flashLoanFeeProtocol;

  entity.resolutionCoolDownPeriod = event.params.args.resolutionCoolDownPeriod;

  entity.stateUpdateInterval = event.params.args.stateUpdateInterval;

  entity.maxLendingRatio = event.params.args.maxLendingRatio;

  entity.lendingPeriod = event.params.args.lendingPeriod;

  entity.withdrawalWindow = event.params.args.withdrawalWindow;

  entity.policyFloor = event.params.args.policyFloor;

  entity.policyCeiling = event.params.args.policyCeiling;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleMemberAdded(event: MemberAdded): void {
  let entity = MemberAddedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new MemberAddedEvent(event.transaction.hash.toString());
  }

  entity.member = event.params.member;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleMemberRemoved(event: MemberRemoved): void {
  let entity = MemberRemovedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new MemberRemovedEvent(event.transaction.hash.toString());
  }

  entity.member = event.params.member;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {
  let entity = RoleAdminChangedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new RoleAdminChangedEvent(event.transaction.hash.toString());
  }

  entity.role = event.params.role;

  entity.previousAdminRole = event.params.previousAdminRole;

  entity.newAdminRole = event.params.newAdminRole;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleRoleGranted(event: RoleGranted): void {
  let entity = RoleGrantedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new RoleGrantedEvent(event.transaction.hash.toString());
  }

  entity.role = event.params.role;

  entity.account = event.params.account;

  entity.sender = event.params.sender;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevoked): void {
  let entity = RoleRevokedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new RoleRevokedEvent(event.transaction.hash.toString());
  }

  entity.role = event.params.role;

  entity.account = event.params.account;

  entity.sender = event.params.sender;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
