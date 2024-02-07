const tAbstractConductingEquipment = [
  'TransformerWinding',
  'ConductingEquipment',
] as const;

const tEquipment = [
  'GeneralEquipment',
  'PowerTransformer',
  ...tAbstractConductingEquipment,
] as const;
const tEquipmentContainer = ['Substation', 'VoltageLevel', 'Bay'] as const;
const tGeneralEquipmentContainer = ['Process', 'Line'] as const;
const tAbstractEqFuncSubFunc = ['EqSubFunction', 'EqFunction'] as const;

const tPowerSystemResource = [
  'SubFunction',
  'Function',
  'TapChanger',
  'SubEquipment',
  ...tEquipment,
  ...tEquipmentContainer,
  ...tGeneralEquipmentContainer,
  ...tAbstractEqFuncSubFunc,
] as const;
const tLNodeContainer = ['ConnectivityNode', ...tPowerSystemResource] as const;
const tCertificate = ['GOOSESecurity', 'SMVSecurity'] as const;
const tNaming = ['SubNetwork', ...tCertificate, ...tLNodeContainer] as const;

const tAbstractDataAttribute = ['BDA', 'DA'] as const;
const tControlWithIEDName = ['SampledValueControl', 'GSEControl'] as const;
const tControlWithTriggerOpt = ['LogControl', 'ReportControl'] as const;
const tControl = [...tControlWithIEDName, ...tControlWithTriggerOpt] as const;
const tControlBlock = ['GSE', 'SMV'] as const;
const tUnNaming = [
  'ConnectedAP',
  'PhysConn',
  'SDO',
  'DO',
  'DAI',
  'SDI',
  'DOI',
  'Inputs',
  'RptEnabled',
  'Server',
  'ServerAt',
  'SettingControl',
  'Communication',
  'Log',
  'LDevice',
  'DataSet',
  'AccessPoint',
  'IED',
  'NeutralPoint',
  ...tControl,
  ...tControlBlock,
  ...tAbstractDataAttribute,
] as const;

const tAnyLN = ['LN0', 'LN'] as const;

const tAnyContentFromOtherNamespace = [
  'Text',
  'Private',
  'Hitem',
  'AccessControl',
] as const;

const tCert = ['Subject', 'IssuerName'] as const;
const tDurationInMilliSec = ['MinTime', 'MaxTime'] as const;

const tIDNaming = ['LNodeType', 'DOType', 'DAType', 'EnumType'] as const;

const tServiceYesNo = [
  'FileHandling',
  'TimeSyncProt',
  'CommProt',
  'SGEdit',
  'ConfSG',
  'GetDirectory',
  'GetDataObjectDefinition',
  'DataObjectDirectory',
  'GetDataSetValue',
  'SetDataSetValue',
  'DataSetDirectory',
  'ReadWrite',
  'TimerActivatedControl',
  'GetCBValues',
  'GSEDir',
  'ConfLdName',
] as const;

const tServiceWithMaxAndMaxAttributes = ['DynDataSet', 'ConfDataSet'] as const;

const tServiceWithMax = [
  'GSSE',
  'GOOSE',
  'ConfReportControl',
  'SMVsc',
  ...tServiceWithMaxAndMaxAttributes,
] as const;

const tServiceWithMaxNonZero = ['ConfLogControl', 'ConfSigRef'] as const;

const tServiceSettings = [
  'ReportSettings',
  'LogSettings',
  'GSESettings',
  'SMVSettings',
] as const;

const tBaseElement = ['SCL', ...tNaming, ...tUnNaming, ...tIDNaming] as const;

const sCLTags = [
  ...tBaseElement,
  ...tAnyContentFromOtherNamespace,
  'Header',
  'LNode',
  'Val',
  'Voltage',
  'Services',
  ...tCert,
  ...tDurationInMilliSec,
  'Association',
  'FCDA',
  'ClientLN',
  'IEDName',
  'ExtRef',
  'Protocol',
  ...tAnyLN,
  ...tServiceYesNo,
  'DynAssociation',
  'SettingGroups',
  ...tServiceWithMax,
  ...tServiceWithMaxNonZero,
  ...tServiceSettings,
  'ConfLNs',
  'ClientServices',
  'SupSubscription',
  'ValueHandling',
  'RedProt',
  'McSecurity',
  'KDC',
  'Address',
  'P',
  'ProtNs',
  'EnumVal',
  'Terminal',
  'BitRate',
  'Authentication',
  'DataTypeTemplates',
  'History',
  'OptFields',
  'SmvOpts',
  'TrgOps',
  'SamplesPerSec',
  'SmpRate',
  'SecPerSamples',
] as const;

export type SCLTag = (typeof sCLTags)[number];

const tagSet = new Set<string>(sCLTags);

