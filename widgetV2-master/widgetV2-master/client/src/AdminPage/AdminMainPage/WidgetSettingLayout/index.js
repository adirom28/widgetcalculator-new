import React, {useEffect, useRef, useState} from "react";
import AdminDefaultLayout from "../../AdminDefaultLayout";
import {useStyles} from "../EmailSettingLayout/index";

import "./style.css";

import Example from "../../../assets/img/widgetSettings/instruction1.png";
import Screen1 from "../../../assets/img/widgetSettings/screenWix1.png";
import Screen2 from "../../../assets/img/widgetSettings/screenWix2.png";
import Screen3 from "../../../assets/img/widgetSettings/screenWix3.png";
import Screen4 from "../../../assets/img/widgetSettings/screenWix4.png";
import Screen5 from "../../../assets/img/widgetSettings/screenWix5.png";
import Screen6 from "../../../assets/img/widgetSettings/screenWix6.png";
import Screen7 from "../../../assets/img/widgetSettings/screenWix7.png";
import Square1 from "../../../assets/img/widgetSettings/square.png";
import Square2 from "../../../assets/img/widgetSettings/square2.png";
import Square3 from "../../../assets/img/widgetSettings/square3.png";
import ScreenIcon from "../../../assets/img/widgetSettings/iconScreen.png";

