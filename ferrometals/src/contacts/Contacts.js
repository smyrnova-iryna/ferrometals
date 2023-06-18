import { useState, useRef  } from "react";
import "./contacts.css";
import emailjs from '@emailjs/browser';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contacts = ({data}) => {
    
    const fullPhoneNumber = "tel:" + data.header.phoneNumber;
    const fullEmail = "mailto:" + data.header.email;

    const [nameValue, setNameValue] = useState("");

    const [phoneNumberValue, setPhoneNumberValue] = useState("");

    const [emailValue, setEmailValue] = useState("");

    const [subjectValue, setSubjectValue] = useState("");

    const [messageValue, setMessageValue] = useState("");

    const [currentFormMessage, setCurrentFormMessage] = useState("");

    const textOnlyForbiddenSymbols = "1234567890~@#$%^&*{}:?><.,/*+-№=;";

    const phoneNumberSymbols = "1234567890+()";


    const textOnlyValidation = (inputValue, symbols) => {
        if (symbols.includes(inputValue[inputValue.length - 1])) {
            setNameValue(inputValue.slice(0, -1))
        } else {
            setNameValue(inputValue)
            }
    }

    const phoneNumberValidation = (inputValue, symbols) => {
        if (!symbols.includes(inputValue[inputValue.length - 1])) {
            setPhoneNumberValue(inputValue.slice(0, -1))
        } else {
            setPhoneNumberValue(inputValue)
            }
    }

    const setEmailInputValue = (value) => {
        setEmailValue(value)
    }

    const setSubjectInputValue = (value) => {
        setSubjectValue(value)
    }

    const setMessageInputValue = (value) => {
        setMessageValue(value)
    }

    const resetForm = () => {
        setNameValue("");
        setPhoneNumberValue("");
        setEmailValue("");
        setSubjectValue("");
        setMessageValue("")
    }

    const form = useRef();

    const sendEmail = (e) => {
        setCurrentFormMessage(data.contacts.feedback.loadingText);
        e.preventDefault();
        if (nameValue !== "" && (emailValue !== "" || phoneNumberValue !== "")) {
            emailjs.sendForm('service_j50xckc', 'template_knzuzjh', form.current, 'eXu1yPCc0paCDwe5f')
            .then((result) => {
                console.log(result);
                setTimeout(
                    () => setCurrentFormMessage(data.contacts.feedback.resultText), 
                    3000
                );
            }, (error) => {
                console.log(error.text);
                setCurrentFormMessage(data.contacts.feedback.errorText);
            });
            resetForm();
        }
        setTimeout(
            () => setCurrentFormMessage(""), 
            20000
          );
    };

    
    return (
        <article className='Contacts-Main-Container'>
                <div className='First-Page-Button-Container'>
                </div>
            <svg xmlns="http://www.w3.org/2000/svg" style={{fill:"url(#FirstDecorElementGradient)", position: "absolute", width: "100%", top: "0", right: "0", height: "100%"}}>
                <linearGradient id="FirstDecorElementGradient">
                <stop offset="50%" stopColor="rgba(48,48,49,255)" />
                <stop offset="90%" stopColor="rgba(48,48,49,0.6)" />
                </linearGradient>
                <polygon points="0,0 677.43861977438,0 377.27272727273,550.76310550763 0,550.76310550763" />
                Sorry, your browser does not support inline SVG.
            </svg> 
            <div className='Contacts-Inner-Container'>
                <div className="Contacts-inner-content-container">
                            <h4 className="Contacts-inner-container-heading">{data.contacts.address.heading}</h4>
                        <div className="Contacts-inner-content-container Contacts-Items-Container">
                            <div className="Contacts-text-container"><p className="Contacts-item">
                                <LocationOnIcon className='Contacts-item' />{data.contacts.address.text}</p></div>
                            <div><p className="Contacts-item"><a className="Contacts-item" href={fullPhoneNumber}>
                                        <CallIcon className='Contacts-item' />{data.header.phoneNumber}</a></p></div>
                            <div><p className="Contacts-item"><a className="Contacts-item" href={fullEmail}>
                                        <EmailIcon className='Contacts-item' />{data.header.email}</a></p></div>
                    </div>
                </div>
                <div className="Contacts-inner-content-container">
                            <h4 className="Contacts-inner-container-heading">{data.contacts.address.detailsHeading}</h4>
                            <p className="Contacts-inner-container-text">{data.contacts.address.details}</p>
                </div>
            </div>
            <svg style={{fill:"url(#SecondDecorElementGradient)", position: "absolute", width: "100%", top: "0", right: "0", height: "100%"}}>
                <linearGradient id="SecondDecorElementGradient">
                <stop offset="30%" stopColor="rgba(20,172,147,255)" />
                <stop offset="90%" stopColor="rgba(13,94,114,0.6)" />
                </linearGradient>
                <polygon points="0,0 473.65627073656,0 649.900464499,308.42733908427 512.2096881221,550.76310550763 0,550.76310550763" />
                Sorry, your browser does not support inline SVG.
            </svg>
            <svg style={{fill:"url(#ThirdDecorElementGradient)", position: "absolute", width: "100%", top: "0", right: "0", height: "100%"}}>
                <linearGradient id="ThirdDecorElementGradient">
                <stop offset="30%" stopColor="rgba(48,48,49,255)" />
                <stop offset="90%" stopColor="rgba(138,137,136,255)" />
                </linearGradient>
                <polygon points="0,523.22495023225 495.68679495687,523.22495023225 616.85467816855,749.03782349038 0,749.0378234903" />
                Sorry, your browser does not support inline SVG.
            </svg>
            <div className="Contacts-feedback-form-main-container">
            <div className="Contacts-feedback-form-container">
                <h4 className="Contacts-container-heading">{data.contacts.feedback.heading}</h4>
                <p className="Contacts-container-description">{data.contacts.feedback.description}</p>
                <form className="Contacts-feedback-form-input-container" ref={form}>
                    <div className="Contacts-feedback-form-input-container-without-text-form-input">
                        <input  name="user_name" onChange={event => {textOnlyValidation(event.target.value, textOnlyForbiddenSymbols)}} value={nameValue} className="Contacts-feedback-form-input" placeholder={data.contacts.feedback.nameInputText}></input>
                        <input name="user_phone_number" onChange={event => {phoneNumberValidation(event.target.value, phoneNumberSymbols)}} value={phoneNumberValue} className="Contacts-feedback-form-input" placeholder={data.contacts.feedback.phoneInputText}></input>
                    </div>
                    <div className="Contacts-feedback-form-input-container-without-text-form-input">
                        <input value={emailValue} onChange={event => {setEmailInputValue(event.target.value)}} name="user_email" 
                        className="Contacts-feedback-form-input" placeholder={data.contacts.feedback.emailInputText}></input>
                        <input value={subjectValue} onChange={event => {setSubjectInputValue(event.target.value)}} name="user_subject" 
                        className="Contacts-feedback-form-input" placeholder={data.contacts.feedback.subjectInputText}></input>
                    </div>
                    <textarea value={messageValue} onChange={event => {setMessageInputValue(event.target.value)}} name="user_message" className="Contacts-feedback-form-text-input" placeholder={data.contacts.feedback.messageInputText}></textarea>
                </form>
                <p>{data.contacts.feedback.bottomText}</p>
                <button className="Contacts-feedback-form-button" onClick={sendEmail}>{data.contacts.feedback.buttonText}</button>
                <p>{currentFormMessage}</p>
            </div>
            </div>
            </article>
        // 
            
        // </section>
    )
}

export default Contacts;