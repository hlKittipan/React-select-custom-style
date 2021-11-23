// @flow

import React, { useState, useEffect, useRef } from "react";
import Select, { StylesConfig, components } from "react-select";
import { colourOptions } from "./docs/data";

export default () => {
  const [menuWidth, setMenuWidth] = useState(0);

  const selectRef = useRef();
  useEffect(() => {
    selectRef.current.focus();
  }, []);

  const onFocus = () => {
    if (!menuWidth) {
      setTimeout(() => {
        const menu = selectRef.current.select.menuListRef;
        const width = menu && menu.getBoundingClientRect().width;
        width && setMenuWidth(width);
        selectRef.current.blur();
      }, 0);
    }
  };

  const Control = ({ children, ...rest }) => (
    <components.Control {...rest}>Sort by: {children}</components.Control>
  );

  const styles = {
    control: (css) => ({
      ...css,
      width: menuWidth || "auto",
      opacity: menuWidth ? 1 : 0
    }),
    menu: ({ width, ...css }) => ({
      ...css,
      opacity: menuWidth ? 1 : 0
    }),
    // Add padding to account for width of Indicators Container plus padding
    option: (css) => ({ ...css, paddingRight: 36 + 8 })
  };

  return (
    <div>
      <sup>
        <a href="https://github.com/JedWatson/react-select/issues/4201">
          Regarding react-select github issue #4201
        </a>
      </sup>
      <br />
      <br />
      <Select
        ref={selectRef}
        styles={styles}
        onFocus={onFocus}
        openMenuOnFocus={true}
        components={{ Control }}
        options={[
          ...colourOptions,
          {
            value: -1,
            label: "A really really long label which will extend width of menu"
          }
        ]}
      />
    </div>
  );
};
