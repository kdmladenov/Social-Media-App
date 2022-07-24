import { createContext, useContext, useState } from 'react';
import AccordionType, {
  AccordionBodyType,
  AccordionButtonGroupType,
  AccordionHeaderType,
  AccordionItemType,
  AccordionTitleType,
  ToggleContextType
} from '../types/components/AccordionProps';
import './styles/Accordion.css';
import Tooltip from './Tooltip';

const ToggleContext = createContext<ToggleContextType>({ toggleShow: false });

const Accordion: AccordionType = ({ children }) => {
  return <ul className="accordion">{children}</ul>;
};

const Item: AccordionItemType = ({ children, isOpen = false }) => {
  const [toggleShow, setToggleShow] = useState<boolean>(isOpen);

  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <li className={`accordion_item ${toggleShow ? 'show' : ''}`}>{children}</li>
    </ToggleContext.Provider>
  );
};

const Header: AccordionHeaderType = ({ children }) => {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);

  return (
    <div
      className={`accordion_header ${toggleShow ? 'show' : ''}`}
      onClick={() => setToggleShow(!toggleShow)}
    >
      {children}
    </div>
  );
};

const Body: AccordionBodyType = ({ children }) => {
  const { toggleShow } = useContext(ToggleContext);

  return <div className={`accordion_body ${toggleShow ? 'show' : ''}`}>{children}</div>;
};

const Title: AccordionTitleType = ({ children }) => {
  return <div className="accordion_title">{children}</div>;
};

const ButtonGroup: AccordionButtonGroupType = ({ children }) => {
  const { toggleShow } = useContext(ToggleContext);
  return (
    <div className="accordion_button_group">
      {children ? (
        children
      ) : (
        <Tooltip direction="top" text={`${!toggleShow ? 'Open' : 'Close'}`}>
          <i className={`fa fa-chevron-${!toggleShow ? 'down' : 'up'}`} />
        </Tooltip>
      )}
    </div>
  );
};

Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Body = Body;
Accordion.Title = Title;
Accordion.ButtonGroup = ButtonGroup;

export default Accordion;
