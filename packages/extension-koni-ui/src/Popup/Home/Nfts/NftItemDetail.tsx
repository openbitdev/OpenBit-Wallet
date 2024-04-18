// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getExplorerLink } from '@subwallet/extension-base/services/transaction-service/utils';
import { OrdinalRemarkData } from '@subwallet/extension-base/types';
import DefaultLogosMap from '@subwallet/extension-koni-ui/assets/logo';
import {AccountProxyAvatar, Layout, PageWrapper} from '@subwallet/extension-koni-ui/components';
import { CAMERA_CONTROLS_MODEL_VIEWER_PROPS, DEFAULT_MODEL_VIEWER_PROPS, SHOW_3D_MODELS_CHAIN } from '@subwallet/extension-koni-ui/constants';
import { DataContext } from '@subwallet/extension-koni-ui/contexts/DataContext';
import {useNavigateOnChangeAccount, useSelector} from '@subwallet/extension-koni-ui/hooks';
import useTranslation from '@subwallet/extension-koni-ui/hooks/common/useTranslation';
import useDefaultNavigate from '@subwallet/extension-koni-ui/hooks/router/useDefaultNavigate';
import useGetChainInfo from '@subwallet/extension-koni-ui/hooks/screen/common/useFetchChainInfo';
import useGetAccountInfoByAddress from '@subwallet/extension-koni-ui/hooks/screen/common/useGetAccountInfoByAddress';
import InscriptionImage from '@subwallet/extension-koni-ui/Popup/Home/Nfts/component/InscriptionImage';
import { INftItemDetail } from '@subwallet/extension-koni-ui/Popup/Home/Nfts/utils';
import { Theme, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { BackgroundIcon, Field, Icon, Image, Logo, ModalContext, SwModal } from '@subwallet/react-ui';
import { getAlphaColor } from '@subwallet/react-ui/lib/theme/themes/default/colorAlgorithm';
import CN from 'classnames';
import { CaretLeft, Info } from 'phosphor-react';
import React, { useCallback, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import {RootState} from "@subwallet/extension-koni-ui/stores";

type Props = ThemeProps

const NFT_DESCRIPTION_MAX_LENGTH = 70;

const modalCloseButton = <Icon
  customSize={'24px'}
  phosphorIcon={CaretLeft}
  type='phosphor'
  weight={'light'}
/>;

function Component ({ className = '' }: Props): React.ReactElement<Props> {
  const location = useLocation();
  const { collectionInfo, nftItem } = location.state as INftItemDetail;

  const { t } = useTranslation();
  const { goBack } = useDefaultNavigate();
  const { token } = useTheme() as Theme;

  const dataContext = useContext(DataContext);
  const { activeModal, inactiveModal } = useContext(ModalContext);
  const currentAccountProxy = useSelector((state: RootState) => state.accountState.currentAccountProxy);

  const originChainInfo = useGetChainInfo(nftItem.chain);
  const ownerAccountInfo = useGetAccountInfoByAddress(nftItem.owner || '');
  const accountExternalUrl = getExplorerLink(originChainInfo, nftItem.owner, 'account');

  useNavigateOnChangeAccount('/home/nfts/collections');

  const ownerPrefix = useCallback(() => {
    if (nftItem.owner) {
      return (
      <AccountProxyAvatar size={20} value={currentAccountProxy?.proxyId}/>
      );
    }

    return <div />;
  }, [nftItem.owner, originChainInfo.substrateInfo?.addressPrefix, token.fontSizeXL]);

  const originChainLogo = useCallback(() => {
    return (
      <Logo
        network={originChainInfo.slug}
        shape={'circle'}
        size={token.fontSizeXL}
      />
    );
  }, [originChainInfo.slug, token.fontSizeXL]);

  const ownerInfo = useCallback(() => {
    return (
      <span>
        <span>{ownerAccountInfo?.name}</span> <span className={'nft_item_detail__owner_address'}>({`${nftItem?.owner.slice(0, 4)}...${nftItem?.owner.slice(-4)}`})</span>
      </span>
    );
  }, [nftItem?.owner, ownerAccountInfo?.name]);

  const handleClickExternalAccountInfo = useCallback(() => {
    try {
      // eslint-disable-next-line no-void
      void chrome.tabs.create({ url: accountExternalUrl, active: true }).then(() => console.log('redirecting'));
    } catch (e) {
      console.log('error redirecting to a new tab');
    }
  }, [accountExternalUrl]);

  const handleClickExternalCollectionInfo = useCallback(() => {
    try {
      // eslint-disable-next-line no-void
      void chrome.tabs.create({ url: nftItem.externalUrl, active: true }).then(() => console.log('redirecting'));
    } catch (e) {
      console.log('error redirecting to a new tab');
    }
  }, [nftItem.externalUrl]);

  const externalInfoIcon = useCallback((type: 'account' | 'collection') => {
    return (
      <div
        className={'nft_item_detail__external_icon'}
        onClick={type === 'account' ? handleClickExternalAccountInfo : handleClickExternalCollectionInfo}
      >
        <Icon
          customSize={'20px'}
          phosphorIcon={Info}
          type='phosphor'
          weight={'light'}
        />
      </div>
    );
  }, [handleClickExternalAccountInfo, handleClickExternalCollectionInfo]);

  const handleShowNftDescription = useCallback(() => {
    if (nftItem?.description && nftItem.description.length > NFT_DESCRIPTION_MAX_LENGTH) {
      activeModal('nftItemDescription');
    }
  }, [activeModal, nftItem.description]);

  const onCloseNftDescriptionModal = useCallback(() => {
    inactiveModal('nftItemDescription');
  }, [inactiveModal]);

  const onImageClick = useCallback(() => {
    if (nftItem.externalUrl) {
      chrome.tabs.create({ url: nftItem.externalUrl, active: true })
        .then(() => console.log('redirecting'))
        .catch(console.error);
    }
  }, [nftItem.externalUrl]);

  const show3DModel = SHOW_3D_MODELS_CHAIN.includes(nftItem.chain);
  const ordinalNftItem = nftItem.description && JSON.parse(nftItem.description) as OrdinalRemarkData;
  const isInscription = useMemo(() => {
    if (ordinalNftItem && 'p' in ordinalNftItem && 'op' in ordinalNftItem && 'tick' in ordinalNftItem && 'amt' in ordinalNftItem) {
      return true;
    }

    return false;
  }, [ordinalNftItem]);

  return (
    <PageWrapper
      className={`${className}`}
      resolve={dataContext.awaitStores(['nft', 'accountState', 'chainStore'])}
    >
      <Layout.Base
        onBack={goBack}
        showBackButton={true}
        showSubHeader={true}
        subHeaderBackground={'transparent'}
        subHeaderCenter={false}
        subHeaderPaddingVertical={true}
        title={nftItem.name || nftItem.id}
      >
        <div className={'nft_item_detail__container'}>
          <div className={'nft_item_detail__nft_image'}>
            {isInscription && nftItem.description && (
              <InscriptionImage
                alone={true}
                properties={JSON.parse(nftItem.description) as OrdinalRemarkData}
              />
            )}
            {!isInscription && (
              <Image
                className={CN({ clickable: nftItem.externalUrl })}
                height={358}
                modelViewerProps={show3DModel ? { ...DEFAULT_MODEL_VIEWER_PROPS, ...CAMERA_CONTROLS_MODEL_VIEWER_PROPS } : undefined}
                onClick={onImageClick}
                src={nftItem.image || DefaultLogosMap.default_placeholder}
                width={show3DModel ? 358 : undefined}
              />
            )}
          </div>

          <div className={'nft_item_detail__info_container'}>
            <div className={'nft_item_detail__section_title'}>{t<string>('Collectible details')}</div>
            {
              nftItem.description && (
                <div
                  className={'nft_item_detail__description_container'}
                  onClick={handleShowNftDescription}
                  style={{ cursor: nftItem.description.length > NFT_DESCRIPTION_MAX_LENGTH ? 'pointer' : 'auto' }}
                >
                  <div className={'nft_item_detail__description_content'}>
                    {nftItem.description.length > NFT_DESCRIPTION_MAX_LENGTH ? `${nftItem.description.slice(0, NFT_DESCRIPTION_MAX_LENGTH)}...` : nftItem.description}
                  </div>
                  <div className={'nft_item_detail__description_title'}>
                    <Icon
                      iconColor={token.colorIcon}
                      phosphorIcon={Info}
                      type='phosphor'
                      weight={'fill'}
                    />
                    <div>{t<string>('Description')}</div>
                  </div>
                </div>
              )
            }

            <Field
              content={collectionInfo.collectionName || collectionInfo.collectionId}
              label={t<string>('Collectible name')}
              suffix={nftItem.externalUrl && externalInfoIcon('collection')}
            />

            <Field
              content={ownerInfo()}
              label={t<string>('Owned by')}
              prefix={nftItem.owner && ownerPrefix()}
              suffix={externalInfoIcon('account')}
            />

            <Field
              content={originChainInfo.name}
              label={t<string>('Network')}
              prefix={originChainLogo()}
            />
          </div>

          <div className={'nft_item_detail__prop_section'}>
            <div className={'nft_item_detail__section_title'}>{t<string>('Properties')}</div>
            <div className={'nft_item_detail__atts_container'}>
              <Field
                className={'nft_item_detail__id_field'}
                content={nftItem.id}
                key={'Collectible ID'}
                label={'Collectible ID'}
                width={'fit-content'}
              />

              <Field
                className={'nft_item_detail__id_field'}
                content={nftItem.collectionId}
                key={'Collection ID'}
                label={'Collection ID'}
                width={'fit-content'}
              />

              {
                nftItem.properties && Object.entries(nftItem.properties).map(([attName, attValueObj], index) => {
                  const { value: attValue } = attValueObj as Record<string, string>;

                  return (
                    <Field
                      content={attValue.toString()}
                      key={index}
                      label={attName}
                      width={'fit-content'}
                    />
                  );
                })
              }
            </div>
          </div>
        </div>

        <SwModal
          className={CN('nft_item_detail__description_modal')}
          closeIcon={modalCloseButton}
          id={'nftItemDescription'}
          onCancel={onCloseNftDescriptionModal}
          title={t<string>('Description')}
          wrapClassName={className}
        >
          <div className={'nft_item_detail__description_modal_content'}>
            <div className={'nft_item_detail__description_modal_left_icon'}>
              <BackgroundIcon
                backgroundColor={getAlphaColor(token.colorLink, 0.1)}
                iconColor={token.colorLink}
                phosphorIcon={Info}
                size={'lg'}
                type='phosphor'
                weight={'fill'}
              />
            </div>
            <div className={'nft_item_detail_description_modal_container'}>
              <div className={'nft_item_detail__description_modal_title'}>{nftItem.name || nftItem.id}</div>
              <div className={'nft_item_detail__description_modal_detail'}>
                <pre>{nftItem.description}</pre>
              </div>
            </div>
          </div>
        </SwModal>
      </Layout.Base>
    </PageWrapper>
  );
}

const NftItemDetail = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    '.nft_item_detail__container': {
      marginTop: token.marginSM,
      paddingRight: token.margin,
      paddingLeft: token.margin,
      paddingBottom: token.margin
    },

    '.clickable': {
      cursor: 'pointer'
    },

    '.nft_item_detail__info_container': {
      display: 'flex',
      flexDirection: 'column',
      gap: token.marginXS,
      marginTop: token.margin,
      marginBottom: token.margin
    },

    '.nft_item_detail__atts_container': {
      marginTop: token.margin,
      display: 'flex',
      flexWrap: 'wrap',
      gap: token.marginXS,
      overflow: 'hidden'
    },

    '.ant-field-container': {
      overflow: 'hidden'
    },

    '.nft_item_detail__section_title': {
      fontSize: token.fontSizeLG,
      color: token.colorTextHeading,
      lineHeight: token.lineHeightLG
    },

    '.nft_item_detail__send_text': {
      fontSize: token.fontSizeLG,
      lineHeight: token.lineHeightLG,
      color: token.colorTextLight1
    },

    '.nft_item_detail__prop_section': {
      marginBottom: token.margin
    },

    '.nft_item_detail__owner_address': {
      color: token.colorTextDescription
    },

    '.nft_item_detail__external_icon': {
      cursor: 'pointer'
    },

    '.nft_item_detail__description_container': {
      padding: token.paddingSM,
      backgroundColor: token.colorBgSecondary,
      borderRadius: token.borderRadiusLG
    },

    '.nft_item_detail__description_content': {
      color: token.colorTextDescription,
      fontSize: token.fontSize,
      fontWeight: token.bodyFontWeight,
      lineHeight: token.lineHeight,
      wordBreak: 'break-all'
    },

    '.nft_item_detail__description_title': {
      marginTop: token.margin,
      display: 'flex',
      alignItems: 'center',
      gap: token.marginXXS,
      color: token.colorTextLabel,
      fontSize: token.fontSize,
      fontWeight: token.headingFontWeight,
      lineHeight: token.lineHeight
    },

    '.nft_item_detail__description_modal_content': {
      display: 'flex',
      gap: token.marginXS,
      padding: token.paddingSM,
      backgroundColor: token.colorBgSecondary,
      borderRadius: token.borderRadiusLG
    },

    '.nft_item_detail__description_modal_left_icon': {
      display: 'flex',
      alignItems: 'center'
    },

    '.nft_item_detail__description_modal_title': {
      textAlign: 'left',
      fontSize: token.fontSizeLG,
      lineHeight: token.lineHeightLG,
      fontWeight: token.bodyFontWeight,
      color: token.colorTextLight1,
      wordBreak: 'break-all'
    },

    '.nft_item_detail__description_modal_detail': {
      textAlign: 'justify',
      fontWeight: token.bodyFontWeight,
      fontSize: token.fontSizeHeading6,
      color: token.colorTextTertiary,
      wordBreak: 'break-word'
    },

    '.nft_item_detail__nft_image': {
      display: 'flex',
      justifyContent: 'center',
      width: 358,
      height: 358,

      '.ant-image-img': {
        maxWidth: '100%',
        objectFit: 'cover'
      }
    },

    '.nft_item_detail__id_field .ant-field-wrapper .ant-field-content-wrapper .ant-field-content': {
      overflow: 'scroll',
      textOverflow: 'initial'
    }
  });
});

export default NftItemDetail;
