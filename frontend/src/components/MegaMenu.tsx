import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/MegaMenu.css';
import categoriesMegaMenu from '../data/categoriesMegaMenu';
import { megaMenuCategoriesIcons } from '../data/megaMenuCategoriesIcons';
import sortAlphabetically from '../utils/sortAlphabetically';
import useOutsideClick from '../hooks/useOutsideClick';

const MegaMenu: React.FC = () => {
  const navigate = useNavigate();
  const menuLevels = ['main', 'mid', 'sub'];

  const [showDropdown, setShowDropdown] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>(menuLevels?.[0]);
  const [parentCategories, setParentCategories] = useState<string[]>([]);

  const handleCloseMenu = () => {
    setShowDropdown(false);
    setActiveMenu(menuLevels[0]);
    setParentCategories([]);
  };

  let nodeRef = useOutsideClick(() => {
    handleCloseMenu();
  });

  const getCurrentCategories = () =>
    sortAlphabetically(
      activeMenu === 'main'
        ? Object.keys(categoriesMegaMenu)
        : activeMenu === 'mid'
        ? Object.keys(categoriesMegaMenu[parentCategories[0]])
        : Object.keys(categoriesMegaMenu[parentCategories[0]][parentCategories[1]])
    );

  const getSubCategories = (selectedCategory: string) =>
    activeMenu === 'main'
      ? sortAlphabetically(Object.keys(categoriesMegaMenu[selectedCategory]))
      : activeMenu === 'mid'
      ? sortAlphabetically(Object.keys(categoriesMegaMenu[parentCategories[0]][selectedCategory]))
      : [categoriesMegaMenu[parentCategories[0]][parentCategories[1]][selectedCategory]];

  const handleNextLinkClick = (category: string) => {
    if (getSubCategories(category).length > 0) {
      setParentCategories([...parentCategories, category]);
      setActiveMenu(menuLevels[menuLevels.indexOf(activeMenu) + 1]);
    }
    if (activeMenu === 'sub') {
      navigate(getSubCategories(category)[0]);
      handleCloseMenu();
    }
  };

  const handlePreviousLinkClick = () => {
    setParentCategories(parentCategories.slice(0, -1));
    setActiveMenu(menuLevels[menuLevels.indexOf(activeMenu) - 1]);
  };

  const menuToRender = (level: string) => (
    <div className={`mega_menu ${level} ${activeMenu !== level && 'hidden'}`}>
      {level === 'main' ? (
        <h2>Categories</h2>
      ) : (
        <div className="menu_header">
          <i className="fas fa-arrow-left" onClick={handlePreviousLinkClick} />
          <span>{`${parentCategories[parentCategories.length - 1]}`}</span>
        </div>
      )}
      <ul>
        {getCurrentCategories().map((category: string) => (
          <li
            key={category}
            onClick={() => handleNextLinkClick(category)}
            className={`${getSubCategories(category).length === 0 ? 'disabled' : ''}`}
          >
            <i
              className={`${
                level === 'main' ? megaMenuCategoriesIcons[category] : 'fa fa-align-justify'
              } left`}
            />
            <span>{`${category} ${
              level !== 'sub' ? `(${getSubCategories(category).length})` : ''
            }`}</span>
            {level !== 'sub' && <i className="fas fa-angle-right chevron" />}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <main ref={nodeRef}>
      <button className="button_nav" onClick={() => setShowDropdown(!showDropdown)}>
        <i className={`fa ${!showDropdown ? 'fa-align-justify' : 'fa-times'}`} />
      </button>
      {showDropdown && (
        <section className="menu_container">
          {menuLevels.map((level) => menuToRender(level))}
        </section>
      )}
    </main>
  );
};

export default MegaMenu;
