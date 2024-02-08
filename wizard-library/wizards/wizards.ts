import { Wizard } from '../foundation.js';
import { createBayWizard, editBayWizard } from './bay.js';
import { createBDaWizard, editBDaWizard } from './bda.js';
import {
  createConductingEquipmentWizard,
  editConductingEquipmentWizard,
} from './conductingequipment.js';
import {
  createConnectedApWizard,
  editConnectedApWizard,
} from './connectedap.js';
import { createDaWizard, editDAWizard } from './da.js';
import { createDATypeWizard } from './datype.js';
import { createDoWizard, editDoWizard } from './do.js';
import { createDOTypeWizard } from './dotype.js';
import { createEnumTypeWizard } from './enumtype.js';
import { createEnumValWizard, editEnumValWizard } from './enumval.js';
import { createEqFunctionWizard, editEqFunctionWizard } from './eqfunction.js';
import {
  createEqSubFunctionWizard,
  editEqSubFunctionWizard,
} from './eqsubfunction.js';
import { createFunctionWizard, editFunctionWizard } from './function.js';
import {
  createGeneralEquipmentWizard,
  editGeneralEquipmentWizard,
} from './generalEquipment.js';
import { editGseWizard } from './gse.js';
import { iEDEditWizard } from './ied.js';
import { lDeviceEditWizard } from './ldevice.js';
import { createLineWizard, editLineWizard } from './line.js';
import { createLNodeWizard, editLNodeWizard } from './lnode.js';
import { createLNodeTypeWizard } from './lnodetype.js';
import {
  createPowerTransformerWizard,
  editPowerTransformerWizard,
} from './powertransformer.js';
import { createPrivateWizard, editPrivateWizard } from './private.js';
import { createProcessWizard, editProcessWizard } from './process.js';
import { createSDoWizard, editSDoWizard } from './sdo.js';
import { editSMvWizard } from './smv.js';
import {
  createSubEquipmentWizard,
  editSubEquipmentWizard,
} from './subequipment.js';
import {
  createSubFunctionWizard,
  editSubFunctionWizard,
} from './subfunction.js';
import { createSubNetworkWizard, editSubNetworkWizard } from './subnetwork.js';
import { createSubstationWizard, editSubstationWizard } from './substation.js';
import { createTapChangerWizard, editTapChangerWizard } from './tapchanger.js';
import { createTextWizard, editTextWizard } from './text.js';
import {
  createTransformerWindingWizard,
  editTransformerWindingWizard,
} from './transformerWinding.js';
import {
  voltageLevelCreateWizard,
  voltageLevelEditWizard,
} from './voltagelevel.js';

import {
  createProcessResourcesWizard,
  editProcessResourcesWizard,
} from './iec61850-6-100/processresources.js';

import {
  createProcessResourceWizard,
  editProcessResourceWizard,
} from './iec61850-6-100/processresource.js';

