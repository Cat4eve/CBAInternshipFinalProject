import fs from "fs";
import libxmljs from "libxmljs";
import { XMLParser } from "fast-xml-parser";
import { hardCheckValidation } from "./hardCheckValidator.js";


function validateXMLandHardCheck(xmlPath) {
    const xmlData = fs.readFileSync(xmlPath, "utf8");
    const xsdData = fs.readFileSync('../back-end/MODS.xsd', "utf8");

    const xmlDoc = libxmljs.parseXml(xmlData);
    const xsdDoc = libxmljs.parseXml(xsdData);

    const isValid = xmlDoc.validate(xsdDoc);

    if (!isValid) return false;

    const parser = new XMLParser();
    const obj = parser.parse(xmlData);
    
    const record = {
      transferType: obj.mods.transferTypeInfo.transferType,
      legalStatus: obj.mods.legalStatusInfo.legalStatus,
      transactionType: obj.mods.transactionTypeInfo.transactionType,
      methodOfTransfer: obj.mods.methodOfTransferInfo.methodOfTransfer,
      transferSystem: obj.mods.transferSystemInfo.transferSystem,
      communicationType: obj.mods.communicationTypeInfo.communicationType,
      senderRegion: obj.mods.senderRegionInfo.senderRegion,
      receiverRegion: obj.mods.receiverRegionInfo.receiverRegion,
      ISO3166_1Alpha3Countries: obj.mods.ISO3166_1Alpha3CountriesInfo.ISO3166_1Alpha3Countries,
      money: parseFloat(obj.mods.moneyInfo.money),
      ISO4217Currencies: obj.mods.ISO4217CurrenciesInfo.ISO4217Currencies,
      moneyToUSD: parseFloat(obj.mods.moneyToUSDInfo.moneyToUSD),
      sizeClassifier: obj.mods.sizeClassifierInfo.sizeClassifier,
      legalEntityName: obj.mods.legalEntityNameInfo.legalEntityName,
      taxPayerRegistrationNumber: obj.mods.taxPayerRegistrationNumberInfo.taxPayerRegistrationNumber,
      segmentMembership: obj.mods.segmentMembershipInfo.segmentMembership,
      residency: obj.mods.residencyInfo.residency,
      sideLegalEntityName: obj.mods.sideLegalEntityNameInfo.sideLegalEntityName,
      sideResidency: obj.mods.sideResidencyInfo.sideResidency,
      sideLegalStatus: obj.mods.sideLegalStatusInfo.sideLegalStatus,
      intentClassifier: obj.mods.intentClassifierInfo.intentClassifier,
      intentCode: obj.mods.intentCodeInfo.intentCode,
      transferAmount: parseInt(obj.mods.transferAmountInfo.transferAmount),
      sidePayment: parseInt(obj.mods.sidePaymentInfo.sidePayment),
    };


    return hardCheckValidation(record);
    
}

for (let i = 1; i <= 5; i++) {
    const XSDValidation = validateXMLandHardCheck(`./instance_${i}.xml`);
    console.log(`Validation #${i} - Results is: ${XSDValidation ? 'valid' : 'invalid'}`);
}