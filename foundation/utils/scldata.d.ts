declare const sCLTags: readonly ["SCL", "SubNetwork", "GOOSESecurity", "SMVSecurity", "ConnectivityNode", "SubFunction", "Function", "TapChanger", "SubEquipment", "GeneralEquipment", "PowerTransformer", "TransformerWinding", "ConductingEquipment", "Substation", "VoltageLevel", "Bay", "Process", "Line", "EqSubFunction", "EqFunction", "ConnectedAP", "PhysConn", "SDO", "DO", "DAI", "SDI", "DOI", "Inputs", "RptEnabled", "Server", "ServerAt", "SettingControl", "Communication", "Log", "LDevice", "DataSet", "AccessPoint", "IED", "NeutralPoint", "SampledValueControl", "GSEControl", "LogControl", "ReportControl", "GSE", "SMV", "BDA", "DA", "LNodeType", "DOType", "DAType", "EnumType", "Text", "Private", "Hitem", "AccessControl", "Header", "LNode", "Val", "Voltage", "Services", "Subject", "IssuerName", "MinTime", "MaxTime", "Association", "FCDA", "ClientLN", "IEDName", "ExtRef", "Protocol", "LN0", "LN", "FileHandling", "TimeSyncProt", "CommProt", "SGEdit", "ConfSG", "GetDirectory", "GetDataObjectDefinition", "DataObjectDirectory", "GetDataSetValue", "SetDataSetValue", "DataSetDirectory", "ReadWrite", "TimerActivatedControl", "GetCBValues", "GSEDir", "ConfLdName", "DynAssociation", "SettingGroups", "GSSE", "GOOSE", "ConfReportControl", "SMVsc", "DynDataSet", "ConfDataSet", "ConfLogControl", "ConfSigRef", "ReportSettings", "LogSettings", "GSESettings", "SMVSettings", "ConfLNs", "ClientServices", "SupSubscription", "ValueHandling", "RedProt", "McSecurity", "KDC", "Address", "P", "ProtNs", "EnumVal", "Terminal", "BitRate", "Authentication", "DataTypeTemplates", "History", "OptFields", "SmvOpts", "TrgOps", "SamplesPerSec", "SmpRate", "SecPerSamples"];
export type SCLTag = (typeof sCLTags)[number];
export declare function isSCLTag(tag: string): tag is SCLTag;
export declare const relatives: Record<SCLTag, {
    parents: SCLTag[];
    children: SCLTag[];
}>;
declare const sCL6100Tags: readonly ["Private", "AllocationRole", "Application", "BayType", "BehaviorDescription", "CheckoutID", "CommunicationServiceSpecifications", "DOS", "FunctionCategory", "FunctionSclRef", "FunctionTemplate", "LNodeInputs", "LNodeOutputs", "LNodeSpecNaming", "PowerSystemRelations", "ProcessEcho", "ProcessResources", "Project", "ServiceSpecifications", "Variable", "FunctionRef", "FunctionRole", "FunctionalVariant", "FunctionalVariantGroup", "AllocationRoleRef", "ApplicationSclRef", "InputVar", "OutputVar", "BehaviorReference", "FunctionalVariantRef", "InputVarRef", "OutputVarRef", "GooseParameters", "SMVParameters", "ReportParameters", "BinaryWiringParametersRef", "AnalogueWiringParametersRef", "SubscriberLNode", "ControllingLNode", "ProcessEcho", "LogParametersRef", "Val", "SDS", "DAS", "SubscriberLNode", "ControllingLNode", "ProcessEcho", "LogParametersRef", "FunctionCatRef", "SubCategory", "FunctionalVariantRef", "SignalRole", "FunctionRoleContent", "FunctionRef", "BehaviorDescriptionRef", "ProcessResourceRef", "VariableRef", "FunctionCategoryRef", "PowerSystemRelationRef", "SclFileReference", "SubFunctionTemplate", "GeneralEquipment", "ConductingEquipment", "L2CommParameters", "L3IPv4CommParameters", "L3IPv6CommParameters", "SourceRef", "ControlRef", "PowerSystemRelation", "Resource", "ProcessResource", "ProjectProcessReference", "SDS", "DAS", "SubscriberLNode", "ControllingLNode", "ProcessEcho", "LogParametersRef", "GooseParameters", "SMVParameters", "ReportParameters", "BinaryWiringParameters", "AnalogueWiringParameters", "LogParameters", "FunctionalVariantRef", "LNodeDataRef", "LNodeInputRef", "LNodeOutputRef", "L2CommParameters", "L3IPv4CommParameters", "L3IPv6CommParameters", "GeneralEquipment", "ConductingEquipment", "SubFunctionTemplate", "GooseParametersRef", "SMVParametersRef", "ReportParametersRef", "BinaryWiringParametersRef", "VariableApplyTo", "FunctionalSubVariant", "VariableRef", "FunctionalVariantRef", "AnalogueWiringParametersRef", "BinaryWiringParametersRef", "GooseParametersRef", "ReportParametersRef", "SMVParametersRef", "AnalogueWiringParametersRef", "BinaryWiringParametersRef"];
export type SCL6100Tag = (typeof sCL6100Tags)[number];
export declare const tags6100: Record<SCL6100Tag, {
    parents: SCL6100Tag[];
    children: SCL6100Tag[];
}>;
export declare function isSCL6100Tag(tag: string): tag is SCL6100Tag;
export declare function getReference(parent: Element, tag: SCLTag): Element | null;
export declare function get6100Reference(parent: Element, tag: SCL6100Tag): Element | null;
export {};