import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const WidgetSettingLayout = () => {
    const classes = useStyles();
    const textAreaFrame = useRef();
    const textAreaScript = useRef();

    const textAreaWixFrame = useRef();
    const textAreaWixScript = useRef();

    const textAreaSquareSpaceFrame = useRef();
    const textAreaSquareSpaceScript = useRef();

    const textAreaGodaddyFrame = useRef();
    const textAreaGodaddyScript = useRef();

    const textAreaSquareFrame = useRef();
    const textAreaSquareScript = useRef();

    const textAreaWeeblyFrame = useRef();
    const textAreaWeeblyScript = useRef();

    const textAreaWordPressFrame = useRef();
    const textAreaWordPressScript = useRef();

    const textAreaAngularFrame = useRef();
    const textAreaAngularScript = useRef();

    const textAreaReactFrame = useRef();
    const textAreaReactScript = useRef();

    const [copied, setCopied] = useState("");

    const userID = localStorage.getItem('userID');


    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied("");
            }, 3000);
        }

    }, [copied]);

    const frameText =
        "<iframe id=\"iframe\"\n" +
        "            src='https://widget.allcarstransport.com/widget?userId=" + userID + "\' " +
        "            style=\"height: 400px; width: 350px;border: none\">\n" +
        "\n" +
        "</iframe>";


    const scriptText =
        "<script>\n" +
        "    window.addEventListener('message', function (event) {\n" +
        "        if (event.data.queryString) {\n" +
        "           window.location.assign = 'https://widget.allcarstransport.com?' + event.data.queryString\n" +
        "        }" +
        "    })\n" +
        "</script>";

    const scriptWix =

        "    $w.onReady(function () {\n" +
        "        $w('#frame').onMassage(event => {\n" +
        "           wixLocation.to('https://widget.allcarstransport.com?' + event.data.queryString\n)" +
        "        })" +
        "    })\n";


    const helperText = "</body>";


    const copyCodeToClipboard = (refElem, value) => {
        refElem.current.select();
        document.execCommand("copy");
        setCopied(value);

    }

    return (
        <section className={classes.mainWrap}>
            <div className="widget-settings-container">
                <h4 className="main-title">Widget script instruction</h4>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>You have a static website (SimpleHtml page)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="wrap-block-instruction">
                            <div className="wrap-block-script">
                                <div className="wrap-detail">
                                    <div className={classes.instructionDetails}>
                                        <div className="count">1</div>
                                        <div className="instruction">
                                            The first step you need to copy the iframe code and paste it into your HTML
                                            file of your web page, where you want to display the app.
                                        </div>
                                    </div>
                                    <textarea
                                        ref={textAreaFrame}
                                        readOnly
                                        className="block-description"
                                        value={frameText}
                                        rows={5}>
                    </textarea>
                                    <div className="wrap-button">
                                        <button
                                            onClick={() => {
                                                copyCodeToClipboard(textAreaFrame, "1")
                                            }}
                                            className={classes.button}>
                                            Copy iframe code
                                        </button>
                                        {
                                            copied === "1" ?
                                                <div className="success-message">Copied!</div> : null
                                        }
                                    </div>
                                </div>

                                <div className="wrap-detail">
                                    <div className={classes.instructionDetails}>
                                        <div className="count">2</div>
                                        <div className="instruction">
                                            The second step is to copy the script code and paste it into the main HTML
                                            file at the bottom
                                            of the file, just before this tag {helperText}.
                                        </div>
                                    </div>
                                    <textarea
                                        ref={textAreaScript}
                                        readOnly
                                        className="block-description"
                                        value={scriptText}
                                        rows={8}>
                    </textarea>
                                    <div className="wrap-button">
                                        <button
                                            onClick={() => {
                                                copyCodeToClipboard(textAreaScript, "2")
                                            }}
                                            className={classes.button}>
                                            Copy script code
                                        </button>
                                        {
                                            copied === "2" ?
                                                <div className="success-message">Copied!</div> : null
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="wrap-block-example">
                                <h6 className="subTittle">Example HTML page</h6>
                                <img className="img-example" src={Example} alt="example"/>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Your website was created using Wix</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="wrap-block-instruction">
                            <div className="wrap-block-script">
                                <div className="wrap-detail-other">
                                    <div>
                                        <ul className="instruction">
                                            <li className={classes.instructionDetails}>
                                                <div className="count">1</div>
                                                Go to the dashboard.
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">2</div>
                                                Click the "Edit Site" button
                                            </li>
                                            <div className="wrap-img">
                                                <img src={Screen1} alt="example"/>
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">3</div>
                                                Choose option "Dev Mode" and click the "Turn on Dev Mode" button
                                            </li>
                                            <div className="wrap-img">
                                                <img src={Screen2} alt="example"/>
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">4</div>
                                                Choose tab "Page code"
                                            </li>
                                            <div className="wrap-img">
                                                <img src={Screen3} alt="example"/>
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">5</div>
                                                Click the "Add" button
                                            </li>
                                            <div className="wrap-img">
                                                <img src={Screen4} alt="example"/>
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">6</div>
                                                Select the page where you want to place the iframe and copy the
                                                "Copy
                                                iframe code" bellow and paste it
                                            </li>

                                            <textarea
                                                ref={textAreaWixFrame}
                                                readOnly
                                                className="block-description"
                                                value={frameText}
                                                rows={5}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaWixFrame, "3")
                                                    }}
                                                    className={classes.button}>
                                                    Copy iframe code
                                                </button>
                                                {
                                                    copied === "3" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">7</div>
                                                Rename the HTML ID you see above the frame on "frame"
                                            </li>
                                            <div className="wrap-img">
                                                <img src={Screen7} alt="screenShot"/>
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">8</div>
                                                Click the button "Add to Site" and choose "embed a site"
                                            </li>
                                            <div className="wrap-img">
                                                <img src={Screen5} alt="screenShot"/>
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">9</div>
                                                Choose "Code"
                                            </li>
                                            <div className="wrap-img">
                                                <img src={Screen6} alt="screenShot"/>
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">10</div>
                                                Copy "Copy script code" and paste it
                                            </li>
                                        </ul>
                                    </div>

                                    <textarea
                                        ref={textAreaWixScript}
                                        readOnly
                                        className="block-description"
                                        value={scriptWix}
                                        rows={8}>
                    </textarea>
                                    <div className="wrap-button">
                                        <button
                                            onClick={() => {
                                                copyCodeToClipboard(textAreaWixScript, "4")
                                            }}
                                            className={classes.button}>
                                            Copy script code
                                        </button>
                                        {
                                            copied === "4" ?
                                                <div className="success-message">Copied!</div> : null
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Your website was created using SquareSpace</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="wrap-block-instruction">
                            <div className="wrap-block-script">
                                <div className="wrap-detail-other">
                                    <div>
                                        <ul className="instruction">
                                            <li className={classes.instructionDetails}>
                                                <div className="count">1</div>
                                                In the Home menu, click Settings, click Advanced, then click Code
                                                Injection.
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">2</div>
                                                Copy the "Copy script code" bellow and add into the appropriate Code
                                                Injection fields for footer
                                            </li>

                                            <textarea
                                                ref={textAreaSquareSpaceScript}
                                                readOnly
                                                className="block-description"
                                                value={scriptText}
                                                rows={8}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaSquareSpaceScript, "6")
                                                    }}
                                                    className={classes.button}>
                                                    Copy script code
                                                </button>
                                                {
                                                    copied === "6" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }

                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">3</div>
                                                After editing your code, click <span className="bold-text">Save</span>
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">4</div>
                                                Hover over the page in the <span
                                                className="bold-text">Pages</span> panel
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">5</div>
                                                Click the icon <img className="img-icon" src={ScreenIcon} alt="icon"/>
                                            </li>

                                            <li className={classes.instructionDetails}>
                                                <div className="count">6</div>
                                                Click <span className="bold-text">Advanced</span>
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">7</div>
                                                Copy the "Copy iframe code" bellow and paste it Page Header Code
                                                Injection (adds code to the top of that page) or Post Blog Item Code
                                                Injection (appears below the content)
                                            </li>
                                            <textarea
                                                ref={textAreaSquareSpaceFrame}
                                                readOnly
                                                className="block-description"
                                                value={frameText}
                                                rows={5}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaSquareSpaceFrame, "5")
                                                    }}
                                                    className={classes.button}>
                                                    Copy iframe code
                                                </button>
                                                {
                                                    copied === "5" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }
                                            </div>


                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Your website was created using Square</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="wrap-block-instruction">
                            <div className="wrap-block-script">
                                <div className="wrap-detail-other">
                                    <div>
                                        <ul className="instruction">
                                            <li className={classes.instructionDetails}>
                                                <div className="count">1</div>
                                                Go to the dashboard.
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">2</div>
                                                Click the "Add section" and "Add" button
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">3</div>
                                                Choose option "Embed code"
                                            </li>
                                            <div className="wrap-img">
                                                <img src={Square1} alt="example"/>
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">4</div>
                                                Click the "Copy iframe code" bellow and code into the embed code section
                                            </li>
                                            <div className="wrap-img">
                                                <img src={Square2} alt="example"/>
                                            </div>

                                            <textarea
                                                ref={textAreaSquareFrame}
                                                readOnly
                                                className="block-description"
                                                value={frameText}
                                                rows={5}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaSquareFrame, "9")
                                                    }}
                                                    className={classes.button}>
                                                    Copy iframe code
                                                </button>
                                                {
                                                    copied === "9" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }
                                            </div>

                                            <li className={classes.instructionDetails}>
                                                <div className="count">5</div>
                                                Publish your website to make the changes go live.
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">6</div>
                                                In your Square Online Overview page, go to Settings > Tracking Tools
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">7</div>
                                                Select Add new code
                                            </li>

                                            <li className={classes.instructionDetails}>
                                                <div className="count">8</div>
                                                In the popup window, enter in the code's name and the code itself into
                                                the corresponding fields.
                                            </li>
                                            <div className="wrap-img">
                                                <img src={Square3} alt="example"/>
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">9</div>
                                                Click the "Copy iframe code" bellow and place the code in the footer,
                                                select End of body.
                                            </li>
                                            <textarea
                                                ref={textAreaSquareScript}
                                                readOnly
                                                className="block-description"
                                                value={scriptWix}
                                                rows={8}>
                    </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaSquareScript, "10")
                                                    }}
                                                    className={classes.button}>
                                                    Copy script code
                                                </button>
                                                {
                                                    copied === "10" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }

                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">10</div>
                                                Select Save when finished
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">11</div>
                                                Publish your site from the Square Online site editor to see the changes
                                                live.
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">12</div>
                                                Note: Unless you've been instructed to do so, it's okay to leave these
                                                fields blank. Never use them for keywords or generic text, as doing so
                                                could have an adverse effect on your website.
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Your website was created using Godaddy</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="wrap-block-instruction">
                            <div className="wrap-block-script">
                                <div className="wrap-detail-other">
                                    <div>
                                        <ul className="instruction">
                                            <li className={classes.instructionDetails}>
                                                <div className="count">1</div>
                                                Go to the GoDaddy product page
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">2</div>
                                                Scroll to Websites + Marketing and click Manage next to your website to
                                                open it
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">3</div>
                                                Select Edit Website or Edit Website to open Website Designer
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">4</div>
                                                On the page, go to the location where you want to add the special code,
                                                and add a section
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">5</div>
                                                Find the HTML section and click Add
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">6</div>
                                                Copy the "Copy iframe code" and bellow and add into the Custom code
                                                field.
                                            </li>
                                            <textarea
                                                ref={textAreaGodaddyFrame}
                                                readOnly
                                                className="block-description"
                                                value={frameText}
                                                rows={5}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaGodaddyFrame, "7")
                                                    }}
                                                    className={classes.button}>
                                                    Copy iframe code
                                                </button>
                                                {
                                                    copied === "7" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }
                                            </div>
                                            <textarea
                                                ref={textAreaGodaddyScript}
                                                readOnly
                                                className="block-description"
                                                value={scriptText}
                                                rows={8}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaGodaddyScript, "8")
                                                    }}
                                                    className={classes.button}>
                                                    Copy script code
                                                </button>
                                                {
                                                    copied === "8" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }

                                            </div>

                                            <li className={classes.instructionDetails}>
                                                <div className="count">7</div>
                                                Adjust other section settings, such as accent color, title, center
                                                alignment, and height. Leave the Set height field blank to automatically
                                                set the height
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">8</div>
                                                Changes are saved automatically. When you're ready to make the changes
                                                public, publish the site
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Your website was created using Weebly</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="wrap-block-instruction">
                            <div className="wrap-block-script">
                                <div className="wrap-detail-other">
                                    <div>
                                        <ul className="instruction">
                                            <li className={classes.instructionDetails}>
                                                <div className="count">1</div>
                                                Go to the Weebly product page
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">2</div>
                                                Click the Page button on the panel
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">3</div>
                                                Copy the "Copy iframe code" and bellow and add into the Header code
                                            </li>
                                            <textarea
                                                ref={textAreaWeeblyFrame}
                                                readOnly
                                                className="block-description"
                                                value={frameText}
                                                rows={5}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaWeeblyFrame, "9")
                                                    }}
                                                    className={classes.button}>
                                                    Copy iframe code
                                                </button>
                                                {
                                                    copied === "9" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">4</div>
                                                Click the Save Settings button
                                            </li>

                                            <li className={classes.instructionDetails}>
                                                <div className="count">5</div>
                                                Click the Settings button on the panel, and choose SEO
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">6</div>
                                                Copy the "Copy script code" and bellow and add into the Footer code
                                            </li>
                                            <textarea
                                                ref={textAreaWeeblyScript}
                                                readOnly
                                                className="block-description"
                                                value={scriptText}
                                                rows={8}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaWeeblyScript, "10")
                                                    }}
                                                    className={classes.button}>
                                                    Copy script code
                                                </button>
                                                {
                                                    copied === "10" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }

                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">7</div>
                                                Click the Save and Publish button
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Your website was created using WordPress</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="wrap-block-instruction">
                            <div className="wrap-block-script">
                                <div className="wrap-detail-other">
                                    <div>
                                        <ul className="instruction">
                                            <li className={classes.instructionDetails}>
                                                <div className="count">1</div>
                                                Go to the Dashboard > Pages > Add new
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">2</div>
                                                Write title and click the Text button
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">3</div>
                                                Copy the "Copy iframe code" and bellow and add into the textarea
                                            </li>
                                            <textarea
                                                ref={textAreaWordPressFrame}
                                                readOnly
                                                className="block-description"
                                                value={frameText}
                                                rows={5}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaWordPressFrame, "11")
                                                    }}
                                                    className={classes.button}>
                                                    Copy iframe code
                                                </button>
                                                {
                                                    copied === "11" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">4</div>
                                                Click the Publish button
                                            </li>

                                            <li className={classes.instructionDetails}>
                                                <div className="count">5</div>
                                                Go to the Dashboard > Plugins > Add new
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">6</div>
                                                In the search field on the right write "simple custom css and JS", click
                                                the Install Now button and Active
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">7</div>
                                                In the dashboard panel click Custom CSS and JS > Add Custom JS
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">8</div>
                                                Copy the "Copy script code" and bellow and add into the field
                                            </li>
                                            <textarea
                                                ref={textAreaWordPressScript}
                                                readOnly
                                                className="block-description"
                                                value={scriptText}
                                                rows={8}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaWordPressScript, "12")
                                                    }}
                                                    className={classes.button}>
                                                    Copy script code
                                                </button>
                                                {
                                                    copied === "12" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }

                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">9</div>
                                                Click the Save and Publish button
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Your website was created using Angular</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="wrap-block-instruction">
                            <div className="wrap-block-script">
                                <div className="wrap-detail-other">
                                    <div>
                                        <ul className="instruction">
                                            <li className={classes.instructionDetails}>
                                                <div className="count">1</div>
                                                Open your project, select the component where you want to place the
                                                frame
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">2</div>
                                                Copy the "Copy iframe code" and bellow and add into the HTML file
                                            </li>
                                            <textarea
                                                ref={textAreaAngularFrame}
                                                readOnly
                                                className="block-description"
                                                value={frameText}
                                                rows={5}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaAngularFrame, "13")
                                                    }}
                                                    className={classes.button}>
                                                    Copy iframe code
                                                </button>
                                                {
                                                    copied === "13" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">3</div>
                                                Open the index.html
                                            </li>

                                            <li className={classes.instructionDetails}>
                                                <div className="count">4</div>
                                                Copy "Copy script code" and below and paste it before the closing body
                                                tag
                                            </li>

                                            <textarea
                                                ref={textAreaAngularScript}
                                                readOnly
                                                className="block-description"
                                                value={scriptText}
                                                rows={8}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaAngularScript, "14")
                                                    }}
                                                    className={classes.button}>
                                                    Copy script code
                                                </button>
                                                {
                                                    copied === "14" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }

                                            </div>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Your website was created using React</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="wrap-block-instruction">
                            <div className="wrap-block-script">
                                <div className="wrap-detail-other">
                                    <div>
                                        <ul className="instruction">
                                            <li className={classes.instructionDetails}>
                                                <div className="count">1</div>
                                                Open your project, select the component where you want to place the
                                                frame
                                            </li>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">2</div>
                                                Copy the "Copy iframe code" and bellow and add into the JS file
                                            </li>
                                            <textarea
                                                ref={textAreaReactFrame}
                                                readOnly
                                                className="block-description"
                                                value={frameText}
                                                rows={5}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaReactFrame, "15")
                                                    }}
                                                    className={classes.button}>
                                                    Copy iframe code
                                                </button>
                                                {
                                                    copied === "15" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }
                                            </div>
                                            <li className={classes.instructionDetails}>
                                                <div className="count">3</div>
                                                Open the public folder > index.html
                                            </li>

                                            <li className={classes.instructionDetails}>
                                                <div className="count">4</div>
                                                Copy "Copy script code" and below and paste it before the closing body
                                                tag
                                            </li>

                                            <textarea
                                                ref={textAreaAngularScript}
                                                readOnly
                                                className="block-description"
                                                value={scriptText}
                                                rows={8}>
                                            </textarea>
                                            <div className="wrap-button">
                                                <button
                                                    onClick={() => {
                                                        copyCodeToClipboard(textAreaAngularScript, "14")
                                                    }}
                                                    className={classes.button}>
                                                    Copy script code
                                                </button>
                                                {
                                                    copied === "14" ?
                                                        <div className="success-message">Copied!</div> : null
                                                }

                                            </div>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </AccordionDetails>
                </Accordion>

                <div className="block-preview">
                    <h6 className="subTittle">Widget preview</h6>
                    <div className="preview">
                        <iframe
                            title="widget"
                            id="frame"
                            src="https://widget.allcarstransport.com/widget">
                        </iframe>
                    </div>
                </div>

            </div>
            <AdminDefaultLayout/>

        </section>
    )
}

export default WidgetSettingLayout;
