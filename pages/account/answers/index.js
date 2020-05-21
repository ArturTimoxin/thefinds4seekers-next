import React, { useEffect } from 'react';
import UserMenu from '../../../components/common/UserMenu';
import { Header } from 'semantic-ui-react';
import AnswersAcordeon from '../../../components/account/AnswersAcordeon';
import { connect } from "react-redux";
import { actions } from '../../../store';

const Answers = ({ getAnswers, answers, isLoadAnswers }) => {

    useEffect(() => {
        getAnswers();
    }, []);

    return (
        <UserMenu>
            <Header as='h1'>Answers on your secret questions</Header>
            <AnswersAcordeon 
                answers={answers}
                isLoad={isLoadAnswers}
                getAnswers={getAnswers}
            />
        </UserMenu>
    )
}


const mapStateToProps = store => ({
    answers: store.account.answers,
    isLoadAnswers: store.account.isLoadAnswers,
});

const mapDispatchToProps = dispatch => ({
    getAnswers: () => dispatch(actions.account.getAnswers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);