export function isSCLTag(tag: string): tag is SCLTag {
  return tagSet.has(tag);
}

const tBaseNameSequence = ['Text', 'Private'] as const;
const tNamingSequence = [...tBaseNameSequence] as const;
const tUnNamingSequence = [...tBaseNameSequence] as const;
const tIDNamingSequence = [...tBaseNameSequence] as const;

const tAbstractDataAttributeSequence = [...tUnNamingSequence, 'Val'] as const;
const tLNodeContainerSequence = [...tNamingSequence, 'LNode'] as const;
const tPowerSystemResourceSequence = [...tLNodeContainerSequence] as const;
const tEquipmentSequence = [...tPowerSystemResourceSequence] as const;
const tEquipmentContainerSequence = [
  ...tPowerSystemResourceSequence,
  'PowerTransformer',
  'GeneralEquipment',
] as const;
const tAbstractConductingEquipmentSequence = [
  ...tEquipmentSequence,
  'Terminal',
] as const;
const tControlBlockSequence = [...tUnNamingSequence, 'Address'] as const;
const tControlSequence = [...tNamingSequence] as const;
const tControlWithIEDNameSequence = [...tControlSequence, 'IEDName'] as const;
const tAnyLNSequence = [
  ...tUnNamingSequence,
  'DataSet',
  'ReportControl',
  'LogControl',
  'DOI',
  'Inputs',
  'Log',
] as const;
const tGeneralEquipmentContainerSequence = [
  ...tPowerSystemResourceSequence,
  'GeneralEquipment',
  'Function',
] as const;
const tControlWithTriggerOptSequence = [...tControlSequence, 'TrgOps'] as const;
const tAbstractEqFuncSubFuncSequence = [
  ...tPowerSystemResourceSequence,
  'GeneralEquipment',
  'EqSubFunction',
] as const;

export const relatives: Record<
  SCLTag,
  {
    parents: SCLTag[];
    children: SCLTag[];
  }
