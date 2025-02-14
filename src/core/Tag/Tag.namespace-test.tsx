import { Icon, Tag, TagProps } from "czifui";
import React from "react";

const TagNameSpaceTest = (props: TagProps) => {
  return (
    <Tag
      color="beta"
      icon={<Icon sdsIcon="download" sdsSize="l" sdsType="button" />}
      label="Label"
      sdsStyle="rounded"
      sdsType="primary"
    />
  );
};
