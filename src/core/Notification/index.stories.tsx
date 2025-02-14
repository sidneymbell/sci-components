import { FormControlLabel, Switch } from "@mui/material";
import { action } from "@storybook/addon-actions";
import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Notification from "./index";

const Demo = (props: Args): JSX.Element => {
  const {
    intent,
    onClose,
    buttonOnClick,
    buttonText,
    slideDirection,
    extraContent,
    autoDismiss,
  } = props;

  const [dismissed, setDismissed] = React.useState(false);

  const handleChange = () => {
    setDismissed((prev) => !prev);
  };

  if (buttonOnClick) {
    return (
      <>
        {!autoDismiss && (
          <FormControlLabel
            control={<Switch checked={dismissed} onChange={handleChange} />}
            label="Hide"
          />
        )}
        <Notification
          autoDismiss={autoDismiss}
          dismissed={dismissed}
          slideDirection={slideDirection}
          intent={intent}
          onClose={onClose}
          buttonOnClick={action("onClick")}
          buttonText={buttonText}
          {...props}
        >
          This is a notification!
          {extraContent && (
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
              eveniet sapiente, officiis aut possimus suscipit assumenda non?
            </div>
          )}
        </Notification>
        <Button onClick={handleChange} sdsType="primary" sdsStyle="rounded">
          Reset Notification
        </Button>
      </>
    );
  }
  return (
    <>
      {!autoDismiss && (
        <FormControlLabel
          control={<Switch checked={dismissed} onChange={handleChange} />}
          label="Hide"
        />
      )}
      <Notification
        autoDismiss={autoDismiss}
        dismissed={dismissed}
        slideDirection={slideDirection}
        intent={intent}
        onClose={onClose}
        {...props}
      >
        This is a notification!
        {extraContent && (
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
            eveniet sapiente, officiis aut possimus suscipit assumenda non?
          </div>
        )}
      </Notification>
      <Button onClick={handleChange} sdsType="primary" sdsStyle="rounded">
        Reset Notification
      </Button>
    </>
  );
};

export default {
  argTypes: {
    autoDismiss: {
      control: { type: "select" },
      options: [true, false, 4000, 12000, 20000],
    },
    buttonOnClick: {
      control: { type: "boolean" },
    },
    extraContent: {
      control: { type: "boolean" },
    },
    intent: {
      control: { type: "radio" },
      options: ["info", "error", "success", "warning"],
    },
    onClose: {
      control: {
        labels: {
          "() => {}": true,
          undefined,
        },
        type: "select",
      },
      options: [action("onClick"), undefined],
    },
    slideDirection: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
  },
  component: Demo,
  title: "Notification",
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  autoDismiss: false,
  buttonOnClick: false,
  buttonText: "click me",
  extraContent: false,
  intent: "success",
  slideDirection: "left",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const storyRow = {
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "row",
  gap: "20px",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={storyRow as React.CSSProperties}>
      <Notification slideDirection="left" intent="info" {...props}>
        this is a notification
      </Notification>
      <Notification
        slideDirection="left"
        intent="info"
        buttonOnClick={action("onClick")}
        buttonText="click me"
        {...props}
      >
        this is a notification
      </Notification>
      <Notification
        slideDirection="left"
        intent="info"
        buttonOnClick={action("onClick")}
        buttonText="click me"
        {...props}
      >
        this is a notification
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet eveniet
          sapiente, officiis aut possimus suscipit assumenda non?
        </div>
      </Notification>
    </div>
  );
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (props: Args): JSX.Element => {
  return (
    <Notification
      slideDirection="left"
      intent="info"
      {...props}
      data-testid="notification"
    >
      this is a notification
    </Notification>
  );
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
