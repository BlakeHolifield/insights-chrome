import React, { useEffect, useState } from 'react';
import { Nav, NavExpandable, NavItem, NavList } from '@patternfly/react-core';
import useGlobalNav from '../../utils/useGlobalNav';
import { isBeta } from '../../utils';
import NavLoader from './Loader';
import './LandingNav.scss';
import { useSelector } from 'react-redux';

const LandingNav = () => {
  const [elementReady, setElementReady] = useState(false);
  const showNav = useSelector(({ chrome: { user } }) => !!user);
  useEffect(() => {
    if (showNav) {
      const elem = document.querySelector('aside#ins-c-landing-nav');
      /**
       * Nav classes have to be added at runtime only when the nav should be rendered
       * to prevent navigation background to be displayed in non ci-beta envs.
       */
      elem.classList.add('pf-m-dark', 'pf-c-page__sidebar');
      setElementReady(true);
    }
  }, [showNav]);
  const { apps, isLoaded } = useGlobalNav();
  const isBetaEnv = isBeta();

  /**
   * render navigation only if the user is logged in
   */
  if (!showNav || !elementReady) {
    return null;
  }
  return (
    <Nav className="ins-c-landing-nav">
      {!isLoaded ? (
        <NavLoader />
      ) : (
        <NavList>
          <NavItem preventDefault component="span">
            <b>Red Hat Hybrid Cloud Console</b>
          </NavItem>
          {apps.map(({ id, title, routes }) => (
            <NavExpandable className="ins-m-navigation-align" key={id} title={title}>
              {routes.map(({ title, id: path }) => (
                <NavItem className="ins-m-navigation-align" key={id} to={`/${isBetaEnv ? 'beta/' : ''}${id}/${path}`}>
                  {title}
                </NavItem>
              ))}
            </NavExpandable>
          ))}
        </NavList>
      )}
    </Nav>
  );
};

export default LandingNav;