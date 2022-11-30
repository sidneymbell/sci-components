import styled from "@emotion/styled";
import { Args, Meta, Story } from "@storybook/react";
import React, { FC, useState } from "react";
import Callout from "../Callout";
import InputSearch from "../InputSearch";
import {
  CommonThemeProps,
  getColors,
  getSpaces,
  getTypography,
} from "../styles";
import Icon from "./index";
import { iconMap, IconNameToSizes } from "./map";

const Demo = (props: Args): JSX.Element => {
  const { px, sdsIcon, sdsSize, sdsType } = props;

  return (
    <div style={{ alignItems: "center", display: "flex" }}>
      <Icon sdsIcon={sdsIcon} sdsSize={sdsSize} sdsType={sdsType} />
      <span style={{ marginLeft: "8px" }}>{px}px</span>
    </div>
  );
};

export default {
  component: Demo,
  title: "Icon",
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const IconXS = Template.bind({});

IconXS.args = {
  px: 10,
  sdsIcon: "checkCircle",
  sdsSize: "xs",
  sdsType: "static",
};

export const IconS = Template.bind({});

IconS.args = {
  px: 14,
  sdsIcon: "checkCircle",
  sdsSize: "s",
  sdsType: "static",
};

export const IconL = Template.bind({});

IconL.args = {
  px: 22,
  sdsIcon: "checkCircle",
  sdsSize: "l",
  sdsType: "static",
};

export const IconXL = Template.bind({});

IconXL.args = {
  px: 32,
  sdsIcon: "checkCircle",
  sdsSize: "xl",
  sdsType: "static",
};

export const IconInteractive = Template.bind({});

IconInteractive.args = {
  px: 32,
  sdsIcon: "checkCircle",
  sdsSize: "xl",
  sdsType: "interactive",
};

const IconBankWrapper = styled("div")`
  ${(props: CommonThemeProps) => {
    const typography = getTypography(props);
    const spacings = getSpaces(props);

    return `
      font-family: ${typography?.fontFamily};
      display: grid;
      grid-gap: ${spacings?.s}px;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fit, 210px);
      margin-top: ${spacings?.m}px;
    `;
  }}
`;

const IconWrapper = styled("div")`
  ${(props: CommonThemeProps) => {
    const colors = getColors(props);
    const spacings = getSpaces(props);

    return `
      align-items: center;
      border: 1px solid #eee;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 8px;
      position: relative;
      cursor: pointer;
      transition: all .2s;

      p {
        margin: ${spacings?.m}px 0 0 0;
        text-align: center;
        font-size: 13px;
        background-color: transparent;
      }

      span {
        color: ${colors?.gray[600]};
        font-size: 11px;
      }

      span.size-tag {
        background-color: rgba(0, 0, 0, 0.05);
        font-size: 10px;
        padding: 0 4px;
        margin: 0 2px;
        border-radius: 2px;
      }

      &:hover {
        border-radius: 2px;
        background-color: ${colors?.primary[400]};
        border-color: ${colors?.primary[400]};
        color: white;

        p {
          color: white;
        }

        span {
          color: white;
        }

        span.size-tag {
          background-color: rgba(0, 0, 0, 0.2);
        }

        svg {
          fill: white;
        }

        div.notif {
          display: flex;
        }
      }

      div.icon {
        min-height: 22px;
        display: flex;
        align-items: center;
      }

      div.notif {
        flex-direction: column;
        border-radius: 2px;
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(3px);
        color: white;
        align-items: center;
        justify-content: center;
      }
    `;
  }}
`;

export const IconBank = () => {
  const initialIcons = Object.entries(iconMap);

  const [icons, setIcons] = useState(initialIcons);

  const searchIconHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const regex = new RegExp(query, "gi");
    const newIcons = initialIcons.filter((icon) => {
      return icon[0].match(regex);
    });
    setIcons(newIcons);
  };

  return (
    <>
      <InputSearch
        id="squareSearchPreview"
        label="Search"
        sdsStyle="square"
        placeholder="Search icons"
        name="square-input-search"
        onChange={searchIconHandler}
      />
      {icons.length ? (
        <IconBankWrapper>
          {icons.map(([sdsIcon, icon]) => {
            return Object.entries(icon).map((innerIcon) => (
              <IconItem
                key={sdsIcon + innerIcon[0]}
                innerIcon={innerIcon}
                sdsIcon={sdsIcon}
              />
            ));
          })}
        </IconBankWrapper>
      ) : (
        <Callout
          intent="warning"
          icon={
            <Icon sdsSize="l" sdsIcon="infoSpeechBubble" sdsType="static" />
          }
        >
          Sorry, there are no matches for your search!
        </Callout>
      )}
    </>
  );
};

type IconItemProps = {
  sdsIcon: string;
  innerIcon: [string, FC<CustomSVGProps> | null];
};

const IconItem = (props: IconItemProps) => {
  const { sdsIcon, innerIcon } = props;
  if (!innerIcon[1]) return null;
  const sdsSize = innerIcon[0] === "smallIcon" ? "s" : "l";
  const [copied, setCopied] = useState(false);

  const copyIconNameHandler = (iconName: string) => {
    navigator.clipboard.writeText(iconName);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <IconWrapper
      key={sdsIcon + sdsSize}
      onClick={() => copyIconNameHandler(sdsIcon)}
    >
      <div className="icon">
        <Icon
          sdsSize={sdsSize}
          sdsIcon={sdsIcon as keyof IconNameToSizes}
          sdsType="static"
        />
      </div>
      <p>{sdsIcon}</p>
      <span>
        Available sizes{" "}
        {sdsSize === "s" ? (
          <>
            <span className="size-tag">xs</span>
            <span className="size-tag">s</span>
          </>
        ) : (
          <>
            <span className="size-tag">l</span>
            <span className="size-tag">xl</span>
          </>
        )}
      </span>
      {copied && (
        <div className="notif">
          <Icon
            sdsSize={sdsSize}
            sdsIcon={sdsIcon as keyof IconNameToSizes}
            sdsType="static"
          />
          <p>Copied!</p>
          <span>
            <Icon sdsSize="xs" sdsIcon="check" sdsType="static" />
          </span>
        </div>
      )}
    </IconWrapper>
  );
};