import {
  createResourceWizard,
  editResourceWizard,
} from './iec61850-6-100/resource.js';
import {
  createAllocationRoleWizard,
  editAllocationRoleWizard,
} from './iec61850-6-100/allocationrole.js';
import {
  createAnalogueWiringParametersWizard,
  editAnalogueWiringParametersWizard,
} from './iec61850-6-100/analoguewiringparameters.js';
import {
  createApplicationWizard,
  editApplicationWizard,
} from './iec61850-6-100/application.js';
import {
  createBehaviorDescriptionWizard,
  editBehaviorDescriptionWizard,
} from './iec61850-6-100/behaviordescription.js';
import {
  createBehaviorDescriptionRefWizard,
  editBehaviorDescriptionRefWizard,
} from './iec61850-6-100/behaviordescriptionref.js';
import {
  createProcessResourceRefWizard,
  editProcessResourceRefWizard,
} from './iec61850-6-100/processresourceref.js';
import {
  createFunctionRefWizard,
  editFunctionRefWizard,
} from './iec61850-6-100/functionref.js';
import {
  createBehaviorReferenceWizard,
  editBehaviorReferenceWizard,
} from './iec61850-6-100/behaviorreference.js';
import {
  createBinaryWiringParametersWizard,
  editBinaryWiringParametersWizard,
} from './iec61850-6-100/binarywiringparameters.js';
import {
  createServiceSpecificationsWizard,
  editServiceSpecificationsWizard,
} from './iec61850-6-100/servicespecifications.js';
import {
  createCommunicationServiceSpecificationsWizard,
  editCommunicationServiceSpecificationsWizard,
} from './iec61850-6-100/communicationservicespecifications.js';
import {
  createFunctionCatRefWizard,
  editFunctionCatRefWizard,
} from './iec61850-6-100/functioncatref.js';
import {
  createFunctionCategoryWizard,
  editFunctionCategoryWizard,
} from './iec61850-6-100/functioncategory.js';
import {
  createFunctionRoleContentWizard,
  editFunctionRoleContentWizard,
} from './iec61850-6-100/functionrolecontent.js';
import {
  createFunctionRoleWizard,
  editFunctionRoleWizard,
} from './iec61850-6-100/functionrole.js';
import {
  createGooseParametersWizard,
  editGooseParametersWizard,
} from './iec61850-6-100/gooseparameters.js';
import {
  createSMVParametersWizard,
  editSMVParametersWizard,
} from './iec61850-6-100/smvparameters.js';
import {
  createReportParametersWizard,
  editReportParametersWizard,
} from './iec61850-6-100/reportparameters.js';
import {
  createInputVarWizard,
  editInputVarWizard,
} from './iec61850-6-100/inputvar.js';
import {
  createOutputVarWizard,
  editOutputVarWizard,
} from './iec61850-6-100/outputvar.js';
import {
  createPowerSystemRelationsWizard,
  editPowerSystemRelationsWizard,
} from './iec61850-6-100/powersystemrelations.js';
import {
  createPowerSystemRelationWizard,
  editPowerSystemRelationWizard,
} from './iec61850-6-100/powersystemrelation.js';
import {
  createVariableWizard,
  editVariableWizard,
} from './iec61850-6-100/variable.js';
import {
  createVariableApplyToWizard,
  editVariableApplyToWizard,
} from './iec61850-6-100/variableapplyto.js';
import {
  createLNodeInputsWizard,
  editLNodeInputsWizard,
} from './iec61850-6-100/lnodeinputs.js';
import {
  createLNodeOutputsWizard,
  editLNodeOutputsWizard,
} from './iec61850-6-100/lnodeoutputs.js';
import {
  createLNodeSpecNamingWizard,
  editLNodeSpecNamingWizard,
} from './iec61850-6-100/lnodespecnaming.js';
import {
  createSourceRefWizard,
  editSourceRefWizard,
} from './iec61850-6-100/sourceref.js';
import {
  createBayTypeWizard,
  editBayTypeWizard,
} from './iec61850-6-100/baytype.js';
import { createDOSWizard, editDOSWizard } from './iec61850-6-100/dos.js';
import {
  createFunctionTemplateWizard,
  editFunctionTemplateWizard,
} from './iec61850-6-100/functiontemplate.js';
import {
  createProcessEchoWizard,
  editProcessEchoWizard,
} from './iec61850-6-100/processecho.js';
import {
  createProjectWizard,
  editProjectWizard,
} from './iec61850-6-100/project.js';
import {
  createSubCategoryWizard,
  editSubCategoryWizard,
} from './iec61850-6-100/subcategory.js';
import {
  createProjectProcessReferenceWizard,
  editProjectProcessReferenceWizard,
} from './iec61850-6-100/projectprocessreference.js';
import {
  createSignalRoleWizard,
  editSignalRoleWizard,
} from './iec61850-6-100/signalrole.js';
import {
  createFunctionalVariantRefWizard,
  editFunctionalVariantRefWizard,
} from './iec61850-6-100/functionalvariantref.js';
import {
  createLNodeDataRefWizard,
  editLNodeDataRefWizard,
} from './iec61850-6-100/lnodedataref.js';
import {
  createLNodeInputRefWizard,
  editLNodeInputRefWizard,
} from './iec61850-6-100/lnodeinputref.js';
import {
  createLNodeOutputRefWizard,
  editLNodeOutputRefWizard,
} from './iec61850-6-100/lnodeoutputref.js';
import {
  createFunctionalVariantWizard,
  editFunctionalVariantWizard,
} from './iec61850-6-100/functionalvariant.js';
import {
  createFunctionalVariantGroupWizard,
  editFunctionalVariantGroupWizard,
} from './iec61850-6-100/functionalvariantgroup.js';
import {
  createAllocationRoleRefWizard,
  editAllocationRoleRefWizard,
} from './iec61850-6-100/allocationsroleref.js';
import {
  createVariableRefWizard,
  editVariableRefWizard,
} from './iec61850-6-100/variableref.js';
import {
  createFunctionCategoryRefWizard,
  editFunctionCategoryRefWizard,
} from './iec61850-6-100/functioncategoryref.js';
import {
  createPowerSystemRelationRefWizard,
  editPowerSystemRelationRefWizard,
} from './iec61850-6-100/powersystemrelationref.js';
import {
  createL2CommParametersWizard,
  editL2CommParametersWizard,
} from './iec61850-6-100/l2commparameters.js';
import {
  createL3IPv4CommParametersWizard,
  editL3IPv4CommParametersWizard,
} from './iec61850-6-100/l3ipv4commparameters.js';
import {
  createL3IPv6CommParametersWizard,
  editL3IPv6CommParametersWizard,
} from './iec61850-6-100/l3ipv6commparameters.js';
import {
  createFunctionalSubVariantWizard,
  editFunctionalSubVariantWizard,
} from './iec61850-6-100/functionalsubvariant.js';
import { createSDSWizard, editSDSWizard } from './iec61850-6-100/sds.js';
import { createDASWizard, editDASWizard } from './iec61850-6-100/das.js';
import {
  createSubscriberLNodeWizard,
  editSubscriberLNodeWizard,
} from './iec61850-6-100/subscriber-lnode.js';
import {
  createControllingLNodeWizard,
  editControllingLNodeWizard,
} from './iec61850-6-100/controlling-lnode.js';
import {
  createLogParametersRefWizard,
  editLogParametersRefWizard,
} from './iec61850-6-100/logparametersref.js';
import {
  createAnalogueWiringParametersRefWizard,
  editAnalogueWiringParametersRefWizard,
} from './iec61850-6-100/analoguewiringparametersref.js';
import {
  createBinaryWiringParametersRefWizard,
  editBinaryWiringParametersRefWizard,
} from './iec61850-6-100/binarywiringparametersref.js';
import {
  editGooseParametersRefWizard,
  createGooseParametersRefWizard,
} from './iec61850-6-100/gooseparametersref.js';
import {
  editSMVParametersRefWizard,
  createSMVParametersRefWizard,
} from './iec61850-6-100/smvparametersref.js';
import {
  editReportParametersRefWizard,
  createReportParametersRefWizard,
} from './iec61850-6-100/reportparametersref.js';
import {
  createSubFunctionTemplateWizard,
  editSubFunctionTemplateWizard,
} from './iec61850-6-100/subfunctiontemplate.js';
import {
  createInputVarRefWizard,
  editInputVarRefWizard,
} from './iec61850-6-100/inputvarref.js';
import {
  editOutputVarRefWizard,
  createOutputVarRefWizard,
} from './iec61850-6-100/outputvarref.js';
import {
  createControlRefWizard,
  editControlRefWizard,
} from './iec61850-6-100/controlref.js';
import {
  createCheckoutIDWizard,
  editCheckoutIDWizard,
} from './iec61850-6-100/checkoutid.js';