> = {
  AccessControl: {
    parents: ['LDevice'],
    children: [],
  },
  AccessPoint: {
    parents: ['IED'],
    children: [
      ...tNamingSequence,
      'Server',
      'LN',
      'ServerAt',
      'Services',
      'GOOSESecurity',
      'SMVSecurity',
    ],
  },
  Address: {
    parents: ['ConnectedAP', 'GSE', 'SMV'],
    children: ['P'],
  },
  Association: {
    parents: ['Server'],
    children: [],
  },
  Authentication: {
    parents: ['Server'],
    children: [],
  },
  BDA: {
    parents: ['DAType'],
    children: [...tAbstractDataAttributeSequence],
  },
  BitRate: {
    parents: ['SubNetwork'],
    children: [],
  },
  Bay: {
    parents: ['VoltageLevel'],
    children: [
      ...tEquipmentContainerSequence,
      'ConductingEquipment',
      'ConnectivityNode',
      'Function',
    ],
  },
  ClientLN: {
    parents: ['RptEnabled'],
    children: [],
  },
  ClientServices: {
    parents: ['Services'],
    children: ['TimeSyncProt', 'McSecurity'],
  },
  CommProt: {
    parents: ['Services'],
    children: [],
  },
  Communication: {
    parents: ['SCL'],
    children: [...tUnNamingSequence, 'SubNetwork'],
  },
  ConductingEquipment: {
    parents: ['Process', 'Line', 'SubFunction', 'Function', 'Bay'],
    children: [
      ...tAbstractConductingEquipmentSequence,
      'EqFunction',
      'SubEquipment',
    ],
  },
  ConfDataSet: {
    parents: ['Services'],
    children: [],
  },
  ConfLdName: {
    parents: ['Services'],
    children: [],
  },
  ConfLNs: {
    parents: ['Services'],
    children: [],
  },
  ConfLogControl: {
    parents: ['Services'],
    children: [],
  },
  ConfReportControl: {
    parents: ['Services'],
    children: [],
  },
  ConfSG: {
    parents: ['SettingGroups'],
    children: [],
  },
  ConfSigRef: {
    parents: ['Services'],
    children: [],
  },
  ConnectedAP: {
    parents: ['SubNetwork'],
    children: [...tUnNamingSequence, 'Address', 'GSE', 'SMV', 'PhysConn'],
  },
  ConnectivityNode: {
    parents: ['Bay', 'Line'],
    children: [...tLNodeContainerSequence],
  },
  DA: {
    parents: ['DOType'],
    children: [...tAbstractDataAttributeSequence],
  },
  DAI: {
    parents: ['DOI', 'SDI'],
    children: [...tUnNamingSequence, 'Val'],
  },
  DAType: {
    parents: ['DataTypeTemplates'],
    children: [...tIDNamingSequence, 'BDA', 'ProtNs'],
  },
  DO: {
    parents: ['LNodeType'],
    children: [...tUnNamingSequence],
  },
  DOI: {
    parents: [...tAnyLN],
    children: [...tUnNamingSequence, 'SDI', 'DAI'],
  },
  DOType: {
    parents: ['DataTypeTemplates'],
    children: [...tIDNamingSequence, 'SDO', 'DA'],
  },
  DataObjectDirectory: {
    parents: ['Services'],
    children: [],
  },
  DataSet: {
    parents: [...tAnyLN],
    children: [...tNamingSequence, 'FCDA'],
  },
  DataSetDirectory: {
    parents: ['Services'],
    children: [],
  },
  DataTypeTemplates: {
    parents: ['SCL'],
    children: ['LNodeType', 'DOType', 'DAType', 'EnumType'],
  },
  DynAssociation: {
    parents: ['Services'],
    children: [],
  },
  DynDataSet: {
    parents: ['Services'],
    children: [],
  },
  EnumType: {
    parents: ['DataTypeTemplates'],
    children: [...tIDNamingSequence, 'EnumVal'],
  },
  EnumVal: {
    parents: ['EnumType'],
    children: [],
  },
  EqFunction: {
    parents: [
      'GeneralEquipment',
      'TapChanger',
      'TransformerWinding',
      'PowerTransformer',
      'SubEquipment',
      'ConductingEquipment',
    ],
    children: [...tAbstractEqFuncSubFuncSequence],
  },
  EqSubFunction: {
    parents: ['EqSubFunction', 'EqFunction'],
    children: [...tAbstractEqFuncSubFuncSequence],
  },
  ExtRef: {
    parents: ['Inputs'],
    children: [],
  },
  FCDA: {
    parents: ['DataSet'],
    children: [],
  },
  FileHandling: {
    parents: ['Services'],
    children: [],
  },
  Function: {
    parents: ['Bay', 'VoltageLevel', 'Substation', 'Process', 'Line'],
    children: [
      ...tPowerSystemResourceSequence,
      'SubFunction',
      'GeneralEquipment',
      'ConductingEquipment',
    ],
  },
  GeneralEquipment: {
    parents: [
      'SubFunction',
      'Function',
      ...tGeneralEquipmentContainer,
      ...tAbstractEqFuncSubFunc,
      ...tEquipmentContainer,
    ],
    children: [...tEquipmentSequence, 'EqFunction'],
  },
  GetCBValues: {
    parents: ['Services'],
    children: [],
  },
  GetDataObjectDefinition: {
    parents: ['Services'],
    children: [],
  },
  GetDataSetValue: {
    parents: ['Services'],
    children: [],
  },
  GetDirectory: {
    parents: ['Services'],
    children: [],
  },
  GOOSE: {
    parents: ['Services'],
    children: [],
  },
  GOOSESecurity: {
    parents: ['AccessPoint'],
    children: [...tNamingSequence, 'Subject', 'IssuerName'],
  },
  GSE: {
    parents: ['ConnectedAP'],
    children: [...tControlBlockSequence, 'MinTime', 'MaxTime'],
  },
  GSEDir: {
    parents: ['Services'],
    children: [],
  },
  GSEControl: {
    parents: ['LN0'],
    children: [...tControlWithIEDNameSequence, 'Protocol'],
  },
  GSESettings: {
    parents: ['Services'],
    children: [],
  },
  GSSE: {
    parents: ['Services'],
    children: [],
  },
  Header: {
    parents: ['SCL'],
    children: ['Text', 'History'],
  },
  History: {
    parents: ['Header'],
    children: ['Hitem'],
  },
  Hitem: {
    parents: ['History'],
    children: [],
  },
  IED: {
    parents: ['SCL'],
    children: [...tUnNamingSequence, 'Services', 'AccessPoint', 'KDC'],
  },
  IEDName: {
    parents: ['GSEControl', 'SampledValueControl'],
    children: [],
  },
  Inputs: {
    parents: [...tAnyLN],
    children: [...tUnNamingSequence, 'ExtRef'],
  },
  IssuerName: {
    parents: ['GOOSESecurity', 'SMVSecurity'],
    children: [],
  },
  KDC: {
    parents: ['IED'],
    children: [],
  },
  LDevice: {
    parents: ['Server'],
    children: [...tUnNamingSequence, 'LN0', 'LN', 'AccessControl'],
  },
  LN: {
    parents: ['AccessPoint', 'LDevice'],
    children: [...tAnyLNSequence],
  },
  LN0: {
    parents: ['LDevice'],
    children: [
      ...tAnyLNSequence,
      'GSEControl',
      'SampledValueControl',
      'SettingControl',
    ],
  },
  LNode: {
    parents: [...tLNodeContainer],
    children: [...tUnNamingSequence],
  },
  LNodeType: {
    parents: ['DataTypeTemplates'],
    children: [...tIDNamingSequence, 'DO'],
  },
  Line: {
    parents: ['Process', 'SCL'],
    children: [
      ...tGeneralEquipmentContainerSequence,
      'Voltage',
      'ConductingEquipment',
    ],
  },
  Log: {
    parents: [...tAnyLN],
    children: [...tUnNamingSequence],
  },
  LogControl: {
    parents: [...tAnyLN],
    children: [...tControlWithTriggerOptSequence],
  },
  LogSettings: {
    parents: ['Services'],
    children: [],
  },
  MaxTime: {
    parents: ['GSE'],
    children: [],
  },
  McSecurity: {
    parents: ['GSESettings', 'SMVSettings', 'ClientServices'],
    children: [],
  },
  MinTime: {
    parents: ['GSE'],
    children: [],
  },
  NeutralPoint: {
    parents: ['TransformerWinding'],
    children: [...tUnNamingSequence],
  },
  OptFields: {
    parents: ['ReportControl'],
    children: [],
  },
  P: {
    parents: ['Address', 'PhysConn'],
    children: [],
  },
  PhysConn: {
    parents: ['ConnectedAP'],
    children: [...tUnNamingSequence, 'P'],
  },
  PowerTransformer: {
    parents: [...tEquipmentContainer],
    children: [
      ...tEquipmentSequence,
      'TransformerWinding',
      'SubEquipment',
      'EqFunction',
    ],
  },
  Private: {
    parents: [],
    children: [],
  },
  Process: {
    parents: ['Process', 'SCL'],
    children: [
      ...tGeneralEquipmentContainerSequence,
      'ConductingEquipment',
      'Substation',
      'Line',
      'Process',
    ],
  },
  ProtNs: {
    parents: ['DAType', 'DA'],
    children: [],
  },
  Protocol: {
    parents: ['GSEControl', 'SampledValueControl'],
    children: [],
  },
  ReadWrite: {
    parents: ['Services'],
    children: [],
  },
  RedProt: {
    parents: ['Services'],
    children: [],
  },
  ReportControl: {
    parents: [...tAnyLN],
    children: [...tControlWithTriggerOptSequence, 'OptFields', 'RptEnabled'],
  },
  ReportSettings: {
    parents: ['Services'],
    children: [],
  },
  RptEnabled: {
    parents: ['ReportControl'],
    children: [...tUnNamingSequence, 'ClientLN'],
  },
  SamplesPerSec: {
    parents: ['SMVSettings'],
    children: [],
  },
  SampledValueControl: {
    parents: ['LN0'],
    children: [...tControlWithIEDNameSequence, 'SmvOpts'],
  },
  SecPerSamples: {
    parents: ['SMVSettings'],
    children: [],
  },
  SCL: {
    parents: [],
    children: [
      ...tBaseNameSequence,
      'Header',
      'Substation',
      'Communication',
      'IED',
      'DataTypeTemplates',
      'Line',
      'Process',
    ],
  },
  SDI: {
    parents: ['DOI', 'SDI'],
    children: [...tUnNamingSequence, 'SDI', 'DAI'],
  },
  SDO: {
    parents: ['DOType'],
    children: [...tNamingSequence],
  },
  Server: {
    parents: ['AccessPoint'],
    children: [
      ...tUnNamingSequence,
      'Authentication',
      'LDevice',
      'Association',
    ],
  },
  ServerAt: {
    parents: ['AccessPoint'],
    children: [...tUnNamingSequence],
  },
  Services: {
    parents: ['IED', 'AccessPoint'],
    children: [
      'DynAssociation',
      'SettingGroups',
      'GetDirectory',
      'GetDataObjectDefinition',
      'DataObjectDirectory',
      'GetDataSetValue',
      'SetDataSetValue',
      'DataSetDirectory',
      'ConfDataSet',
      'DynDataSet',
      'ReadWrite',
      'TimerActivatedControl',
      'ConfReportControl',
      'GetCBValues',
      'ConfLogControl',
      'ReportSettings',
      'LogSettings',
      'GSESettings',
      'SMVSettings',
      'GSEDir',
      'GOOSE',
      'GSSE',
      'SMVsc',
      'FileHandling',
      'ConfLNs',
      'ClientServices',
      'ConfLdName',
      'SupSubscription',
      'ConfSigRef',
      'ValueHandling',
      'RedProt',
      'TimeSyncProt',
      'CommProt',
    ],
  },
  SetDataSetValue: {
    parents: ['Services'],
    children: [],
  },
  SettingControl: {
    parents: ['LN0'],
    children: [...tUnNamingSequence],
  },
  SettingGroups: {
    parents: ['Services'],
    children: ['SGEdit', 'ConfSG'],
  },
  SGEdit: {
    parents: ['SettingGroups'],
    children: [],
  },
  SmpRate: {
    parents: ['SMVSettings'],
    children: [],
  },
  SMV: {
    parents: ['ConnectedAP'],
    children: [...tControlBlockSequence],
  },
  SmvOpts: {
    parents: ['SampledValueControl'],
    children: [],
  },
  SMVsc: {
    parents: ['Services'],
    children: [],
  },
  SMVSecurity: {
    parents: ['AccessPoint'],
    children: [...tNamingSequence, 'Subject', 'IssuerName'],
  },
  SMVSettings: {
    parents: ['Services'],
    children: ['SmpRate', 'SamplesPerSec', 'SecPerSamples', 'McSecurity'],
  },
  SubEquipment: {
    parents: [
      'TapChanger',
      'PowerTransformer',
      'ConductingEquipment',
      'TransformerWinding',
      ...tAbstractConductingEquipment,
    ],
    children: [...tPowerSystemResourceSequence, 'EqFunction'],
  },
  SubFunction: {
    parents: ['SubFunction', 'Function'],
    children: [
      ...tPowerSystemResourceSequence,
      'GeneralEquipment',
      'ConductingEquipment',
      'SubFunction',
    ],
  },
  SubNetwork: {
    parents: ['Communication'],
    children: [...tNamingSequence, 'BitRate', 'ConnectedAP'],
  },
  Subject: {
    parents: ['GOOSESecurity', 'SMVSecurity'],
    children: [],
  },
  Substation: {
    parents: ['SCL'],
    children: [...tEquipmentContainerSequence, 'VoltageLevel', 'Function'],
  },
  SupSubscription: {
    parents: ['Services'],
    children: [],
  },
  TapChanger: {
    parents: ['TransformerWinding'],
    children: [...tPowerSystemResourceSequence, 'SubEquipment', 'EqFunction'],
  },
  Terminal: {
    parents: [...tEquipment],
    children: [...tUnNamingSequence],
  },
  Text: {
    parents: sCLTags.filter(tag => tag !== 'Text' && tag !== 'Private'),
    children: [],
  },
  TimerActivatedControl: {
    parents: ['Services'],
    children: [],
  },
  TimeSyncProt: {
    parents: ['Services', 'ClientServices'],
    children: [],
  },
  TransformerWinding: {
    parents: ['PowerTransformer'],
    children: [
      ...tAbstractConductingEquipmentSequence,
      'TapChanger',
      'NeutralPoint',
      'EqFunction',
      'SubEquipment',
    ],
  },
  TrgOps: {
    parents: ['ReportControl'],
    children: [],
  },
  Val: {
    parents: ['DAI', 'DA', 'BDA'],
    children: [],
  },
  ValueHandling: {
    parents: ['Services'],
    children: [],
  },
  Voltage: {
    parents: ['VoltageLevel'],
    children: [],
  },
  VoltageLevel: {
    parents: ['Substation'],
    children: [...tEquipmentContainerSequence, 'Voltage', 'Bay', 'Function'],
  },
};

