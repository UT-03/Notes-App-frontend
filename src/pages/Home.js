import React from 'react';
import Header from '../components/Header';
import Notes from '../components/Notes';

const Home = (props) => {
    return (
        // <div>Home</div>
        <React.Fragment>
            <Header />
            <Notes />
        </React.Fragment>
    );
};

export default Home;