import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions } from "../store";
import MapMainPage from "../components/main/MapMainPage";
import NewAdCard from "../components/main/NewAdCard";
import getFormatedDate from "../utils/getFormatedDate";
import Link from "next/link";

const HomePage = ({ getAdsPoints, adsPoints, newAds }) => {
  useEffect(() => {
    getAdsPoints();
  }, []);

  return (
    <div className="wrap-main-page">
      <MapMainPage adsPoints={adsPoints} />
      <div className="wrap-new-ads">
        <h2 className="new-ads-title">NEW ADS</h2>
        <div className="new-ads-cards">
          {newAds.map((newAd) => (
            <NewAdCard
              key={newAd._id}
              adId={newAd._id}
              photo={newAd.photo}
              title={newAd.title}
              address={newAd.address}
              typeAd={newAd.typeId}
              createdAt={getFormatedDate(newAd.createdAt)}
              categoryName={newAd.categoryName}
            />
          ))}
          <div className="empty-block-new-ad" />
          <div className="empty-block-new-ad" />
          <div className="empty-block-new-ad" />
        </div>
        <div className="wrap-show-more-link">
          <Link href="/list" passHref>
            <a className="show-more-link">Show more {">"}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

HomePage.getInitialProps = async ({ store }) => {
  await store.dispatch(actions.main.getNewAds());
  return store.getState().main;
};

const mapStateToProps = (store) => ({
  adsPoints: store.main.adsPoints,
  newAds: store.main.newAds,
});

const mapDispatchToProps = (dispatch) => ({
  getAdsPoints: () => dispatch(actions.main.getAdsPoints()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