const tFunctionCategory = ['FunctionCatRef', 'SubCategory'] as const;
const tProcessResources = ['ProcessResource'] as const;
const tProcessResource = ['Resource'] as const;
const tPowerSystemRelations = ['PowerSystemRelation'] as const;
const tLNodeInputs = ['SourceRef'] as const;
const tLNodeOutputs = ['ControlRef'] as const;
const tVariable = ['VariableApplyTo'] as const;
const tServiceSpecifications = [
  'GooseParameters',
  'SMVParameters',
  'ReportParameters',
  'BinaryWiringParameters',
  'AnalogueWiringParameters',
  'LogParameters',
] as const;
const tCommServiceSpecifications = [
  'GooseParameters',
  'SMVParameters',
  'ReportParameters',
] as const;
const tFunctionRef = ['FunctionalVariantRef', 'SignalRole'] as const;
const tFunctionRoleContent = [
  'FunctionRef',
  'BehaviorDescriptionRef',
  'ProcessResourceRef',
  'VariableRef',
  'FunctionCategoryRef',
  'PowerSystemRelationRef',
] as const;
const tFunctionRole = ['FunctionRoleContent'] as const;
const tAllocationRole = ['FunctionRef'] as const;
const tApplication = [
  'FunctionRole',
  'FunctionalVariant',
  'FunctionalVariantGroup',
  'AllocationRoleRef',
  'ApplicationSclRef',
] as const;
const tBehaviorDescription = [
  'InputVar',
  'OutputVar',
  'BehaviorReference',
] as const;
const tProject = ['ProjectProcessReference'] as const;
const tFunctionTemplate = [
  'SubFunctionTemplate',
  'GeneralEquipment',
  'ConductingEquipment',
] as const;
const tSubFunctionTemplate = [
  'GeneralEquipment',
  'ConductingEquipment',
  'SubFunctionTemplate',
] as const;
const tFunctionSclRef = ['SclFileReference'] as const;
const tDOS = [
  'SDS',
  'DAS',
  'SubscriberLNode',
  'ControllingLNode',
  'ProcessEcho',
  'LogParametersRef',
] as const;
const tSDS = [
  'SDS',
  'DAS',
  'SubscriberLNode',
  'ControllingLNode',
  'ProcessEcho',
  'LogParametersRef',
] as const;
const tDAS = [
  'SubscriberLNode',
  'ControllingLNode',
  'ProcessEcho',
  'LogParametersRef',
  'Val',
] as const;
const tSubscriberLNode = [
  'GooseParametersRef',
  'SMVParametersRef',
  'ReportParametersRef',
  'BinaryWiringParametersRef',
] as const;
const tControllingLNode = [
  'BinaryWiringParametersRef',
  'AnalogueWiringParametersRef',
] as const;
const tInputVarRef = ['FunctionalVariantRef'] as const;
const tLNodeDataRef = ['FunctionalVariantRef'] as const;
const tLNodeInputRef = ['FunctionalVariantRef'] as const;
const tLNodeOutputRef = ['FunctionalVariantRef'] as const;
const tOutputVarRef = ['FunctionalVariantRef'] as const;
const tGooseParameters = [
  'L2CommParameters',
  'L3IPv4CommParameters',
  'L3IPv6CommParameters',
] as const;
const tSMVParameters = [
  'L2CommParameters',
  'L3IPv4CommParameters',
  'L3IPv6CommParameters',
] as const;
const tBehaviorDescriptionRef = [
  'FunctionalVariantRef',
  'InputVarRef',
  'OutputVarRef',
] as const;
const tSignalRole = [
  'FunctionalVariantRef',
  'LNodeDataRef',
  'LNodeInputRef',
  'LNodeOutputRef',
] as const;
const tFunctionalVariantGroup = ['FunctionalVariant'] as const;
const tAllocationRoleRef = ['FunctionalVariant'] as const;

const sCL6100Tags = [
  'Private',
  'AllocationRole',
  'Application',
  'BayType',
  'BehaviorDescription',
  'CheckoutID',
  'CommunicationServiceSpecifications',
  'DOS',
  'FunctionCategory',
  'FunctionSclRef',
  'FunctionTemplate',
  'LNodeInputs',
  'LNodeOutputs',
  'LNodeSpecNaming',
  'PowerSystemRelations',
  'ProcessEcho',
  'ProcessResources',
  'Project',
  'ServiceSpecifications',
  'Variable',
  ...tAllocationRole,
  ...tApplication,
  ...tBehaviorDescription,
  ...tBehaviorDescriptionRef,
  ...tCommServiceSpecifications,
  ...tControllingLNode,
  ...tDAS,
  ...tDOS,
  ...tFunctionCategory,
  ...tFunctionRef,
  ...tFunctionRole,
  ...tFunctionRoleContent,
  ...tFunctionSclRef,
  ...tFunctionTemplate,
  ...tGooseParameters,
  ...tLNodeInputs,
  ...tLNodeOutputs,
  ...tPowerSystemRelations,
  ...tProcessResource,
  ...tProcessResources,
  ...tProject,
  ...tSDS,
  ...tServiceSpecifications,
  ...tSignalRole,
  ...tSMVParameters,
  ...tSubFunctionTemplate,
  ...tSubscriberLNode,
  ...tVariable,
] as const;

