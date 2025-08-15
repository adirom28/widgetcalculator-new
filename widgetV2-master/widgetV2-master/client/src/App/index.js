import React, {Fragment, lazy, Suspense} from 'react';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import {createMuiTheme, ThemeProvider, withStyles} from '@material-ui/core/styles';

import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import './style.css';
import AdminPage from "../AdminPage";
import ProtectedRoute, {RedirectRoute} from "../services/customeRoute";

const theme = createMuiTheme({
    overrides: {
        MuiInputBase: {
            root: {
                fontSize: '14px',
                lineHeight: '1em',
            },

            input: {
                height: '1em'
            }
        },
        MuiOutlinedInput: {
            input: {
                padding: '14px 14px'
            },
        },

        MuiFormControl: {
            root: {
                '& [class*="MuiInputLabel-outlined"]': {
                    transform: 'translate(14px, 16px) scale(1)',
                },

                '& [class*="MuiInputLabel-outlined"][class*="MuiInputLabel-shrink"]': {
                    transform: 'translate(14px, -6px) scale(0.75)',
                },
            }
        },

        MuiAutocomplete: {
            paper: {
                '& > ul': {
                    maxHeight: '176px',
                }
            },
            option: {
                minHeight: 32,
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 10,
                paddingRight: 10,
            },
            // root: {
            //     '& [class*="MuiInputLabel-outlined"]': {
            //         transform: 'translate(14px, 16px) scale(1)',
            //     },

            //     '& [class*="MuiInputLabel-outlined"][class*="MuiInputLabel-shrink"]': {
            //         transform: 'translate(14px, -6px) scale(0.75)',
            //     },
            // },
            inputRoot: {
                '&[class*="MuiOutlinedInput-root"]': {
                    '& $input': {
                        padding: '6px 4px',
                    },
                },
            },

        },
    },
    palette: {
        primary: {
            main: '#f29112'
        },
    },
    typography: {
        htmlFontSize: 18,
        // fontSize: 12,
        body1: {
            fontSize: '14px'
        }
    },
});


const GlobalCss = withStyles({
    '@global': {
        '.MuiOutlinedInput-root': {
            backgroundColor: '#fff'
        },
    },
})(() => null);

const Widget = lazy(() => import('../Widget'));
const BookingPage = lazy(() => import('../BookingPage'));
const ConfirmationPage = lazy(() => import('../BookingPage/ConfirmationPage'));
const AuthPage = lazy(() => import('../AdminPage/AuthPage'));
const ResetPassword = lazy(() => import('../AdminPage/AuthPage/ResetPassword'));
const ErrorPage = lazy(() => import('../ErrorPage'));


class AppDefaultContent extends React.Component {

    render() {
        return (
            <div className="forms-content-wrapper">
                <div className="form-wrapper">
                    <iframe id="iframe"
                            src="http://localhost:3000/widget?userId=61e2d95f8b09b36c8f4e9df1"
                            style={{height: "500px", width: "350px", border: "none"}}>
                    </iframe>
                </div>
            </div>
        );
    }

}

const inIframe = window.location !== window.parent.location;

export const IframeContext = React.createContext(inIframe);

export default function App() {

    return (
        <Fragment>
            <GlobalCss/>
            <ThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Router>
                        <Suspense fallback={<div></div>}>
                            <Switch>
                                <Route exact path="/" component={AppDefaultContent}/>
                                <ProtectedRoute path='/admin' component={AdminPage}/>
                                <Route path="/authPage" component={AuthPage}/>
                                <RedirectRoute pathname='/' path='/booking/:id' component={BookingPage}/>
                                <RedirectRoute pathname='/' path='/confirm' component={ConfirmationPage}/>
                                <Route path="/widget" component={Widget}/>
                                <Route path="/resetPassword/:token" component={ResetPassword}/>
                                <Route path="/error" component={ErrorPage}/>
                                <Redirect from="**" to="/"/>
                            </Switch>
                        </Suspense>

                    </Router>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </Fragment>
    );
}
