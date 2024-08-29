import React from 'react'
import Header from '../container/Header'
import Footer from '../container/Footer'
import { useTranslation } from 'react-i18next'

function TermsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <div className="GlobalContainer">
        <div class="background-container-contained" />
        <Header />
        <div className="narrowWrapper">
          <h1>{t('terms.header')}</h1>
          <p className="text-small">
            {t('terms.paragraph1')}
            <a href="https://bitcoinlamas.io/">{t('terms.link')}</a>.
          </p>
          <p className="text-small">{t('terms.paragraph2')}</p>
          <p className="text-small">{t('terms.paragraph3')}</p>
          <p className="text-small">{t('terms.paragraph4')}</p>
          <p className="text-small">{t('terms.paragraph5')}</p>
          <h2>{t('terms.definitionsTitle')}</h2>
          <p className="text">{t('terms.definitionsDescription1')}</p>
          <h3>{t('terms.definitionsHeader1')}</h3>
          <p className="text">{t('terms.definitionsText1')}</p>
          <h3>{t('terms.definitionsAccompanyingDocumentsTitle')}</h3>
          <p className="text">
            {t('terms.definitionsAccompanyingDocumentsDescription1')}
          </p>
          <h4>{t('terms.definitionsAffiliateTitle')}</h4>
          <p className="text">{t('terms.definitionsAffiliateDescription1')}</p>
          <h4>{t('terms.definitionsApplicableLawTitle')}</h4>
          <p className="text">
            {t('terms.definitionsApplicableLawDescription1')}
          </p>
          <h4>{t('terms.definitionsDissolutionEventTitle')}</h4>
          <p className="text">
            {t('terms.definitionsDissolutionEventDescription1')}
          </p>
          <h4>{t('terms.definitionsBitcoinlamasPlatformTitle')}</h4>
          <p className="text">
            {t('terms.definitionsBitcoinlamasPlatformDescription1')}
          </p>
          <h4>{t('terms.definitionsCryptocurrencyTitle')}</h4>
          <p className="text">
            {t('terms.definitionsCryptocurrencyDescription1')}
          </p>
          <h4>{t('terms.definitionsIntellectualPropertyRightsTitle')}</h4>
          <p className="text">
            {t('terms.definitionsIntellectualPropertyRightsDescription1')}
          </p>
          <h4>{t('terms.definitionsBLAMTokensTitle')}</h4>
          <p className="text">{t('terms.definitionsBLAMTokensDescription1')}</p>
          <h4>{t('terms.definitionsBLAMTokenSaleTitle')}</h4>
          <p className="text">
            {t('terms.definitionsBLAMTokenSaleDescription1')}
          </p>
          <h4>{t('terms.definitionsMaximumTransactionAmountTitle')}</h4>
          <p className="text">
            {t('terms.definitionsMaximumTransactionAmountDescription1')}
          </p>
          <h4>{t('terms.definitionsMinimumTransactionAmountTitle')}</h4>
          <p className="text">
            {t('terms.definitionsMinimumTransactionAmountDescription1')}
          </p>
          <h4>{t('terms.definitionsPurchaserTitle')}</h4>
          <p className="text">{t('terms.definitionsPurchaserDescription1')}</p>
          <h4>{t('terms.definitionsWebsiteTitle')}</h4>
          <p className="text">{t('terms.definitionsWebsiteDescription1')}</p>
          <h4>{t('terms.definitionsUserTitle')}</h4>
          <p className="text">{t('terms.definitionsUserDescription1')}</p>
          <h4>{t('terms.definitionsNumberingTermsTitle')}</h4>
          <p className="text">{t('terms.definitionsNumberingTermsPoint1')}</p>
          <p className="text">{t('terms.definitionsNumberingTermsPoint2')}</p>
          <p className="text">{t('terms.definitionsNumberingTermsPoint3')}</p>
          <p className="text">{t('terms.definitionsNumberingTermsPoint4')}</p>
          <p className="text">{t('terms.definitionsNumberingTermsPoint5')}</p>
          <p className="text">{t('terms.definitionsNumberingTermsPoint6')}</p>
          <p className="text">{t('terms.definitionsNumberingTermsPoint7')}</p>
          <p className="text">{t('terms.definitionsNumberingTermsPoint8')}</p>
          <p className="text">{t('terms.definitionsNumberingTermsPoint9')}</p>
          <p className="text">{t('terms.definitionsNumberingTermsPoint10')}</p>
          <p className="text">{t('terms.definitionsNumberingTermsPoint11')}</p>
          <p className="text">{t('terms.definitionsNumberingTermsPoint12')}</p>
          <p className="text">{t('terms.definitionsNumberingTermsPoint13')}</p>
          <p className="text">{t('terms.definitionsParticipantEligibility')}</p>
          <p className="text">
            {t('terms.definitionsProhibitedJurisdictions')}
          </p>
          <h4>{t('terms.companyRepresentationsAndGeneralProvisionsTitle')}</h4>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint1')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint2')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint3')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint4')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint5')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint6')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint7')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint8')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint9')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint10')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint11')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint12')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint13')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint14')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint15')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint16')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint17')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint18')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint19')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint20')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint21')}
          </p>
          <p className="text">
            {t('terms.companyRepresentationsAndGeneralProvisionsPoint22')}
          </p>
          <h4>{t('terms.companyRepresentationsTitle')}</h4>
          <p className="text">{t('terms.companyRepresentationsPoint1')}</p>
          <p className="text">{t('terms.companyRepresentationsPoint2')}</p>
          <p className="text">{t('terms.companyRepresentationsPoint3')}</p>
          <p className="text">{t('terms.companyRepresentationsPoint4')}</p>
          <p className="text">{t('terms.companyRepresentationsPoint5')}</p>
          <h4>{t('terms.indemnificationTitle')}</h4>
          <p className="text">{t('terms.indemnificationPoint1')}</p>
          <p className="text">{t('terms.indemnificationPoint2')}</p>
          <h4>{t('terms.limitationOfLiabilityTitle')}</h4>
          <p className="text">{t('terms.limitationOfLiabilityPoint1')}</p>
          <p className="text">{t('terms.limitationOfLiabilityPoint2')}</p>
          <p className="text">{t('terms.limitationOfLiabilityPoint3')}</p>
          <p className="text">{t('terms.limitationOfLiabilityPoint4')}</p>
          <p className="text">{t('terms.limitationOfLiabilityPoint5')}</p>
          <p className="text">{t('terms.limitationOfLiabilityPoint6')}</p>
          <p className="text">{t('terms.limitationOfLiabilityPoint7a')}</p>
          <p className="text">{t('terms.limitationOfLiabilityPoint7b')}</p>
          <p className="text">{t('terms.limitationOfLiabilityPoint7c')}</p>
          <p className="text">{t('terms.limitationOfLiabilityPoint7_1')}</p>
          <p className="text">{t('terms.limitationOfLiabilityPoint7_2')}</p>
          <h4>{t('terms.obligationsOfThePartiesTitle')}</h4>
          <p className="text">{t('terms.obligationsOfThePartiesPoint1')}</p>
          <p className="text">{t('terms.obligationsOfThePartiesPoint2')}</p>
          <p className="text">{t('terms.obligationsOfThePartiesPoint3')}</p>
          <p className="text">{t('terms.obligationsOfThePartiesPoint4')}</p>
          <p className="text">{t('terms.obligationsOfThePartiesPoint5')}</p>
          <p className="text">{t('terms.obligationsOfThePartiesPoint6')}</p>
          <p className="text">{t('terms.obligationsOfThePartiesPoint7')}</p>
          <p className="text">{t('terms.obligationsOfThePartiesPoint8')}</p>
          <p className="text">{t('terms.obligationsOfThePartiesPoint9')}</p>
          <p className="text">{t('terms.obligationsOfThePartiesPoint10')}</p>
          <p className="text">{t('terms.obligationsOfThePartiesPoint11')}</p>
          <h4>{t('terms.additionalRepresentationsAndWarrantiesTitle')}</h4>
          <p className="text">
            {t('terms.additionalRepresentationsAndWarrantiesPoint1')}
          </p>
          <p className="text">
            {t('terms.additionalRepresentationsAndWarrantiesPoint2')}
          </p>
          <h4>{t('terms.intellectualPropertyTitle')}</h4>
          <p className="text">{t('terms.intellectualPropertyPoint1')}</p>
          <p className="text">{t('terms.intellectualPropertyPoint2')}</p>
          <p className="text">{t('terms.intellectualPropertyPoint3')}</p>
          <p className="text">{t('terms.intellectualPropertyPoint4')}</p>
          <p className="text">{t('terms.intellectualPropertyPoint5')}</p>
          <h4>{t('terms.entireAgreementTitle')}</h4>
          <p className="text">{t('terms.entireAgreementPoint1')}</p>
          <h4>{t('terms.severabilityTitle')}</h4>
          <p className="text">{t('terms.severabilityPoint1')}</p>
          <h4>{t('terms.applicableLawAndDisputeResolutionTitle')}</h4>
          <p className="text">
            {t('terms.applicableLawAndDisputeResolutionPoint1')}
          </p>
          <p className="text">
            {t('terms.applicableLawAndDisputeResolutionPoint2')}
          </p>
          <p className="text">
            {t('terms.applicableLawAndDisputeResolutionPoint3')}
          </p>
          <h4>{t('terms.terminationAndSuspensionTitle')}</h4>
          <p className="text">{t('terms.terminationAndSuspensionPoint1')}</p>
          <p className="text">{t('terms.terminationAndSuspensionPoint2')}</p>
          <p className="text">{t('terms.terminationAndSuspensionPoint3')}</p>
          <h4>{t('terms.miscellaneousTitle')}</h4>
          <p className="text">{t('terms.miscellaneousPoint1')}</p>
          <p className="text">{t('terms.miscellaneousPoint2')}</p>
          <p className="text">{t('terms.miscellaneousPoint3')}</p>
          <p className="text">{t('terms.miscellaneousPoint4')}</p>
          <p className="text">{t('terms.miscellaneousPoint5')}</p>
          <p className="text">{t('terms.miscellaneousPoint6')}</p>
          <p className="text">{t('terms.miscellaneousPoint7')}</p>
          <p className="text">{t('terms.miscellaneousPoint8')}</p>

          <h3>{t('terms.appendixATitle')}</h3>
          <h4>{t('terms.appendixAOverviewOfTokensTitle')}</h4>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint1')}</p>
          <ul className="list">
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint1a')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint1b')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint1c')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint1d')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint1e')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint1f')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint1g')}
            </li>
          </ul>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint2')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint3')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint5')}</p>
          <ul className="list">
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint5Phase1')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint5Phase2')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint5Phase3')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint5Phase4')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint5Phase5')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint5Phase6')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint5Phase7')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint5Phase8')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint5Phase9')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint5Phase10')}
            </li>
          </ul>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint6')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint7')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint8')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint9')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint10')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint11')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint12')}</p>
          <ul className="list">
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint12a')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint12b')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint12c')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint12d')}
            </li>
          </ul>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint13')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint14')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint15')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint16')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint17')}</p>
          <ul className="list">
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint17a')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint17b')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint17c')}
            </li>
          </ul>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint18')}</p>
          <ul className="list">
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint18a')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint18b')}
            </li>
            <li className="listItem">
              {t('terms.appendixAOverviewOfTokensPoint18c')}
            </li>
          </ul>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint19')}</p>
          <p className="text">{t('terms.appendixAOverviewOfTokensPoint20')}</p>

          <h3>{t('terms.appendixBTitle')}</h3>
          <h4>{t('terms.appendixBOverviewTitle')}</h4>
          <p className="text">{t('terms.appendixBOverviewPoint1')}</p>
          <p className="text">{t('terms.appendixBOverviewPoint2')}</p>
          <b><p className="text">{t('terms.appendixBOverviewPoint3ATitle')}</p></b>
          <p className="text">{t('terms.appendixBOverviewPoint3A')}</p>
          <ol className="list">
            <li>{t('terms.appendixBOverviewPoint3AOption1')}</li>
            <li>{t('terms.appendixBOverviewPoint3AOption2')}</li>
          </ol>
          <b><p className="text">{t('terms.appendixBOverviewPoint3BTitle')}</p></b>
          <p className="text">{t('terms.appendixBOverviewPoint3B')}</p>
          <b><p className="text">{t('terms.appendixBOverviewPoint3CTitle')}</p></b>
          <p className="text">{t('terms.appendixBOverviewPoint3C')}</p>
          <b><p className="text">{t('terms.appendixBOverviewPoint3DTitle')}</p></b>
          <p className="text">{t('terms.appendixBOverviewPoint3D')}</p>
          <b><p className="text">{t('terms.appendixBOverviewPoint3ETitle')}</p></b>
          <p className="text">{t('terms.appendixBOverviewPoint3E')}</p>
          <b><p className="text">{t('terms.appendixBOverviewPoint3FTitle')}</p></b>
          <p className="text">{t('terms.appendixBOverviewPoint3F')}</p>
          <b><p className="text">{t('terms.appendixBOverviewPoint3GTitle')}</p></b>
          <p className="text">{t('terms.appendixBOverviewPoint3G')}</p>
          <b><p className="text">{t('terms.appendixBOverviewPoint3HTitle')}</p></b>
          <p className="text">{t('terms.appendixBOverviewPoint3H')}</p>
          <b><p className="text">{t('terms.appendixBOverviewPoint3ITitle')}</p></b>
          <p className="text">{t('terms.appendixBOverviewPoint3I')}</p>
          <b><p className="text">{t('terms.appendixBOverviewPoint3JTitle')}</p></b>
          <p className="text">{t('terms.appendixBOverviewPoint3J')}</p>
          <b><p className="text">{t('terms.appendixBOverviewPoint3KTitle')}</p></b>
          <p className="text">{t('terms.appendixBOverviewPoint3K')}</p>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default TermsPage