export type SCL6100Tag = (typeof sCL6100Tags)[number];

export const tags6100: Record<
  SCL6100Tag,
  {
    parents: SCL6100Tag[];
    children: SCL6100Tag[];
  }
> = {
  Private: {
    parents: [],
    children: [
      'AllocationRole',
      'Application',
      'BayType',
      'BehaviorDescription',
      'CheckoutID',
      'CommunicationServiceSpecifications',
      'DOS',
      'FunctionCategory',
      'FunctionSclRef',
      'FunctionTemplate',
      'PowerSystemRelations',
      'ProcessEcho',
      'ProcessResources',
      'Project',
      'ServiceSpecifications',
      'Variable',
    ],
  },
  SubCategory: {
    parents: ['FunctionCategory'],
    children: [],
  },
  GooseParameters: {
    parents: ['CommunicationServiceSpecifications', 'ServiceSpecifications'],
    children: [...tGooseParameters],
  },
  SMVParameters: {
    parents: ['CommunicationServiceSpecifications', 'ServiceSpecifications'],
    children: [...tSMVParameters],
  },
  ReportParameters: {
    parents: ['CommunicationServiceSpecifications', 'ServiceSpecifications'],
    children: [],
  },
  SignalRole: {
    parents: ['FunctionRef'],
    children: [...tSignalRole],
  },
  FunctionRef: {
    parents: ['FunctionRoleContent', 'AllocationRole'],
    children: [...tFunctionRef],
  },
  BehaviorDescriptionRef: {
    parents: ['FunctionRoleContent'],
    children: [...tBehaviorDescriptionRef],
  },
  ProcessResourceRef: {
    parents: ['FunctionRoleContent'],
    children: [],
  },
  VariableRef: {
    parents: ['FunctionRoleContent'],
    children: [],
  },
  FunctionCategoryRef: {
    parents: ['FunctionRoleContent'],
    children: [],
  },
  PowerSystemRelationRef: {
    parents: ['FunctionRoleContent'],
    children: [],
  },
  FunctionRoleContent: {
    parents: ['FunctionRole'],
    children: [...tFunctionRoleContent],
  },
  FunctionRole: {
    parents: ['Application'],
    children: [...tFunctionRole],
  },
  FunctionalVariant: {
    parents: ['Application'],
    children: [],
  },
  FunctionalVariantGroup: {
    parents: ['Application'],
    children: [...tFunctionalVariantGroup],
  },
  AllocationRoleRef: {
    parents: ['Application'],
    children: [...tAllocationRoleRef],
  },
  ApplicationSclRef: {
    parents: ['Application'],
    children: [],
  },
  InputVar: {
    parents: ['BehaviorDescription'],
    children: [],
  },
  OutputVar: {
    parents: ['BehaviorDescription'],
    children: [],
  },
  BehaviorReference: {
    parents: ['BehaviorDescription'],
    children: [],
  },
  ProjectProcessReference: {
    parents: ['Project'],
    children: [],
  },
  SubFunctionTemplate: {
    parents: ['FunctionTemplate'],
    children: [...tSubFunctionTemplate],
  },
  GeneralEquipment: {
    parents: ['FunctionTemplate', 'SubFunctionTemplate'],
    children: [],
  },
  ConductingEquipment: {
    parents: ['FunctionTemplate', 'SubFunctionTemplate'],
    children: [],
  },
  FunctionCatRef: {
    parents: ['FunctionCategory'],
    children: [],
  },
  ProcessResource: {
    parents: ['ProcessResources'],
    children: [...tProcessResource],
  },
  Resource: {
    parents: ['ProcessResource'],
    children: [],
  },
  PowerSystemRelation: {
    parents: ['PowerSystemRelations'],
    children: [],
  },
  SourceRef: {
    parents: ['LNodeInputs'],
    children: [],
  },
  ControlRef: {
    parents: ['LNodeOutputs'],
    children: [],
  },
  VariableApplyTo: {
    parents: ['Variable'],
    children: [],
  },
  BinaryWiringParameters: {
    parents: ['ServiceSpecifications'],
    children: [],
  },
  AnalogueWiringParameters: {
    parents: ['ServiceSpecifications'],
    children: [],
  },
  LogParameters: {
    parents: ['ServiceSpecifications'],
    children: [],
  },
  FunctionCategory: {
    parents: ['Private'],
    children: [...tFunctionCategory],
  },
  ProcessResources: {
    parents: ['Private'],
    children: ['ProcessResource'],
  },
  PowerSystemRelations: {
    parents: ['Private'],
    children: [...tPowerSystemRelations],
  },
  LNodeInputs: {
    parents: ['Private'],
    children: [...tLNodeInputs],
  },
  LNodeOutputs: {
    parents: ['Private'],
    children: [...tLNodeOutputs],
  },
  ProcessEcho: {
    parents: ['DOS', 'DAS', 'SDS'],
    children: [],
  },
  LNodeSpecNaming: {
    parents: ['Private'],
    children: [],
  },
  DOS: {
    parents: ['Private'],
    children: [...tDOS],
  },
  FunctionSclRef: {
    parents: ['Private'],
    children: [...tFunctionSclRef],
  },
  Variable: {
    parents: ['Private'],
    children: [...tVariable],
  },
  CommunicationServiceSpecifications: {
    parents: ['Private'],
    children: [...tCommServiceSpecifications],
  },
  ServiceSpecifications: {
    parents: ['Private'],
    children: [...tServiceSpecifications],
  },
  BayType: {
    parents: ['Private'],
    children: [],
  },
  AllocationRole: {
    parents: ['Private'],
    children: [...tAllocationRole],
  },
  Application: {
    parents: ['Private'],
    children: [...tApplication],
  },
  BehaviorDescription: {
    parents: ['Private'],
    children: [...tBehaviorDescription],
  },
  Project: {
    parents: ['Private'],
    children: [...tProject],
  },
  FunctionTemplate: {
    parents: ['Private'],
    children: [...tFunctionTemplate],
  },
  SclFileReference: {
    parents: ['FunctionSclRef'],
    children: [],
  },
  SDS: {
    parents: ['DOS'],
    children: [...tSDS],
  },
  DAS: {
    parents: ['DOS'],
    children: [...tDAS],
  },
  SubscriberLNode: {
    parents: ['DOS'],
    children: [...tSubscriberLNode],
  },
  ControllingLNode: {
    parents: ['DOS'],
    children: [],
  },
  LogParametersRef: {
    parents: ['DOS'],
    children: [],
  },
  GooseParametersRef: {
    parents: ['SubscriberLNode'],
    children: [],
  },
  SMVParametersRef: {
    parents: ['SubscriberLNode'],
    children: [],
  },
  ReportParametersRef: {
    parents: ['SubscriberLNode'],
    children: [],
  },
  BinaryWiringParametersRef: {
    parents: ['SubscriberLNode', 'ControllingLNode'],
    children: [],
  },
  Val: {
    parents: ['DAS'],
    children: [],
  },
  AnalogueWiringParametersRef: {
    parents: ['ControllingLNode'],
    children: [],
  },
  FunctionalVariantRef: {
    parents: [
      'AllocationRoleRef',
      'BehaviorDescriptionRef',
      'FunctionCategoryRef',
      'FunctionRef',
      'FunctionRole',
      'InputVarRef',
      'LNodeDataRef',
      'LNodeInputRef',
      'LNodeOutputRef',
      'OutputVarRef',
      'PowerSystemRelationRef',
      'ProcessResourceRef',
      'SignalRole',
      'VariableRef',
    ],
    children: [],
  },
  InputVarRef: {
    parents: ['BehaviorDescriptionRef'],
    children: [...tInputVarRef],
  },
  LNodeDataRef: {
    parents: ['SignalRole'],
    children: [...tLNodeDataRef],
  },
  LNodeInputRef: {
    parents: ['SignalRole'],
    children: [...tLNodeInputRef],
  },
  LNodeOutputRef: {
    parents: ['SignalRole'],
    children: [...tLNodeOutputRef],
  },
  OutputVarRef: {
    parents: ['BehaviorDescriptionRef'],
    children: [...tOutputVarRef],
  },
  L2CommParameters: {
    parents: ['GooseParameters', 'SMVParameters'],
    children: [],
  },
  L3IPv4CommParameters: {
    parents: ['GooseParameters', 'SMVParameters'],
    children: [],
  },
  L3IPv6CommParameters: {
    parents: ['GooseParameters', 'SMVParameters'],
    children: [],
  },
  CheckoutID: {
    parents: ['Private'],
    children: [],
  },
};

