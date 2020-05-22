import React, { useEffect } from 'react'
import { actions } from '../../../store';
import { connect } from "react-redux";
import { Loader } from 'semantic-ui-react';
import Router from 'next/router';
import RegisterPointMap from '../../../components/common/Map/RegisterPointMap';
import { initialEditAdData } from '../../../store/account/reducer';
import RegisterAdForm from '../../../components/register-ad/RegisterAdForm';
import InfoModal from '../../../components/common/InfoModal';

const EditAd = ({ 
    getEditAdData, 
    query, 
    editAdData, 
    isLoadEditAdData,
    userData,
    editAdErrorMessage,
    editAdChangePoint,
    editAdChangeAddress,
    editAdSetErrorMessage,
    setEditAdData,
    onSumbitEditAd,
    editAdChangeTitle,
    editAdChangeDescription,
    editAdChangeSecretQuestion,
    editAdChangeSecretAnswer,
    editAdChangeTypeId,
    editAdChangeCategoryId,
    editAdChangeLostOrFoundAt,
    adsCategories,
    isLoadSubmitEditAd,
    infoModalMessageEditAd,
    editAdSetInfoModalMessage,
}) => {

    useEffect(() => {
        if(!query || !query.id) {
            Router.push('/');
            return;
        }
        getEditAdData(query.id);

        return () => {
            setEditAdData(initialEditAdData);
        }
    }, [])

    const onCloseInfoModal = () => {
        editAdSetInfoModalMessage('');
        setEditAdData(initialEditAdData);
        Router.push('/account');
    }

    if(isLoadEditAdData) {
        return (
            <Loader active size='massive'/>
        )
    }

    const { 
        typeId, title, description, location: { lat, lng, address }, 
        photos, lostOrFoundAt, categoryId, secretQuestion, secretAnswer, 
    } = editAdData;

    return (
        <div className='wrap-register-ad-page'>
            {!!lat && !!lng && (
                <RegisterPointMap 
                    point={{ lat, lng }}
                    setErrMessage={editAdSetErrorMessage}
                    setPoint={editAdChangePoint}
                    setAddress={editAdChangeAddress}
                    typeAd={typeId}
                    defaultCenter={{ lat, lng }}
                    defaultZoom={15}
                />
                )
            }
            <RegisterAdForm 
                onSubmitForm={onSumbitEditAd}
                titleAdForm='Edit Ad'
                userData={userData}
                title={title}
                setTitle={editAdChangeTitle}
                description={description}
                setDescription={editAdChangeDescription}
                secretQuestion={secretQuestion}
                setSecretQuestion={editAdChangeSecretQuestion}
                secretAnswer={secretAnswer}
                setSecretAnswer={editAdChangeSecretAnswer}
                address={address}
                setAddress={editAdChangeAddress}
                typeAd={typeId}
                setTypeAd={editAdChangeTypeId}
                categoryOptions={adsCategories}
                categoryId={categoryId}
                onChooseCategory={editAdChangeCategoryId}
                lostOrFoundAt={new Date(lostOrFoundAt)}
                setLostOrFoundAt={editAdChangeLostOrFoundAt}
                errMessage={editAdErrorMessage}
                setErrMessage={editAdSetErrorMessage}
                isLoadSubmitForm={isLoadSubmitEditAd}
                photos={photos}
                subInfoText={'* After the edit ad, we will check it. For a while, the ad will not be available for viewing other users of our service.'}
                point={{ lat, lng }}
            />
            <InfoModal 
                onClose={onCloseInfoModal}
                headerText='Changes of your ad were sent to us for review'
                infoText={infoModalMessageEditAd}
            />
        </div>
    )
}

EditAd.getInitialProps = ({ query }) => {
    return { query }
}

const mapStateToProps = store => ({
    editAdData: store.account.editAdData,
    isLoadEditAdData: store.account.isLoadEditAdData,
    userData: store.app.userData,
    editAdErrorMessage: store.account.editAdErrorMessage,
    adsCategories: store.app.adsCategories,
    isLoadSubmitEditAd: store.account.isLoadSubmitEditAd,
    infoModalMessageEditAd: store.account.infoModalMessageEditAd,
})

const mapDispatchToProps = dispatch => {
  return {
    getEditAdData: (adId) => dispatch(actions.account.getEditAdData(adId)), 
    editAdChangePoint: ({ lat, lng }) => dispatch(actions.account.editAdChangePoint({ lat, lng })),
    editAdChangeAddress: address => dispatch(actions.account.editAdChangeAddress(address)),
    editAdSetErrorMessage: editAdErrorMessage => dispatch(actions.account.editAdSetErrorMessage(editAdErrorMessage)),
    setEditAdData: (editAdData) => dispatch(actions.account.setEditAdData(editAdData)),
    onSumbitEditAd: event => dispatch(actions.account.onSumbitEditAd(event)),
    editAdChangeTitle: title => dispatch(actions.account.editAdChangeTitle(title)),
    editAdChangeDescription: description => dispatch(actions.account.editAdChangeDescription(description)),
    editAdChangeSecretQuestion: secretQuestion => dispatch(actions.account.editAdChangeSecretQuestion(secretQuestion)),
    editAdChangeSecretAnswer: secretAnswer => dispatch(actions.account.editAdChangeSecretAnswer(secretAnswer)),
    editAdChangeTypeId: typeId => dispatch(actions.account.editAdChangeTypeId(typeId)),
    editAdChangeCategoryId: categoryId => dispatch(actions.account.editAdChangeCategoryId(categoryId)),
    editAdChangeLostOrFoundAt: lostOrFoundAt => dispatch(actions.account.editAdChangeLostOrFoundAt(lostOrFoundAt)),
    editAdSetInfoModalMessage: infoModalMessageEditAd => dispatch(actions.account.editAdSetInfoModalMessage(infoModalMessageEditAd)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAd);