type SclElementWizard = (
  element: Element,
  subWizard?: boolean,
  instanceElement?: Element,
) => Wizard | undefined;

export function emptyWizard(): Wizard | undefined {
  return undefined;
}

export const wizards: Record<
  string,
  {
    edit: SclElementWizard;
    create: SclElementWizard;
  }
> = {
  AccessControl: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  AccessPoint: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Address: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Association: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Authentication: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Bay: {
    edit: editBayWizard,
    create: createBayWizard,
  },
  BDA: {
    edit: editBDaWizard,
    create: createBDaWizard,
  },
  BitRate: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ClientLN: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ClientServices: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  CommProt: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Communication: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ConductingEquipment: {
    edit: editConductingEquipmentWizard,
    create: createConductingEquipmentWizard,
  },
  ConfDataSet: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ConfLdName: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ConfLNs: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ConfLogControl: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ConfReportControl: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ConfSG: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ConfSigRef: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ConnectedAP: {
    edit: editConnectedApWizard,
    create: createConnectedApWizard,
  },
  DA: {
    edit: editDAWizard,
    create: createDaWizard,
  },
  DAType: {
    edit: emptyWizard,
    create: createDATypeWizard,
  },
  DO: {
    edit: editDoWizard,
    create: createDoWizard,
  },
  DOI: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  DOType: {
    edit: emptyWizard,
    create: createDOTypeWizard,
  },
  DataObjectDirectory: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  DataSet: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  DataSetDirectory: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  DataTypeTemplates: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  DynAssociation: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  DynDataSet: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  EnumType: {
    edit: emptyWizard,
    create: createEnumTypeWizard,
  },
  EnumVal: {
    edit: editEnumValWizard,
    create: createEnumValWizard,
  },
  EqFunction: {
    edit: editEqFunctionWizard,
    create: createEqFunctionWizard,
  },
  EqSubFunction: {
    edit: editEqSubFunctionWizard,
    create: createEqSubFunctionWizard,
  },
  ExtRef: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  FileHandling: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Function: {
    edit: editFunctionWizard,
    create: createFunctionWizard,
  },
  GeneralEquipment: {
    edit: editGeneralEquipmentWizard,
    create: createGeneralEquipmentWizard,
  },
  GetCBValues: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  GetDataObjectDefinition: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  GetDataSetValue: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  GetDirectory: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  GOOSE: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  GOOSESecurity: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  GSE: {
    edit: editGseWizard,
    create: emptyWizard,
  },
  GSEDir: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  GSESettings: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  GSSE: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Header: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  History: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Hitem: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  IED: {
    edit: iEDEditWizard,
    create: emptyWizard,
  },
  IEDName: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Inputs: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  IssuerName: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  KDC: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  LDevice: {
    edit: lDeviceEditWizard,
    create: emptyWizard,
  },
  LN: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  LN0: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  LNode: {
    edit: editLNodeWizard,
    create: createLNodeWizard,
  },
  LNodeType: {
    edit: emptyWizard,
    create: createLNodeTypeWizard,
  },
  Line: {
    edit: editLineWizard,
    create: createLineWizard,
  },
  Log: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  LogControl: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  LogSettings: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  MaxTime: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  McSecurity: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  MinTime: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  NeutralPoint: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  P: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  PhysConn: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  PowerTransformer: {
    edit: editPowerTransformerWizard,
    create: createPowerTransformerWizard,
  },
  Private: {
    edit: editPrivateWizard,
    create: createPrivateWizard,
  },
  Process: {
    edit: editProcessWizard,
    create: createProcessWizard,
  },
  ProtNs: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Protocol: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ReadWrite: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  RedProt: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ReportControl: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ReportSettings: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  RptEnabled: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SamplesPerSec: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SecPerSamples: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SCL: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SDI: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SDO: {
    edit: editSDoWizard,
    create: createSDoWizard,
  },
  Server: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ServerAt: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Services: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SetDataSetValue: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SettingControl: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SettingGroups: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SGEdit: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SmpRate: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SMV: {
    edit: editSMvWizard,
    create: emptyWizard,
  },
  SmvOpts: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SMVsc: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SMVSecurity: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SMVSettings: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  SubEquipment: {
    edit: editSubEquipmentWizard,
    create: createSubEquipmentWizard,
  },
  SubFunction: {
    edit: editSubFunctionWizard,
    create: createSubFunctionWizard,
  },
  SubNetwork: {
    edit: editSubNetworkWizard,
    create: createSubNetworkWizard,
  },
  Subject: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Substation: {
    edit: editSubstationWizard,
    create: createSubstationWizard,
  },
  SupSubscription: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  TapChanger: {
    edit: editTapChangerWizard,
    create: createTapChangerWizard,
  },
  Text: {
    edit: editTextWizard,
    create: createTextWizard,
  },
  TimerActivatedControl: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  TimeSyncProt: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  TransformerWinding: {
    edit: editTransformerWindingWizard,
    create: createTransformerWindingWizard,
  },
  Val: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  ValueHandling: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  Voltage: {
    edit: emptyWizard,
    create: emptyWizard,
  },
  VoltageLevel: {
    edit: voltageLevelEditWizard,
    create: voltageLevelCreateWizard,
  },
  ProcessResources: {
    edit: editProcessResourcesWizard,
    create: createProcessResourcesWizard,
  },
  ProcessResource: {
    edit: editProcessResourceWizard,
    create: createProcessResourceWizard,
  },
  Resource: {
    edit: editResourceWizard,
    create: createResourceWizard,
  },
  AllocationRole: {
    edit: editAllocationRoleWizard,
    create: createAllocationRoleWizard,
  },
  AnalogueWiringParameters: {
    edit: editAnalogueWiringParametersWizard,
    create: createAnalogueWiringParametersWizard,
  },
  Application: {
    edit: editApplicationWizard,
    create: createApplicationWizard,
  },
  BehaviorDescription: {
    edit: editBehaviorDescriptionWizard,
    create: createBehaviorDescriptionWizard,
  },
  BehaviorDescriptionRef: {
    edit: editBehaviorDescriptionRefWizard,
    create: createBehaviorDescriptionRefWizard,
  },
  BehaviorReference: {
    edit: editBehaviorReferenceWizard,
    create: createBehaviorReferenceWizard,
  },
  BinaryWiringParameters: {
    edit: editBinaryWiringParametersWizard,
    create: createBinaryWiringParametersWizard,
  },
  CommunicationServiceSpecifications: {
    edit: editCommunicationServiceSpecificationsWizard,
    create: createCommunicationServiceSpecificationsWizard,
  },
  ServiceSpecifications: {
    edit: editServiceSpecificationsWizard,
    create: createServiceSpecificationsWizard,
  },
  FunctionCatRef: {
    edit: editFunctionCatRefWizard,
    create: createFunctionCatRefWizard,
  },
  FunctionCategory: {
    edit: editFunctionCategoryWizard,
    create: createFunctionCategoryWizard,
  },
  FunctionRef: {
    edit: editFunctionRefWizard,
    create: createFunctionRefWizard,
  },
  FunctionRoleContent: {
    edit: editFunctionRoleContentWizard,
    create: createFunctionRoleContentWizard,
  },
  FunctionRole: {
    edit: editFunctionRoleWizard,
    create: createFunctionRoleWizard,
  },
  GooseParameters: {
    edit: editGooseParametersWizard,
    create: createGooseParametersWizard,
  },
  SMVParameters: {
    edit: editSMVParametersWizard,
    create: createSMVParametersWizard,
  },
  ReportParameters: {
    edit: editReportParametersWizard,
    create: createReportParametersWizard,
  },
  InputVar: {
    edit: editInputVarWizard,
    create: createInputVarWizard,
  },
  OutputVar: {
    edit: editOutputVarWizard,
    create: createOutputVarWizard,
  },
  PowerSystemRelations: {
    edit: editPowerSystemRelationsWizard,
    create: createPowerSystemRelationsWizard,
  },
  PowerSystemRelation: {
    edit: editPowerSystemRelationWizard,
    create: createPowerSystemRelationWizard,
  },
  ProcessResourceRef: {
    edit: editProcessResourceRefWizard,
    create: createProcessResourceRefWizard,
  },
  Variable: {
    edit: editVariableWizard,
    create: createVariableWizard,
  },
  VariableApplyTo: {
    edit: editVariableApplyToWizard,
    create: createVariableApplyToWizard,
  },
  LNodeInputs: {
    edit: editLNodeInputsWizard,
    create: createLNodeInputsWizard,
  },
  LNodeOutputs: {
    edit: editLNodeOutputsWizard,
    create: createLNodeOutputsWizard,
  },
  LNodeSpecNaming: {
    edit: editLNodeSpecNamingWizard,
    create: createLNodeSpecNamingWizard,
  },
  SourceRef: {
    edit: editSourceRefWizard,
    create: createSourceRefWizard,
  },
  BayType: {
    edit: editBayTypeWizard,
    create: createBayTypeWizard,
  },
  DOS: {
    edit: editDOSWizard,
    create: createDOSWizard,
  },
  SDS: {
    edit: editSDSWizard,
    create: createSDSWizard,
  },
  DAS: {
    edit: editDASWizard,
    create: createDASWizard,
  },
  FunctionTemplate: {
    edit: editFunctionTemplateWizard,
    create: createFunctionTemplateWizard,
  },
  ProcessEcho: {
    edit: editProcessEchoWizard,
    create: createProcessEchoWizard,
  },
  Project: {
    edit: editProjectWizard,
    create: createProjectWizard,
  },
  SubCategory: {
    edit: editSubCategoryWizard,
    create: createSubCategoryWizard,
  },
  ProjectProcessReference: {
    edit: editProjectProcessReferenceWizard,
    create: createProjectProcessReferenceWizard,
  },
  SignalRole: {
    edit: editSignalRoleWizard,
    create: createSignalRoleWizard,
  },
  FunctionalVariantRef: {
    edit: editFunctionalVariantRefWizard,
    create: createFunctionalVariantRefWizard,
  },
  LNodeDataRef: {
    edit: editLNodeDataRefWizard,
    create: createLNodeDataRefWizard,
  },
  LNodeInputRef: {
    edit: editLNodeInputRefWizard,
    create: createLNodeInputRefWizard,
  },
  LNodeOutputRef: {
    edit: editLNodeOutputRefWizard,
    create: createLNodeOutputRefWizard,
  },
  FunctionalVariant: {
    edit: editFunctionalVariantWizard,
    create: createFunctionalVariantWizard,
  },
  FunctionalSubVariant: {
    edit: editFunctionalSubVariantWizard,
    create: createFunctionalSubVariantWizard,
  },
  FunctionalVariantGroup: {
    edit: editFunctionalVariantGroupWizard,
    create: createFunctionalVariantGroupWizard,
  },
  AllocationRoleRef: {
    edit: editAllocationRoleRefWizard,
    create: createAllocationRoleRefWizard,
  },
  VariableRef: {
    edit: editVariableRefWizard,
    create: createVariableRefWizard,
  },
  FunctionCategoryRef: {
    edit: editFunctionCategoryRefWizard,
    create: createFunctionCategoryRefWizard,
  },
  PowerSystemRelationRef: {
    edit: editPowerSystemRelationRefWizard,
    create: createPowerSystemRelationRefWizard,
  },
  L2CommParameters: {
    edit: editL2CommParametersWizard,
    create: createL2CommParametersWizard,
  },
  L3IPv4CommParameters: {
    edit: editL3IPv4CommParametersWizard,
    create: createL3IPv4CommParametersWizard,
  },
  L3IPv6CommParameters: {
    edit: editL3IPv6CommParametersWizard,
    create: createL3IPv6CommParametersWizard,
  },
  SubscriberLNode: {
    edit: editSubscriberLNodeWizard,
    create: createSubscriberLNodeWizard,
  },
  ControllingLNode: {
    edit: editControllingLNodeWizard,
    create: createControllingLNodeWizard,
  },
  LogParametersRef: {
    edit: editLogParametersRefWizard,
    create: createLogParametersRefWizard,
  },
  AnalogueWiringParametersRef: {
    edit: editAnalogueWiringParametersRefWizard,
    create: createAnalogueWiringParametersRefWizard,
  },
  BinaryWiringParametersRef: {
    edit: editBinaryWiringParametersRefWizard,
    create: createBinaryWiringParametersRefWizard,
  },
  GooseParametersRef: {
    edit: editGooseParametersRefWizard,
    create: createGooseParametersRefWizard,
  },
  SMVParametersRef: {
    edit: editSMVParametersRefWizard,
    create: createSMVParametersRefWizard,
  },
  ReportParametersRef: {
    edit: editReportParametersRefWizard,
    create: createReportParametersRefWizard,
  },
  SubFunctionTemplate: {
    edit: editSubFunctionTemplateWizard,
    create: createSubFunctionTemplateWizard,
  },
  InputVarRef: {
    edit: editInputVarRefWizard,
    create: createInputVarRefWizard,
  },
  OutputVarRef: {
    edit: editOutputVarRefWizard,
    create: createOutputVarRefWizard,
  },
  ControlRef: {
    edit: editControlRefWizard,
    create: createControlRefWizard,
  },
  CheckoutID: {
    edit: editCheckoutIDWizard,
    create: createCheckoutIDWizard,
  },
};