const tagSet6100 = new Set<string>(sCL6100Tags);

export function isSCL6100Tag(tag: string): tag is SCL6100Tag {
  return tagSet6100.has(tag);
}

export function getReference(parent: Element, tag: SCLTag): Element | null {
  const parentTag = parent.tagName;
  const children = Array.from(parent.children);

  if (
    parentTag === 'Services' ||
    parentTag === 'SettingGroups' ||
    !isSCLTag(parentTag)
  )
    return children.find(child => child.tagName === tag) ?? null;

  const sequence = relatives[parentTag]?.children ?? [];
  let index = sequence.findIndex(element => element === tag);

  if (index < 0) return null;

  let nextSibling: Element | undefined;
  while (index < sequence.length && !nextSibling) {
    // eslint-disable-next-line no-loop-func
    nextSibling = children.find(child => child.tagName === sequence[index]);
    // eslint-disable-next-line no-plusplus
    index++;
  }

  return nextSibling ?? null;
}

export function get6100Reference(
  parent: Element,
  tag: SCL6100Tag,
): Element | null {
  const parentTag = parent.localName;
  const children = Array.from(parent.children);

  if (!isSCL6100Tag(parentTag))
    return children.find(child => child.localName === tag) ?? null;

  const sequence = tags6100[parentTag]?.children ?? [];
  let index = sequence.findIndex(element => element === tag);

  if (index < 0) return null;

  let nextSibling: Element | undefined;
  while (index < sequence.length && !nextSibling) {
    // eslint-disable-next-line no-loop-func
    nextSibling = children.find(child => child.localName === sequence[index]);
    // eslint-disable-next-line no-plusplus
    index++;
  }

  return nextSibling ?? null;
}
