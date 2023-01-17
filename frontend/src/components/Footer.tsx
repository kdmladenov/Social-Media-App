import React from 'react';
import './styles/Footer.css';
import Tooltip from './Tooltip';

const Footer: React.FC = () => {
  return (
    <footer>
      <span>All rights reserved</span>
      <div className="button_group">
        <button>
          <Tooltip direction="top" text="Github">
            <i className="fab fa-github" />
          </Tooltip>
        </button>
        <button>
          <Tooltip direction="top" text="Linkedin">
            <i className="fab fa-linkedin" />
          </Tooltip>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
