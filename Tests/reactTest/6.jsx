/**
 * Home and Login component wil be rendered on the "/login" path because in the path "/login" there also exists "/" which matches the root path of the router where Home component is rendered. So it renders the Home component first then keep going searching for any other path match, "/login" path gets matched then it renders Login component and returns
 */
