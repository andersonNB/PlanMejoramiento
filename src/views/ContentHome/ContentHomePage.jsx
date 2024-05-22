import PropTypes from 'prop-types';

const ContentHomePage = ({ children }) => {
	return <div>{children} </div>;
};

ContentHomePage.propTypes = {
	children: PropTypes.node.isRequired,
};


export default ContentHomePage;
