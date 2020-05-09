import React, { useEffect, useState } from 'react';
import ReviewAdBlock from '../../../components/admin/ReviewAdBlock';
import SendMessageModal from '../../../components/common/SendMessageModal';
import { connect } from "react-redux";
import { actions } from '../../../store';
import { Loader, Message } from 'semantic-ui-react';
import API from '../../../utils/API';

const AdminAds = ({ 
    getNotApprovedAds,
    notApprovedAds,
    isLoadNotApprovedAds,
    adsCategories,
    setModalPhoto
}) => {
    
    const [rejectAdId, setRejectAdId] = useState(null);

    useEffect(() => {
        getNotApprovedAds();
    }, [])

    const onApproveAd = (e, { adId, choosedTypeAd, choosedCategory }) => {
        
        const title = e.target.title.value;
        const description = e.target.description.value;
        const address = e.target.address.value;
        if(!title.length || !description.length || !address.length) return;        
        API.put('/admin/approve-ad', {
            id: adId,
            typeId: choosedTypeAd,
            title, 
            description,
            address,
            categoryId: choosedCategory,
        })
        .then(() => {
            getNotApprovedAds();
        })
    }

    const onRejectAd = (adId) => {
        setRejectAdId(adId);
    }

    const submitReject = message => {
        API({
            url: `/admin/reject-ad/${rejectAdId}`,
            method: 'delete',
            data: { message }
        })
        .then(() => {
            setRejectAdId(null);
            getNotApprovedAds();
        })
    }

    const onCloseRejectModal = () => {
        setRejectAdId(null);
    }

    return (
        <>
            <div className='wrap-not-approved-ads'>
                {!notApprovedAds.length && (
                    <Message header='Ads does not exists' />
                )}
                <Loader active={isLoadNotApprovedAds} size='massive'>Loading</Loader>
                {notApprovedAds.map(ad => {
                    return (
                        <ReviewAdBlock 
                            key={ad._id}
                            adId={ad._id}
                            onApprove={onApproveAd}
                            onReject={onRejectAd}
                            typeAd={ad.typeId}
                            title={ad.title}
                            description={ad.description}
                            photos={ad.photos}
                            setModalPhoto={setModalPhoto}
                            location={ad.location}
                            adsCategories={adsCategories}
                            categoryId={ad.categoryId}
                            lostOrFoundAt={ad.lostOrFoundAt}
                            user={ad.user}
                            createdAt={ad.createdAt}
                            actualTo={ad.actualTo}
                        />
                    )
                })}
            </div>
            <SendMessageModal
                isOpen={!!rejectAdId} 
                headerText='Rejection reason'
                subheaderText='Enter message and it will be automatically sent to the user'
                onSend={submitReject}
                onClose={onCloseRejectModal}
            />
        </>
    )
}

const mapStateToProps = store => ({
    notApprovedAds: store.admin.notApprovedAds,
    isLoadNotApprovedAds: store.admin.isLoadNotApprovedAds,
    adsCategories: store.app.adsCategories,
});

const mapDispatchToProps = dispatch => ({
    getNotApprovedAds: () => dispatch(actions.admin.getNotApprovedAds()),
    setModalPhoto: (photo) => dispatch(actions.app.setModalPhoto(photo))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAds);