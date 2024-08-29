import React from 'react'
import Header from '../container/Header'
import Footer from '../container/Footer'
import { useTranslation } from 'react-i18next'

function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <div>
      <div className="GlobalContainer">
        <div class="background-container-contained" />
        <Header />
        <div className="narrowWrapper">
          <h1>{t('privacy.header')}</h1>
          <h4>{t('privacy.statusAndAcceptanceTitle')}</h4>
          <p>{t('privacy.statusAndAcceptancePoint1')}</p>
          <p>{t('privacy.statusAndAcceptancePoint2')}</p>
          <p>{t('privacy.privacyPolicyLegalEntity')}</p>
          <p>{t('privacy.statusAndAcceptancePoint3')}</p>
          <p>{t('privacy.statusAndAcceptancePoint4')}</p>
          <p>{t('privacy.statusAndAcceptancePoint5')}</p>
          <h4>{t('privacy.collectionProcessingAndUseTitle')}</h4>
          <p>{t('privacy.collectionProcessingAndUsePoint1')}</p>
          <p>{t('privacy.collectionProcessingAndUsePoint2')}</p>
          <p>{t('privacy.collectionProcessingAndUsePoint3')}</p>
          <p>{t('privacy.collectionProcessingAndUsePoint4')}</p>
          <p>{t('privacy.collectionProcessingAndUsePoint5')}</p>
          <p>{t('privacy.collectionProcessingAndUsePoint6')}</p>
          <p>{t('privacy.cookiesAndPersonalDataCollection')}</p>
          <p>{t('privacy.necessaryDataCollection')}</p>
          <p>{t('privacy.soleDataControllerAndProcessor')}</p>
          <p>{t('privacy.accessToReviewAndEditData')}</p>
          <p>{t('privacy.publishingPersonalData')}</p>
          <p>{t('privacy.retentionPolicy')}</p>
          <p>{t('privacy.processingPersonalData')}</p>
          <p>{t('privacy.securityBreachNotification')}</p>
          <p>{t('privacy.warningEmailsInCaseOfHighBreachRisks')}</p>
          <h4>{t('privacy.dataProtectionAndSharingTitle')}</h4>
          <p>{t('privacy.confidentialityMaintained')}</p>
          <p>{t('privacy.dataStoredAndProcessed')}</p>
          <p>{t('privacy.thirdPartyDatabases')}</p>
          <p>{t('privacy.noSharingWithThirdParties')}</p>
          <p>{t('privacy.noSaleOrRentalOfPersonalData')}</p>
          <p>{t('privacy.combiningInformationWithOtherSources')}</p>
          <p>{t('privacy.linksToPartnerNetworks')}</p>
          <h4>{t('privacy.retainingInformationTitle')}</h4>
          <p>{t('privacy.informationStoredForRelevantPeriods')}</p>
          <h4>{t('privacy.securityMeasuresTitle')}</h4>
          <p>{t('privacy.employmentOfSecurityMeasures')}</p>
          <h4>{t('privacy.changeUpdateDeletePersonalData')}</h4>
          <p>{t('privacy.rightsToAccessCorrectUpdateDeleteData')}</p>
          <h4>{t('privacy.amendmentsTitle')}</h4>
          <p>{t('privacy.reservationOfRightToModifyPolicy')}</p>
          <h4>{t('privacy.disclaimersRegardingChildrenAndMinorsTitle')}</h4>
          <p>{t('privacy.collectionFromMinorsDiscouraged')}</p>
          <p>{t('privacy.inquiriesUnsubscribeRequests')}</p>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default PrivacyPage
