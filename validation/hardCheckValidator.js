export function hardCheckValidation(record) {
  if (
    record.moneyToUSD < 20000 ||
    (record.transferSystem != 'correspondentAccounts' && record.transferSystem != 'foreignBranch') ||
    record.transferType == 'intercountry'
  ) {
    if (record.legalEntityName != 'notUsed' || record.taxPayerRegistrationNumber != 'notUsed' ||
      record.residency != 'notUsed' || record.sideLegalEntityName != 'notUsed' ||
      record.intentCode != 'notUsed'
    ) return false;
  }

  if (record.intentClassifier == 'selfAccounts') {
    if (record.transferSystem != 'correspondentAccounts') return false; 
  }

  if (record.intentClassifier == 'selfAccounts' && record.legalStatus == 'legalEntity') {
    if (record.legalEntityName != record.sideLegalEntityName) return false; 
  }

  if (record.transferAmount <= 0) {
    return false; 
  }

  if (record.legalStatus == 'legalEntity') {
    if (record.taxPayerRegistrationNumber != 'notUsed' && record.taxPayerRegistrationNumber.length != 8) return false;
    if (record.intentCode == 3010) return false;
  }

  if (record.legalStatus == 'legalEntity' && record.intentClassifier == 'nonCommercial') {
    if (record.intentCode < 4000 || record.intentCode >= 6000) return false;
  }

  if (record.transferType == 'international') {
    if (record.ISO3166_1Alpha3Countries == 'ARM') return false;
  }

  if (record.transferType == 'international' && record.transactionType == 'received') {
    if (record.senderRegion != 'notUsed') return false;
  }

  if (record.transferType == 'international' && record.transactionType == 'sent') {
    if (record.receiverRegion != 'notUsed') return false;
  }

  if (record.legalStatus == 'solePropriator' || record.legalStatus == 'naturalPerson') {
    if (record.legalEntityName != 'notUsed' || record.taxPayerRegistrationNumber != 'notUsed') return false;
  }

  return true;
}